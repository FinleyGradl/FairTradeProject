// src/lib/stores.ts
import { prisma } from "@/lib/db";
import { filterByRadius } from "@/lib/geo";
import { parseJsonArray, slugify } from "@/lib/utils";
import { TRUST_SCORE_DELTAS, ATTESTATION_THRESHOLDS } from "@/lib/trust";
import { computeRankingScore, cancelSponsorship, getActiveSponsorship } from "@/lib/sponsorship";
import { deleteStoreCoverFileIfLocal, deleteStorePhotoFileIfLocal } from "@/lib/uploads";
import { recordSearchImpressions } from "@/lib/analytics";
import {
  SPONSORSHIP_TIERS,
  SPONSORSHIP_TIER_ORDER,
  PHOTO_REPORT_THRESHOLD,
  REVIEW_REPORT_THRESHOLD,
  type SponsorshipTierId,
} from "@/lib/constants";
import type { StoreCreateInput, StoreUpdateInput } from "@/lib/validators/store";
import type {
  Prisma,
  Store,
  Product,
  Review,
  StoreHours,
  AttestationVote,
} from "../../prisma/generated/prisma/client";

/** storeId -> active sponsorship tier, for a batch of stores. */
async function getActiveSponsorTiers(storeIds: string[]): Promise<Map<string, SponsorshipTierId>> {
  if (storeIds.length === 0) return new Map();
  const active = await prisma.sponsorshipSubscription.findMany({
    where: { storeId: { in: storeIds }, status: "active" },
    select: { storeId: true, tier: true },
  });
  return new Map(active.map((s) => [s.storeId, s.tier as SponsorshipTierId]));
}

/**
 * storeId -> URL of the first (earliest-uploaded) community gallery photo,
 * for a batch of stores. Used as a fallback cover image wherever a store
 * hasn't set one explicitly — see serializeStore().
 */
async function getFirstPhotoUrls(storeIds: string[]): Promise<Map<string, string>> {
  if (storeIds.length === 0) return new Map();
  const firstPhotos = await prisma.storePhoto.findMany({
    where: { storeId: { in: storeIds } },
    orderBy: { createdAt: "asc" },
    distinct: ["storeId"],
    select: { storeId: true, url: true },
  });
  return new Map(firstPhotos.map((p) => [p.storeId, p.url]));
}

export type StoreWithRelations = Store & {
  hours: StoreHours[];
  products: Product[];
  reviews: Review[];
  _count?: { reviews: number };
};

export type StoreListItem = Store & {
  hours: StoreHours[];
  avgRating: number | null;
  reviewCount: number;
  distanceM?: number;
  sponsorTier?: SponsorshipTierId | null;
  /** Earliest community-uploaded photo, used when no coverImage is set. */
  firstPhotoUrl?: string | null;
};

function computeAvgRating(reviews: Review[]): number | null {
  const published = reviews.filter((r) => r.status === "published");
  if (published.length === 0) return null;
  const sum = published.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / published.length) * 10) / 10;
}

function enrichStore(
  store: Store & { hours: StoreHours[]; reviews: Review[] },
  distanceM?: number,
  sponsorTier?: SponsorshipTierId | null,
  firstPhotoUrl?: string | null
): StoreListItem {
  return {
    ...store,
    avgRating: computeAvgRating(store.reviews),
    reviewCount: store.reviews.filter((r) => r.status === "published").length,
    distanceM,
    sponsorTier: sponsorTier ?? null,
    firstPhotoUrl: firstPhotoUrl ?? null,
  };
}

export function serializeStore(store: StoreListItem) {
  return {
    id: store.id,
    slug: store.slug,
    name: store.name,
    description: store.description,
    addressLine: store.addressLine,
    city: store.city,
    postalCode: store.postalCode,
    country: store.country,
    latitude: store.latitude,
    longitude: store.longitude,
    phone: store.phone,
    website: store.website,
    email: store.email,
    status: store.status,
    ownerUserId: store.ownerUserId,
    createdById: store.createdById,
    verificationLevel: store.verificationLevel,
    confirmCount: store.confirmCount,
    disputeCount: store.disputeCount,
    fairBadges: parseJsonArray(store.fairBadges),
    categories: parseJsonArray(store.categories),
    coverImage: store.coverImage ?? store.firstPhotoUrl ?? null,
    avgRating: store.avgRating,
    reviewCount: store.reviewCount,
    distanceM: store.distanceM,
    hours: store.hours,
    isOpen: store.hours.length > 0,
    isSponsored: Boolean(store.sponsorTier && SPONSORSHIP_TIERS[store.sponsorTier].includesSponsoredBadge),
    sponsorTier: store.sponsorTier ?? null,
  };
}

