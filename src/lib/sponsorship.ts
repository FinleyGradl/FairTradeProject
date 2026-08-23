// path: src/lib/sponsorship.ts
import { prisma } from "@/lib/db";
import * as mollie from "@/lib/mollie";
import { SPONSORSHIP_TIERS, type SponsorshipTierId } from "@/lib/constants";
import { resolvePromoCode, recordPromoRedemption } from "@/lib/promo-codes";
import type { Store, SponsorshipStatus } from "../../prisma/generated/prisma/client";

const ACTIVE_LIKE_STATUSES: SponsorshipStatus[] = ["incomplete", "active", "past_due"];

export async function getActiveSponsorship(storeId: string) {
  return prisma.sponsorshipSubscription.findFirst({
    where: { storeId, status: { in: ACTIVE_LIKE_STATUSES } },
    orderBy: { createdAt: "desc" },
  });
}

export async function canManageSponsorship(
  store: Pick<Store, "ownerUserId" | "createdById">,
  user: { id?: string; role?: string } | null | undefined
): Promise<boolean> {
  if (!user?.id) return false;
  if (user.role === "admin") return true;
  // Sponsoring is a paid, owner-level responsibility — the original
  // submitter (createdById) alone isn't enough, they must be the
  // confirmed owner (via the claim flow) unless they're also the owner.
  return store.ownerUserId === user.id;
}

/**
 * Starts (or restarts) a sponsorship: creates/reuses a Mollie customer for
 * the user and kicks off a "first" payment to establish a mandate. The
 * SponsorshipSubscription row is created in `incomplete` status; the webhook
 * flips it to `active` once the first payment is confirmed and the
 * recurring subscription has been created at Mollie.
 */
