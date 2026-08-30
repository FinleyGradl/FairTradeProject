// path: src/app/api/webhooks/mollie/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import * as mollie from "@/lib/mollie";
import { SPONSORSHIP_TIERS, type SponsorshipTierId } from "@/lib/constants";
import { recordPromoRedemption } from "@/lib/promo-codes";
import { logAudit, SYSTEM_ACTOR } from "@/lib/audit";

// Mollie calls this URL server-to-server whenever a payment's status
// changes. It sends `id=<payment id>` as application/x-www-form-urlencoded
// (occasionally JSON) — never any status directly, by design we always have
// to fetch the current payment state from Mollie ourselves. This must
// always respond 200 quickly, or Mollie will keep retrying.
export async function POST(request: NextRequest) {
  let paymentId: string | null = null;

  const contentType = request.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("application/json")) {
      const body = await request.json();
      paymentId = body.id ?? null;
    } else {
      const form = await request.formData();
      paymentId = (form.get("id") as string) ?? null;
    }
  } catch {
    paymentId = null;
  }

  if (!paymentId) {
    return NextResponse.json({ error: "Missing payment id" }, { status: 400 });
  }

  try {
    const payment = await mollie.getPayment(paymentId);

    const record = payment.metadata?.subscriptionRecordId
      ? await prisma.sponsorshipSubscription.findUnique({
          where: { id: payment.metadata.subscriptionRecordId },
        })
      : await prisma.sponsorshipSubscription.findFirst({
          where: { mollieSubscriptionId: payment.subscriptionId ?? "__none__" },
        });

    if (!record) {
      console.warn("Mollie webhook: no matching sponsorship for payment", paymentId);
      return NextResponse.json({ received: true });
    }

    const store = await prisma.store.findUnique({
      where: { id: record.storeId },
      select: { name: true, slug: true },
    });
    const entityLabel = store ? `${store.name} (${record.tier})` : record.storeId;
    const baseMetadata = {
      storeSlug: store?.slug ?? null,
      tier: record.tier,
      molliePaymentId: paymentId,
      sequenceType: payment.sequenceType,
    };

    if (payment.status === "paid") {
      if (payment.sequenceType === "first" && record.status === "incomplete") {
        // Mandate established — now create the actual recurring subscription.
        const tierDef = SPONSORSHIP_TIERS[record.tier as SponsorshipTierId];
        const amountEuros = tierDef.priceEuros * (1 - record.discountPercent / 100);
        const subscription = await mollie.createSubscription({
          customerId: record.mollieCustomerId!,
          amountEuros,
          description: record.promoCode
            ? `FairFind Sponsoring – ${tierDef.label} (monatlich, Code ${record.promoCode} -${record.discountPercent}%)`
            : `FairFind Sponsoring – ${tierDef.label} (monatlich)`,
          subscriptionRecordId: record.id,
        });

        await prisma.sponsorshipSubscription.update({
          where: { id: record.id },
          data: {
            status: "active",
            mollieSubscriptionId: subscription.id,
            currentPeriodEnd: subscription.nextPaymentDate
              ? new Date(subscription.nextPaymentDate)
              : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        });

        if (record.promoCode) {
          await recordPromoRedemption(record.promoCode);
        }

        await logAudit({
          actor: SYSTEM_ACTOR,
          action: "subscription.activate",
          entityType: "SponsorshipSubscription",
          entityId: record.id,
          entityLabel,
          metadata: { ...baseMetadata, mollieSubscriptionId: subscription.id },
          request,
        });
      } else if (payment.sequenceType === "recurring") {
        await prisma.sponsorshipSubscription.update({
          where: { id: record.id },
          data: {
            status: "active",
            currentPeriodEnd: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000),
          },
        });

        await logAudit({
          actor: SYSTEM_ACTOR,
          action: "subscription.renew",
          entityType: "SponsorshipSubscription",
          entityId: record.id,
          entityLabel,
          metadata: baseMetadata,
          request,
        });
      }
    } else if (["failed", "expired", "canceled"].includes(payment.status)) {
      if (payment.sequenceType === "first") {
        // Never got a mandate — this sponsorship never actually starts.
        await prisma.sponsorshipSubscription.update({
          where: { id: record.id },
          data: { status: "canceled", canceledAt: new Date() },
        });

        await logAudit({
          actor: SYSTEM_ACTOR,
          action: "subscription.mandate_failed",
          entityType: "SponsorshipSubscription",
          entityId: record.id,
          entityLabel,
          metadata: { ...baseMetadata, paymentStatus: payment.status },
          request,
        });
      } else {
        // A renewal failed. Mollie retries automatically for a while, so we
        // mark it past_due rather than immediately canceling the boost.
        await prisma.sponsorshipSubscription.update({
          where: { id: record.id },
          data: { status: "past_due" },
        });

        await logAudit({
          actor: SYSTEM_ACTOR,
          action: "subscription.payment_failed",
          entityType: "SponsorshipSubscription",
          entityId: record.id,
          entityLabel,
          metadata: { ...baseMetadata, paymentStatus: payment.status },
          request,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Mollie webhook error:", error);
    // Still 200 — Mollie's retry behavior on errors doesn't help us here
    // since the error is almost always on our end, and we log it above.
    return NextResponse.json({ received: true });
  }
}