export async function getStores(params: {
  lat?: number;
  lng?: number;
  radius?: number;
  category?: string;
  badge?: string;
  q?: string;
  page?: number;
  limit?: number;
}) {
  const { lat, lng, radius = 15, category, badge, q, page = 1, limit = 20 } = params;

  const where: Prisma.StoreWhereInput = {
    status: "active",
  };

  if (q) {
    where.OR = [
      { name: { contains: q } },
      { description: { contains: q } },
      { city: { contains: q } },
    ];
  }

  const stores = await prisma.store.findMany({
    where,
    include: {
      hours: true,
      reviews: { where: { status: "published" } },
    },
    orderBy: { name: "asc" },
  });

  const sponsorTiers = await getActiveSponsorTiers(stores.map((s) => s.id));
  const firstPhotoUrls = await getFirstPhotoUrls(stores.map((s) => s.id));
  let enriched: StoreListItem[] = stores.map((s) =>
    enrichStore(s, undefined, sponsorTiers.get(s.id), firstPhotoUrls.get(s.id))
  );

  if (category) {
    enriched = enriched.filter((s) =>
      parseJsonArray(s.categories).some((c) =>
        c.toLowerCase().includes(category.toLowerCase())
      )
    );
  }

  if (badge) {
    enriched = enriched.filter((s) =>
      parseJsonArray(s.fairBadges).includes(badge)
    );
  }

  if (lat != null && lng != null) {
    enriched = filterByRadius(enriched, lat, lng, radius);
  }

  // Ranking: quality score (rating, review volume, verification, freshness)
  // plus a sponsoring boost, minus a gentle distance penalty. See
  // computeRankingScore() in lib/sponsorship.ts for the exact weights —
  // sponsoring nudges ranking within an already-filtered result set, it
  // never bypasses the query/category/radius filters above.
  enriched.sort((a, b) => {
    const scoreA = computeRankingScore({
      avgRating: a.avgRating,
      reviewCount: a.reviewCount,
      verificationLevel: a.verificationLevel,
      createdAt: a.createdAt,
      distanceM: a.distanceM,
      sponsorBoostWeight: a.sponsorTier ? SPONSORSHIP_TIERS[a.sponsorTier].boostWeight : 0,
    });
    const scoreB = computeRankingScore({
      avgRating: b.avgRating,
      reviewCount: b.reviewCount,
      verificationLevel: b.verificationLevel,
      createdAt: b.createdAt,
      distanceM: b.distanceM,
      sponsorBoostWeight: b.sponsorTier ? SPONSORSHIP_TIERS[b.sponsorTier].boostWeight : 0,
    });
    return scoreB - scoreA;
  });

  const total = enriched.length;
  const offset = (page - 1) * limit;
  const paginated = enriched.slice(offset, offset + limit);

  // Like Search Console "impressions": count every store shown on a result
  // page while a search/filter query was active. Fire-and-forget — never
  // block or fail the actual response over analytics.
  if (q) {
    void recordSearchImpressions(paginated.map((s) => s.id), q);
  }

  return {
    stores: paginated.map(serializeStore),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
}

export async function getStoreBySlug(slug: string, viewerId?: string) {
  const store = await prisma.store.findUnique({
    where: { slug },
    include: {
      hours: { orderBy: { dayOfWeek: "asc" } },
      products: { orderBy: { name: "asc" } },
      reviews: {
        where: { status: "published" },
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { id: true, name: true, avatarUrl: true } },
          _count: { select: { reports: true } },
        },
      },
      photos: {
        orderBy: { createdAt: "desc" },
        include: {
          uploadedBy: { select: { id: true, name: true } },
          _count: { select: { reports: true } },
        },
      },
      owner: { select: { id: true, name: true } },
    },
  });

  if (!store) return null;

  const [myVote, sponsorTiers, myPhotoReports, myReviewReports] = await Promise.all([
    viewerId
      ? prisma.storeAttestation.findUnique({
          where: { storeId_userId: { storeId: store.id, userId: viewerId } },
          select: { vote: true },
        })
      : null,
    getActiveSponsorTiers([store.id]),
    viewerId && store.photos.length > 0
      ? prisma.photoReport.findMany({
          where: { userId: viewerId, photoId: { in: store.photos.map((p) => p.id) } },
          select: { photoId: true },
        })
      : Promise.resolve([]),
    viewerId && store.reviews.length > 0
      ? prisma.reviewReport.findMany({
          where: { userId: viewerId, reviewId: { in: store.reviews.map((r) => r.id) } },
          select: { reviewId: true },
        })
      : Promise.resolve([]),
  ]);
  const myReportedPhotoIds = new Set(myPhotoReports.map((r) => r.photoId));
  const myReportedReviewIds = new Set(myReviewReports.map((r) => r.reviewId));

  // photos are loaded newest-first for the gallery; the first uploaded one
  // (i.e. oldest) is the fallback cover when the store has none set.
  const firstPhotoUrl = store.photos.length > 0 ? store.photos[store.photos.length - 1].url : null;

  const listItem = enrichStore(store, undefined, sponsorTiers.get(store.id), firstPhotoUrl);
  return {
    ...serializeStore(listItem),
    myVote: myVote?.vote ?? null,
    products: store.products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      currency: p.currency,
      category: p.category,
      imageUrl: p.imageUrl,
      inStock: p.inStock,
    })),
    reviews: store.reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      title: r.title,
      body: r.body,
      ownerReply: r.ownerReply,
      ownerReplyAt: r.ownerReplyAt,
      createdAt: r.createdAt,
      user: r.user,
      reportCount: r._count.reports,
      reportedByMe: myReportedReviewIds.has(r.id),
    })),
    photos: store.photos.map((p) => ({
      id: p.id,
      url: p.url,
      caption: p.caption,
      createdAt: p.createdAt,
      uploadedBy: p.uploadedBy,
      reportCount: p._count.reports,
      reportedByMe: myReportedPhotoIds.has(p.id),
    })),
    owner: store.owner,
  };
}