export async function startSponsorship(params: {
  storeId: string;
  ownerUserId: string;
  ownerEmail: string;
  ownerName?: string | null;
  tier: SponsorshipTierId;
  promoCode?: string | null;
}) {
  const existing = await getActiveSponsorship(params.storeId);
  if (existing) {
    throw new Error("Für diesen Laden läuft bereits ein Sponsoring-Abo.");
  }

  const tierDef = SPONSORSHIP_TIERS[params.tier];
  const promo = await resolvePromoCode(params.promoCode);
  const discountPercent = promo?.discountPercent ?? 0;
  const discountedAmount = Math.max(0, tierDef.priceEuros * (1 - discountPercent / 100));

  const previous = await prisma.sponsorshipSubscription.findFirst({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  // 100% off: activate immediately, no Mollie customer/payment/subscription
  // needed at all. Meant for local dev / internal testing only — see
  // lib/promo-codes.ts (gated behind ENABLE_PROMO_CODES).
  if (promo && discountPercent >= 100) {
    const record = await prisma.sponsorshipSubscription.create({
      data: {
        storeId: params.storeId,
        ownerUserId: params.ownerUserId,
        tier: params.tier,
        status: "active",
        promoCode: promo.code,
        discountPercent,
        // No real recurring billing to track — grant a generous, clearly
        // artificial period so it doesn't need manual renewal during testing.
        currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      },
    });
    await recordPromoRedemption(promo.code);
    return { checkoutUrl: null, subscriptionId: record.id, redeemedPromo: true };
  }

  const customerId = await mollie.ensureMollieCustomer({
    existingCustomerId: previous?.mollieCustomerId,
    email: params.ownerEmail,
    name: params.ownerName,
  });

  const record = await prisma.sponsorshipSubscription.create({
    data: {
      storeId: params.storeId,
      ownerUserId: params.ownerUserId,
      tier: params.tier,
      status: "incomplete",
      mollieCustomerId: customerId,
      promoCode: promo?.code ?? null,
      discountPercent,
    },
  });

  const payment = await mollie.createFirstPayment({
    customerId,
    amountEuros: discountedAmount,
    description: promo
      ? `FairFind Sponsoring – ${tierDef.label} (monatlich, Code ${promo.code} -${discountPercent}%)`
      : `FairFind Sponsoring – ${tierDef.label} (monatlich)`,
    subscriptionRecordId: record.id,
  });

  await prisma.sponsorshipSubscription.update({
    where: { id: record.id },
    data: { molliePaymentId: payment.id },
  });

  return { checkoutUrl: payment._links.checkout?.href ?? null, subscriptionId: record.id, redeemedPromo: false };
}

export async function cancelSponsorship(storeId: string) {
  const sub = await getActiveSponsorship(storeId);
  if (!sub) return null;

  if (sub.mollieCustomerId && sub.mollieSubscriptionId) {
    try {
      await mollie.cancelSubscription(sub.mollieCustomerId, sub.mollieSubscriptionId);
    } catch (error) {
      // Log and continue — we still want to mark it canceled locally so the
      // store loses its boost/badge even if Mollie is temporarily unreachable.
      console.error("Mollie: Kündigung der Subscription fehlgeschlagen:", error);
    }
  }

  return prisma.sponsorshipSubscription.update({
    where: { id: sub.id },
    data: { status: "canceled", canceledAt: new Date() },
  });
}

// --- Ranking algorithm -------------------------------------------------------
//
// Sponsoring buys a *boost*, not a guarantee: it's added on top of a quality
// score so a well-reviewed, verified store without sponsoring can still rank
// ahead of a low-quality sponsored one. Boost only applies within a result
// set that already matched the user's filters (query/category/radius) — you
// can't buy your way into results that don't match what someone searched
// for. Sponsored stores are always visually labeled ("Gesponsert"), per the
// transparency requirement for paid placement (§ 5a UWG / Medienstaatsvertrag).

export interface RankingInput {
  avgRating: number | null;
  reviewCount: number;
  verificationLevel: "unverified" | "community" | "admin";
  createdAt: Date;
  distanceM?: number;
  sponsorBoostWeight: number; // 0 if not sponsored
}

const VERIFICATION_BONUS: Record<RankingInput["verificationLevel"], number> = {
  unverified: 0,
  community: 10,
  admin: 25,
};

const SPONSOR_BOOST_PER_WEIGHT = 40; // basic=+40, plus=+80, top=+120
const NEW_LISTING_BONUS_DAYS = 60;
const NEW_LISTING_MAX_BONUS = 5;
const DISTANCE_PENALTY_PER_KM = 2;

export function computeRankingScore(input: RankingInput): number {
  const ratingScore = (input.avgRating ?? 3) * 20; // 0–100
  const reviewVolumeBonus = Math.min(15, Math.log2(input.reviewCount + 1) * 4);
  const verificationBonus = VERIFICATION_BONUS[input.verificationLevel];

  const ageDays = (Date.now() - input.createdAt.getTime()) / (1000 * 60 * 60 * 24);
  const noviceBonus = ageDays < NEW_LISTING_BONUS_DAYS
    ? NEW_LISTING_MAX_BONUS * (1 - ageDays / NEW_LISTING_BONUS_DAYS)
    : 0;

  const sponsorBoost = input.sponsorBoostWeight * SPONSOR_BOOST_PER_WEIGHT;

  const distancePenalty = input.distanceM
    ? (input.distanceM / 1000) * DISTANCE_PENALTY_PER_KM
    : 0;

  return (
    ratingScore + reviewVolumeBonus + verificationBonus + noviceBonus + sponsorBoost - distancePenalty
  );
}

// --- Admin: sponsoring overview ----------------------------------------------
// Who's sponsoring what, plus a rough revenue overview. Deliberately simple
// (no proration/tax handling) — real invoicing detail lives in Mollie itself,
// this is an at-a-glance operator dashboard, not accounting.

export interface AdminSponsorshipRow {
  id: string;
  storeName: string;
  storeSlug: string;
  ownerName: string | null;
  ownerEmail: string;
  tier: SponsorshipTierId;
  status: SponsorshipStatus;
  promoCode: string | null;
  discountPercent: number;
  monthlyAmountEuros: number;
  createdAt: Date;
  currentPeriodEnd: Date | null;
  canceledAt: Date | null;
}

export interface AdminSponsorshipOverview {
  rows: AdminSponsorshipRow[];
  stats: {
    activeCount: number;
    pastDueCount: number;
    incompleteCount: number;
    canceledCount: number;
    activeByTier: Record<SponsorshipTierId, number>;
    estimatedMonthlyRevenueEuros: number;
  };
}

export async function getAdminSponsorshipOverview(): Promise<AdminSponsorshipOverview> {
  const subs = await prisma.sponsorshipSubscription.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      store: { select: { name: true, slug: true } },
      owner: { select: { name: true, email: true } },
    },
  });

  const rows: AdminSponsorshipRow[] = subs.map((s) => {
    const tierDef = SPONSORSHIP_TIERS[s.tier as SponsorshipTierId];
    return {
      id: s.id,
      storeName: s.store.name,
      storeSlug: s.store.slug,
      ownerName: s.owner.name,
      ownerEmail: s.owner.email,
      tier: s.tier as SponsorshipTierId,
      status: s.status,
      promoCode: s.promoCode,
      discountPercent: s.discountPercent,
      monthlyAmountEuros: tierDef.priceEuros * (1 - s.discountPercent / 100),
      createdAt: s.createdAt,
      currentPeriodEnd: s.currentPeriodEnd,
      canceledAt: s.canceledAt,
    };
  });

  const activeByTier: Record<SponsorshipTierId, number> = { basic: 0, plus: 0, top: 0 };
  let estimatedMonthlyRevenueEuros = 0;
  let activeCount = 0;
  let pastDueCount = 0;
  let incompleteCount = 0;
  let canceledCount = 0;

  for (const row of rows) {
    if (row.status === "active") {
      activeCount++;
      activeByTier[row.tier]++;
      estimatedMonthlyRevenueEuros += row.monthlyAmountEuros;
    } else if (row.status === "past_due") pastDueCount++;
    else if (row.status === "incomplete") incompleteCount++;
    else if (row.status === "canceled") canceledCount++;
  }

  return {
    rows,
    stats: {
      activeCount,
      pastDueCount,
      incompleteCount,
      canceledCount,
      activeByTier,
      estimatedMonthlyRevenueEuros,
    },
  };
}