// --- Store photo gallery -----------------------------------------------------
// Any signed-in user can contribute photos; see the API routes under
// /api/v1/stores/[slug]/photos and /api/v1/photos/[photoId]/report.

/**
 * Who may delete a given gallery photo: the person who uploaded it, anyone
 * who could edit the store itself (owner/creator/admin/moderator — see
 * canEditStore), or a moderator/admin via the reported-photos queue.
 */
export function canDeletePhoto(
  photo: { uploadedByUserId: string | null },
  store: Pick<Store, "ownerUserId" | "createdById">,
  user: { id: string; role?: string } | null | undefined
): boolean {
  if (!user) return false;
  if (photo.uploadedByUserId === user.id) return true;
  return canEditStore(store, user);
}

export async function addStorePhoto(
  storeId: string,
  userId: string,
  url: string,
  caption?: string | null
) {
  return prisma.storePhoto.create({
    data: { storeId, url, caption: caption || null, uploadedByUserId: userId },
  });
}

export async function deleteStorePhoto(photoId: string) {
  return prisma.storePhoto.delete({ where: { id: photoId } }).catch(() => null);
}

/**
 * Records (or no-ops on) a report from `userId` against `photoId`.
 * Returns the resulting distinct-reporter count, or null if the photo
 * doesn't exist.
 */
export async function reportStorePhoto(
  photoId: string,
  userId: string,
  reason?: string | null
): Promise<{ reportCount: number; alreadyReported: boolean } | null> {
  const photo = await prisma.storePhoto.findUnique({ where: { id: photoId }, select: { id: true } });
  if (!photo) return null;

  const existing = await prisma.photoReport.findUnique({
    where: { photoId_userId: { photoId, userId } },
  });

  if (!existing) {
    await prisma.photoReport.create({ data: { photoId, userId, reason: reason || null } });
  }

  const reportCount = await prisma.photoReport.count({ where: { photoId } });
  return { reportCount, alreadyReported: Boolean(existing) };
}

/**
 * Gallery photos that have hit PHOTO_REPORT_THRESHOLD distinct reports —
 * surfaced to admins/moderators, who can then remove them.
 */
export async function listReportedPhotos() {
  // Prisma can't filter relations by count threshold directly, so we
  // prefilter to "has at least one report" and apply the real threshold
  // in JS below.
  const photos = await prisma.storePhoto.findMany({
    where: { reports: { some: {} } },
    include: {
      store: { select: { id: true, slug: true, name: true } },
      uploadedBy: { select: { id: true, name: true, email: true } },
      reports: {
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { reports: true } },
    },
    orderBy: { reports: { _count: "desc" } },
  });
  return photos.filter((p) => p._count.reports >= PHOTO_REPORT_THRESHOLD);
}

/**
 * Clears all reports on a photo without deleting the photo itself — used
 * by moderators to dismiss reports they've judged unfounded. The photo
 * disappears from the moderation queue but stays live in the gallery, and
 * can accumulate fresh reports again later.
 */
export async function dismissPhotoReports(photoId: string): Promise<boolean> {
  const photo = await prisma.storePhoto.findUnique({ where: { id: photoId }, select: { id: true } });
  if (!photo) return false;
  await prisma.photoReport.deleteMany({ where: { photoId } });
  return true;
}

/**
 * Records (or no-ops on) a report from `userId` against `reviewId`. A user
 * can't report their own review. Returns the resulting distinct-reporter
 * count, or null if the review doesn't exist.
 */
export async function reportReview(
  reviewId: string,
  userId: string,
  reason?: string | null
): Promise<{ reportCount: number; alreadyReported: boolean } | { error: "NOT_FOUND" | "OWN_REVIEW" }> {
  const review = await prisma.review.findUnique({ where: { id: reviewId }, select: { id: true, userId: true } });
  if (!review) return { error: "NOT_FOUND" };
  if (review.userId === userId) return { error: "OWN_REVIEW" };

  const existing = await prisma.reviewReport.findUnique({
    where: { reviewId_userId: { reviewId, userId } },
  });

  if (!existing) {
    await prisma.reviewReport.create({ data: { reviewId, userId, reason: reason || null } });
  }

  const reportCount = await prisma.reviewReport.count({ where: { reviewId } });
  return { reportCount, alreadyReported: Boolean(existing) };
}

/**
 * Reviews that have hit REVIEW_REPORT_THRESHOLD distinct reports — surfaced
 * to admins/moderators, who can then hide them or dismiss the reports.
 */
export async function listReportedReviews() {
  // Prisma can't filter relations by count threshold directly, so we
  // prefilter to "has at least one report" and apply the real threshold
  // in JS below.
  const reviews = await prisma.review.findMany({
    where: { reports: { some: {} } },
    include: {
      store: { select: { id: true, slug: true, name: true } },
      user: { select: { id: true, name: true, email: true } },
      reports: {
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { reports: true } },
    },
    orderBy: { reports: { _count: "desc" } },
  });
  return reviews.filter((r) => r._count.reports >= REVIEW_REPORT_THRESHOLD);
}

/**
 * Clears all reports on a review without hiding the review itself — used
 * by moderators to dismiss reports they've judged unfounded. The review
 * disappears from the moderation queue but stays visible, and can
 * accumulate fresh reports again later.
 */
export async function dismissReviewReports(reviewId: string): Promise<boolean> {
  const review = await prisma.review.findUnique({ where: { id: reviewId }, select: { id: true } });
  if (!review) return false;
  await prisma.reviewReport.deleteMany({ where: { reviewId } });
  return true;
}

/**
 * Moderator action: hides a reported review (status -> "hidden") instead of
 * deleting it outright, so it drops out of every public/`published`-filtered
 * query (store page, avg rating, profile) but the record — and its reports —
 * stay around for reference.
 */
export async function hideReview(reviewId: string): Promise<boolean> {
  const review = await prisma.review.findUnique({ where: { id: reviewId }, select: { id: true } });
  if (!review) return false;
  await prisma.review.update({ where: { id: reviewId }, data: { status: "hidden" } });
  return true;
}

export async function searchProducts(params: {
  q?: string;
  category?: string;
  storeId?: string;
  page?: number;
  limit?: number;
}) {
  const { q, category, storeId, page = 1, limit = 20 } = params;

  const where: Prisma.ProductWhereInput = {};
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { description: { contains: q } },
    ];
  }
  if (category) where.category = { contains: category };
  if (storeId) where.storeId = storeId;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        store: { select: { slug: true, name: true, city: true } },
      },
      orderBy: { name: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products: products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      currency: p.currency,
      category: p.category,
      imageUrl: p.imageUrl,
      inStock: p.inStock,
      store: p.store,
    })),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
}

export async function getFeaturedStores(limit = 6) {
  // Fetch a slightly larger pool so sponsored (plus/top tier) stores have
  // reviews/badges to be blended in among, rather than only ever showing
  // sponsored stores when there happen to be `limit`-or-fewer active stores.
  const pool = await prisma.store.findMany({
    where: { status: "active" },
    include: {
      hours: true,
      reviews: { where: { status: "published" } },
    },
    take: Math.max(limit * 4, 24),
    orderBy: { createdAt: "desc" },
  });

  const sponsorTiers = await getActiveSponsorTiers(pool.map((s) => s.id));
  const firstPhotoUrls = await getFirstPhotoUrls(pool.map((s) => s.id));
  const enriched = pool.map((s) =>
    enrichStore(s, undefined, sponsorTiers.get(s.id), firstPhotoUrls.get(s.id))
  );

  enriched.sort((a, b) => {
    const weightA = a.sponsorTier ? SPONSORSHIP_TIERS[a.sponsorTier].boostWeight : 0;
    const weightB = b.sponsorTier ? SPONSORSHIP_TIERS[b.sponsorTier].boostWeight : 0;
    // Only the two higher tiers ("plus"/"top") buy featured placement on the
    // homepage — see SPONSORSHIP_TIERS. Basic only boosts search/category
    // ranking (handled in getStores above).
    const featuredWeightA = weightA >= SPONSORSHIP_TIERS.plus.boostWeight ? weightA : 0;
    const featuredWeightB = weightB >= SPONSORSHIP_TIERS.plus.boostWeight ? weightB : 0;
    if (featuredWeightA !== featuredWeightB) return featuredWeightB - featuredWeightA;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return enriched.slice(0, limit).map((s) => serializeStore(s));
}

export async function getActiveStoreCount() {
  return prisma.store.count({ where: { status: "active" } });
}

// --- Create / claim / edit -------------------------------------------------

async function uniqueSlug(name: string, excludeId?: string): Promise<string> {
  const base = slugify(name) || "store";
  let candidate = base;
  let suffix = 1;
  // Small tables (a directory of local stores), so a loop of unique checks
  // is simpler and fine — no need for a random-suffix strategy.
  while (
    await prisma.store.findFirst({
      where: { slug: candidate, ...(excludeId ? { id: { not: excludeId } } : {}) },
      select: { id: true },
    })
  ) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
  return candidate;
}

function normalizeOptional(value: string | undefined): string | null {
  if (value === undefined) return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

function hoursUpsertData(hours: StoreCreateInput["hours"]) {
  if (!hours || hours.length === 0) return [];
  return hours.map((h) => ({
    dayOfWeek: h.dayOfWeek,
    openTime: h.openTime,
    closeTime: h.closeTime,
    isClosed: h.isClosed,
  }));
}

export async function createStore(userId: string, input: StoreCreateInput) {
  const slug = await uniqueSlug(input.name);

  const store = await prisma.store.create({
    data: {
      slug,
      name: input.name,
      description: input.description,
      addressLine: input.addressLine,
      city: input.city,
      postalCode: input.postalCode,
      country: input.country || "DE",
      latitude: input.latitude,
      longitude: input.longitude,
      phone: normalizeOptional(input.phone),
      website: normalizeOptional(input.website),
      email: normalizeOptional(input.email),
      coverImage: normalizeOptional(input.coverImage),
      fairBadges: JSON.stringify(input.fairBadges ?? []),
      categories: JSON.stringify(input.categories ?? []),
      // Lenient by design: listings go live immediately instead of
      // waiting in a moderator queue. Trust is built *after* publication
      // through community attestations (see castAttestation below) —
      // enough disputes automatically pulls a listing back out of the
      // public directory into the moderation queue, so review effort is
      // spent on the small number of listings people actually flag
      // rather than on every single submission up front.
      status: "active",
      createdById: userId,
      // ownerUserId stays null: adding a listing (e.g. cataloguing an
      // Eine-Welt-Laden you found) is not the same as being the shop's
      // owner. The person who submitted it can still edit it via
      // canEditStore()'s createdById fallback, but a *verified* owner has
      // to go through the claim flow — that's what unlocks the badge and
      // takes precedence once approved.
      hours: { create: hoursUpsertData(input.hours) },
    },
    include: { hours: true },
  });

  return store;
}

/**
 * Authorization rule shared by the edit page and the PATCH endpoint:
 * admins/moderators can edit anything; otherwise only the current owner
 * (set at creation time, or via an approved claim) may edit.
 */
export function canEditStore(
  store: Pick<Store, "ownerUserId" | "createdById">,
  user: { id: string; role?: string } | null | undefined
): boolean {
  if (!user) return false;
  if (user.role === "admin" || user.role === "moderator") return true;
  if (store.ownerUserId) return store.ownerUserId === user.id;
  return store.createdById === user.id;
}

/**
 * Deliberately narrower than canEditStore: unlike editing (which the
 * original creator of a still-unclaimed listing may also do), deleting is
 * reserved for admins/moderators, or the store's *confirmed* owner —
 * someone who merely created an unclaimed listing doesn't get to remove
 * it outright.
 */
export function canDeleteStore(
  store: Pick<Store, "ownerUserId">,
  user: { id: string; role?: string } | null | undefined
): boolean {
  if (!user) return false;
  if (user.role === "admin" || user.role === "moderator") return true;
  return store.ownerUserId === user.id;
}

/**
 * Permanently removes a store. All dependent rows (hours, products,
 * reviews, photos, claims, attestations, edit suggestions, sponsorship
 * history, analytics, transfers, ...) cascade via the schema's
 * onDelete: Cascade relations — see prisma/schema.prisma. This function
 * additionally handles the two things a DB cascade can't: canceling any
 * live Mollie subscription, and removing uploaded files from disk.
 *
 * Authorization is the caller's responsibility — see canDeleteStore().
 */
export async function deleteStore(slug: string): Promise<{ error: "NOT_FOUND" } | { success: true }> {
  const store = await prisma.store.findUnique({
    where: { slug },
    include: { photos: true },
  });
  if (!store) return { error: "NOT_FOUND" };

  const activeSponsorship = await getActiveSponsorship(store.id);
  if (activeSponsorship) {
    await cancelSponsorship(store.id);
  }

  await prisma.store.delete({ where: { id: store.id } });

  await deleteStoreCoverFileIfLocal(store.coverImage);
  await Promise.all(store.photos.map((p) => deleteStorePhotoFileIfLocal(p.url)));

  return { success: true };
}

export async function updateStore(
  slug: string,
  input: StoreUpdateInput,
  options: { resetVerification: boolean }
) {
  const existing = await prisma.store.findUnique({ where: { slug } });
  if (!existing) return null;

  const newSlug = input.name && input.name !== existing.name
    ? await uniqueSlug(input.name, existing.id)
    : existing.slug;

  const store = await prisma.$transaction(async (tx) => {
    const updated = await tx.store.update({
      where: { id: existing.id },
      data: {
        slug: newSlug,
        name: input.name,
        description: input.description,
        addressLine: input.addressLine,
        city: input.city,
        postalCode: input.postalCode,
        country: input.country || existing.country,
        latitude: input.latitude,
        longitude: input.longitude,
        phone: normalizeOptional(input.phone),
        website: normalizeOptional(input.website),
        email: normalizeOptional(input.email),
        coverImage: normalizeOptional(input.coverImage),
        fairBadges: JSON.stringify(input.fairBadges ?? []),
        categories: JSON.stringify(input.categories ?? []),
        // Non-privileged edits invalidate prior community trust: the
        // content changed, so old confirmations don't necessarily apply
        // to what's live now. Admin/moderator edits are exempt since
        // those are already a trusted source.
        ...(options.resetVerification
          ? { verificationLevel: "unverified" as const, confirmCount: 0, disputeCount: 0 }
          : {}),
      },
    });

    if (options.resetVerification) {
      await tx.storeAttestation.deleteMany({ where: { storeId: existing.id } });
    }

    if (input.hours) {
      await tx.storeHours.deleteMany({ where: { storeId: existing.id } });
      if (input.hours.length > 0) {
        await tx.storeHours.createMany({
          data: input.hours.map((h) => ({ ...h, storeId: existing.id })),
        });
      }
    }

    return updated;
  });

  const withHours = await prisma.store.findUnique({
    where: { id: store.id },
    include: { hours: true },
  });

  return withHours;
}

export async function getStoreForEdit(slug: string) {
  const store = await prisma.store.findUnique({
    where: { slug },
    include: { hours: { orderBy: { dayOfWeek: "asc" } } },
  });
  if (!store) return null;
  return {
    ...store,
    fairBadges: parseJsonArray(store.fairBadges),
    categories: parseJsonArray(store.categories),
  };
}

export async function createStoreClaim(
  storeSlug: string,
  userId: string,
  data: { proofText: string; businessEmail?: string }
): Promise<
  | { error: "NOT_FOUND" | "ALREADY_OWNER" | "ALREADY_PENDING" }
  | { claim: Awaited<ReturnType<typeof prisma.storeClaim.create>> }
> {
  const store = await prisma.store.findUnique({ where: { slug: storeSlug } });
  if (!store) {
    return { error: "NOT_FOUND" as const };
  }
  if (store.ownerUserId === userId) {
    return { error: "ALREADY_OWNER" as const };
  }

  const existingPending = await prisma.storeClaim.findFirst({
    where: { storeId: store.id, userId, status: "pending" },
  });
  if (existingPending) {
    return { error: "ALREADY_PENDING" as const };
  }

  const claim = await prisma.storeClaim.create({
    data: {
      storeId: store.id,
      userId,
      proofText: data.businessEmail
        ? `Geschäftliche E-Mail: ${data.businessEmail}\n\n${data.proofText}`
        : data.proofText,
      status: "pending",
    },
  });

  return { claim };
}

/**
 * One review per person per store (see Review's @@unique([storeId, userId])
 * in schema.prisma) — submitting again edits the existing review instead of
 * creating a duplicate.
 */
export async function upsertReview(
  storeSlug: string,
  userId: string,
  data: { rating: number; title?: string; body: string }
): Promise<{ error: "NOT_FOUND" | "OWN_STORE" } | { review: Review }> {
  const store = await prisma.store.findUnique({ where: { slug: storeSlug } });
  if (!store) return { error: "NOT_FOUND" };
  // Only the current owner (or the creator, while the store is still
  // unclaimed) is "responsible" for the listing. Once someone else has
  // claimed it, the original creator is just a regular user again and is
  // free to review it.
  const isResponsible =
    store.ownerUserId === userId || (store.createdById === userId && store.ownerUserId === null);
  if (isResponsible) {
    return { error: "OWN_STORE" };
  }

  const review = await prisma.review.upsert({
    where: { storeId_userId: { storeId: store.id, userId } },
    create: {
      storeId: store.id,
      userId,
      rating: data.rating,
      title: data.title || null,
      body: data.body,
    },
    update: {
      rating: data.rating,
      title: data.title || null,
      body: data.body,
      // Editing is meaningfully new content, so un-hide it even if a
      // moderator had previously hidden the old version.
      status: "published",
    },
  });

  return { review };
}

/**
 * Deletes a review — author-only. (Moderators hide reviews instead, via
 * hideReview(), so the report trail is preserved; a straight delete here is
 * for the author removing their own content.)
 */
export async function deleteReview(
  reviewId: string,
  userId: string
): Promise<{ error: "NOT_FOUND" | "FORBIDDEN" } | { success: true }> {
  const review = await prisma.review.findUnique({ where: { id: reviewId }, select: { userId: true } });
  if (!review) return { error: "NOT_FOUND" };
  if (review.userId !== userId) return { error: "FORBIDDEN" };

  await prisma.review.delete({ where: { id: reviewId } });
  return { success: true };
}

export async function isStoreSaved(storeId: string, userId: string): Promise<boolean> {
  const row = await prisma.savedStore.findUnique({
    where: { userId_storeId: { userId, storeId } },
  });
  return Boolean(row);
}

export async function saveStore(storeId: string, userId: string) {
  await prisma.savedStore.upsert({
    where: { userId_storeId: { userId, storeId } },
    update: {},
    create: { userId, storeId },
  });
}

export async function unsaveStore(storeId: string, userId: string) {
  await prisma.savedStore.deleteMany({ where: { userId, storeId } });
}

export async function getSavedStores(userId: string) {
  const saved = await prisma.savedStore.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      store: {
        include: {
          hours: true,
          reviews: { where: { status: "published" } },
        },
      },
    },
  });

  const sponsorTiers = await getActiveSponsorTiers(saved.map((s) => s.storeId));
  const firstPhotoUrls = await getFirstPhotoUrls(saved.map((s) => s.storeId));
  return saved.map((s) =>
    serializeStore(
      enrichStore(s.store, undefined, sponsorTiers.get(s.storeId), firstPhotoUrls.get(s.storeId))
    )
  );
}

export async function getUserStoreOverview(userId: string) {
  const [createdOrOwned, claims] = await Promise.all([
    prisma.store.findMany({
      // Confirmed owner always sees it. The original submitter only sees
      // it while it's still unclaimed — once someone else's claim gets
      // approved and ownerUserId is set to them, it drops off the
      // creator's dashboard (they've lost every permission on it anyway,
      // see canEditStore).
      where: {
        OR: [{ ownerUserId: userId }, { AND: [{ createdById: userId }, { ownerUserId: null }] }],
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.storeClaim.findMany({
      where: { userId },
      include: { store: { select: { slug: true, name: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const sponsorships = await prisma.sponsorshipSubscription.findMany({
    where: {
      storeId: { in: createdOrOwned.map((s) => s.id) },
      status: { in: ["incomplete", "active", "past_due"] },
    },
    select: { storeId: true, tier: true, status: true },
  });
  const sponsorshipByStore = new Map(sponsorships.map((s) => [s.storeId, s]));

  const pendingTransfers = await prisma.ownershipTransfer.findMany({
    where: { storeId: { in: createdOrOwned.map((s) => s.id) }, status: "pending" },
    select: { storeId: true, toUser: { select: { name: true, email: true } } },
  });
  const pendingTransferByStore = new Map(pendingTransfers.map((t) => [t.storeId, t]));

  const stores = createdOrOwned.map((store) => ({
    ...store,
    sponsorship: sponsorshipByStore.get(store.id) ?? null,
    pendingTransfer: pendingTransferByStore.get(store.id) ?? null,
  }));

  return { stores, claims };
}

// --- Community attestations -------------------------------------------------

export function canModerate(user: { role?: string } | null | undefined): boolean {
  return user?.role === "admin" || user?.role === "moderator";
}

/**
 * Total open moderation items (flagged stores + photos past the report
 * threshold + reviews past the report threshold + pending claims + pending
 * edit suggestions on unmanaged stores) — drives the red badge in the nav.
 * Computed server-side so it's correct on first render, no client fetch
 * involved.
 */
export async function getPendingModerationCount(): Promise<number> {
  const [
    flaggedStores,
    pendingClaims,
    pendingCommunitySuggestions,
    photosWithReportCounts,
    reviewsWithReportCounts,
  ] = await Promise.all([
      prisma.store.count({ where: { status: "pending" } }),
      prisma.storeClaim.count({ where: { status: "pending" } }),
      // Edit suggestions on unmanaged stores — see listCommunitySuggestions()
      // in lib/edit-suggestions.ts for the queue this count backs.
      prisma.storeEditSuggestion.count({
        where: { status: "pending", store: { ownerUserId: null } },
      }),
      // Prisma can't filter a relation by count threshold directly, so we
      // pull just the report counts for photos that have at least one report
      // and apply the same >= PHOTO_REPORT_THRESHOLD filter listReportedPhotos()
      // uses as the visible source of truth.
      prisma.storePhoto.findMany({
        where: { reports: { some: {} } },
        select: { _count: { select: { reports: true } } },
      }),
      // Same idea for reviews, against REVIEW_REPORT_THRESHOLD.
      prisma.review.findMany({
        where: { reports: { some: {} } },
        select: { _count: { select: { reports: true } } },
      }),
    ]);

  const reportedPhotosOverThreshold = photosWithReportCounts.filter(
    (p) => p._count.reports >= PHOTO_REPORT_THRESHOLD
  ).length;
  const reportedReviewsOverThreshold = reviewsWithReportCounts.filter(
    (r) => r._count.reports >= REVIEW_REPORT_THRESHOLD
  ).length;

  return (
    flaggedStores +
    reportedPhotosOverThreshold +
    reportedReviewsOverThreshold +
    pendingClaims +
    pendingCommunitySuggestions
  );
}

export async function adjustTrustScore(userId: string | null | undefined, delta: number) {
  if (!userId || delta === 0) return;
  await prisma.user.update({
    where: { id: userId },
    data: { trustScore: { increment: delta } },
  });
}

export async function castAttestation(
  storeSlug: string,
  userId: string,
  vote: AttestationVote,
  reason?: string
): Promise<{ error: "NOT_FOUND" | "OWN_STORE" } | { store: Store }> {
  const store = await prisma.store.findUnique({ where: { slug: storeSlug } });
  if (!store) return { error: "NOT_FOUND" };
  // The submitter/owner vouching for their own listing wouldn't mean much
  // as an "independent" confirmation, so they're excluded from voting on
  // it — they can still fix problems directly by editing the listing.
  // Once someone else has claimed the store, the original creator is no
  // longer "responsible" for it and can vote like anyone else.
  const isResponsible =
    store.ownerUserId === userId || (store.createdById === userId && store.ownerUserId === null);
  if (isResponsible) {
    return { error: "OWN_STORE" };
  }

  await prisma.storeAttestation.upsert({
    where: { storeId_userId: { storeId: store.id, userId } },
    create: { storeId: store.id, userId, vote, reason: reason || null },
    update: { vote, reason: reason || null },
  });

  const [confirmCount, disputeCount] = await Promise.all([
    prisma.storeAttestation.count({ where: { storeId: store.id, vote: "confirm" } }),
    prisma.storeAttestation.count({ where: { storeId: store.id, vote: "dispute" } }),
  ]);

  const net = confirmCount - disputeCount;
  const responsibleUserId = store.ownerUserId ?? store.createdById;

  let nextStatus = store.status;
  let nextVerification = store.verificationLevel;

  if (
    store.verificationLevel === "unverified" &&
    net >= ATTESTATION_THRESHOLDS.communityVerify
  ) {
    nextVerification = "community";
    await adjustTrustScore(responsibleUserId, TRUST_SCORE_DELTAS.storeCommunityVerified);
  }

  if (store.status === "active" && -net >= ATTESTATION_THRESHOLDS.flagForReview) {
    // Enough independent disputes: pull the listing from the public
    // directory and hand it to a human moderator rather than deciding
    // automatically — disputes can be wrong too, so this stage always
    // needs a person to look at the "reason" text before rejecting.
    nextStatus = "pending";
    await adjustTrustScore(responsibleUserId, TRUST_SCORE_DELTAS.storeFlagged);
  }

  const updated = await prisma.store.update({
    where: { id: store.id },
    data: { confirmCount, disputeCount, status: nextStatus, verificationLevel: nextVerification },
  });

  return { store: updated };
}

// --- Moderation queue --------------------------------------------------------

export async function listFlaggedStores() {
  return prisma.store.findMany({
    where: { status: "pending" },
    include: {
      attestations: {
        where: { vote: "dispute" },
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      },
      createdBy: { select: { id: true, name: true, email: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
}

export async function reviewFlaggedStore(
  storeId: string,
  action: "approve" | "reject",
  adminUserId: string
) {
  const store = await prisma.store.findUnique({ where: { id: storeId } });
  if (!store) return null;

  const responsibleUserId = store.ownerUserId ?? store.createdById;

  if (action === "approve") {
    const updated = await prisma.store.update({
      where: { id: storeId },
      data: { status: "active", verificationLevel: "admin" },
    });
    await adjustTrustScore(responsibleUserId, TRUST_SCORE_DELTAS.storeAdminVerified);
    return updated;
  }

  const updated = await prisma.store.update({
    where: { id: storeId },
    data: { status: "rejected" },
  });
  await adjustTrustScore(responsibleUserId, TRUST_SCORE_DELTAS.storeRejected);
  return updated;
}

export async function verifyStoreByAdmin(slug: string) {
  const store = await prisma.store.findUnique({ where: { slug } });
  if (!store) return null;
  const updated = await prisma.store.update({
    where: { slug },
    data: { verificationLevel: "admin", status: "active" },
  });
  await adjustTrustScore(
    store.ownerUserId ?? store.createdById,
    TRUST_SCORE_DELTAS.storeAdminVerified
  );
  return updated;
}

export async function listPendingClaims() {
  return prisma.storeClaim.findMany({
    where: { status: "pending" },
    include: {
      store: { select: { slug: true, name: true, ownerUserId: true } },
      user: { select: { id: true, name: true, email: true, trustScore: true } },
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function reviewClaim(
  claimId: string,
  action: "approve" | "reject",
  adminUserId: string
) {
  const claim = await prisma.storeClaim.findUnique({ where: { id: claimId } });
  if (!claim) return null;

  if (action === "approve") {
    const [, updatedClaim] = await prisma.$transaction([
      prisma.store.update({ where: { id: claim.storeId }, data: { ownerUserId: claim.userId } }),
      prisma.storeClaim.update({
        where: { id: claimId },
        data: { status: "approved", reviewedBy: adminUserId },
      }),
      // Any other still-open claims on the same store no longer apply
      // once someone else has been confirmed as the owner.
      prisma.storeClaim.updateMany({
        where: { storeId: claim.storeId, id: { not: claimId }, status: "pending" },
        data: { status: "rejected", reviewedBy: adminUserId },
      }),
    ]);
    await adjustTrustScore(claim.userId, TRUST_SCORE_DELTAS.claimApproved);
    return updatedClaim;
  }

  const updatedClaim = await prisma.storeClaim.update({
    where: { id: claimId },
    data: { status: "rejected", reviewedBy: adminUserId },
  });
  await adjustTrustScore(claim.userId, TRUST_SCORE_DELTAS.claimRejected);
  return updatedClaim;
}

// Re-exported for any server-side code that still imports these from here.
// Client components must import from "@/lib/constants" directly instead,
// since this file pulls in the Prisma/pg client and cannot be bundled client-side.
export { FAIR_BADGE_LABELS, CATEGORIES } from "./constants";