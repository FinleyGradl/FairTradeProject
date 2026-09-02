// path: src/lib/product-reviews.ts
//
// Product-level reviews — separate from a store's own Review, but pooled
// together with it for the store's overall avgRating (see
// computeCombinedAvgRating() in lib/stores.ts). A product's own page shows
// only its own reviews (computeProductAvgRating() below). Mirrors the
// review helpers in lib/stores.ts closely.
import { prisma } from "@/lib/db";
import { canEditStore } from "@/lib/stores";
import { PRODUCT_REVIEW_REPORT_THRESHOLD } from "@/lib/constants";
import type { ProductReview } from "../../prisma/generated/prisma/client";

export function computeProductAvgRating(reviews: { rating: number; status: string }[]): number | null {
  const published = reviews.filter((r) => r.status === "published");
  if (published.length === 0) return null;
  const sum = published.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / published.length) * 10) / 10;
}

/**
 * Creates or updates the caller's review of a product. The store's owner
 * (or the creator of a still-unclaimed store) can't review their own
 * products — same rule as upsertReview() for stores.
 */
export async function upsertProductReview(
  productId: string,
  userId: string,
  data: { rating: number; title?: string; body: string }
): Promise<{ error: "NOT_FOUND" | "OWN_STORE" } | { review: ProductReview }> {
  const product = await prisma.product.findUnique({ where: { id: productId }, include: { store: true } });
  if (!product) return { error: "NOT_FOUND" };

  const isResponsible =
    product.store.ownerUserId === userId ||
    (product.store.createdById === userId && product.store.ownerUserId === null);
  if (isResponsible) return { error: "OWN_STORE" };

  const review = await prisma.productReview.upsert({
    where: { productId_userId: { productId, userId } },
    create: {
      productId,
      userId,
      rating: data.rating,
      title: data.title || null,
      body: data.body,
    },
    update: {
      rating: data.rating,
      title: data.title || null,
      body: data.body,
      status: "published",
    },
  });

  return { review };
}

/** Published reviews for a single product's own page, newest first. */
export async function listProductReviews(productId: string, viewerId?: string) {
  const reviews = await prisma.productReview.findMany({
    where: { productId, status: "published" },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, avatarUrl: true } },
      _count: { select: { reports: true } },
    },
  });

  const myReports =
    viewerId && reviews.length > 0
      ? await prisma.productReviewReport.findMany({
          where: { userId: viewerId, productReviewId: { in: reviews.map((r) => r.id) } },
          select: { productReviewId: true },
        })
      : [];
  const myReportedIds = new Set(myReports.map((r) => r.productReviewId));

  return reviews.map((r) => ({
    id: r.id,
    rating: r.rating,
    title: r.title,
    body: r.body,
    ownerReply: r.ownerReply,
    ownerReplyAt: r.ownerReplyAt,
    createdAt: r.createdAt,
    user: r.user,
    reportCount: r._count.reports,
    reportedByMe: myReportedIds.has(r.id),
  }));
}

export async function reportProductReview(
  productReviewId: string,
  userId: string,
  reason?: string | null
): Promise<{ reportCount: number; alreadyReported: boolean } | { error: "NOT_FOUND" | "OWN_REVIEW" }> {
  const review = await prisma.productReview.findUnique({
    where: { id: productReviewId },
    select: { id: true, userId: true },
  });
  if (!review) return { error: "NOT_FOUND" };
  if (review.userId === userId) return { error: "OWN_REVIEW" };

  const existing = await prisma.productReviewReport.findUnique({
    where: { productReviewId_userId: { productReviewId, userId } },
  });

  if (!existing) {
    await prisma.productReviewReport.create({ data: { productReviewId, userId, reason: reason || null } });
  }

  const reportCount = await prisma.productReviewReport.count({ where: { productReviewId } });
  return { reportCount, alreadyReported: Boolean(existing) };
}

/** Product reviews that have hit PRODUCT_REVIEW_REPORT_THRESHOLD distinct
 * reports — surfaced to admins/moderators. */
export async function listReportedProductReviews() {
  const reviews = await prisma.productReview.findMany({
    where: { reports: { some: {} } },
    include: {
      product: { select: { id: true, slug: true, name: true, store: { select: { slug: true, name: true } } } },
      user: { select: { id: true, name: true, email: true } },
      reports: { include: { user: { select: { name: true } } }, orderBy: { createdAt: "desc" } },
      _count: { select: { reports: true } },
    },
    orderBy: { reports: { _count: "desc" } },
  });
  return reviews.filter((r) => r._count.reports >= PRODUCT_REVIEW_REPORT_THRESHOLD);
}

/** Moderator action: hides a reported product review instead of deleting
 * it outright — mirrors hideReview() in lib/stores.ts. */
export async function hideProductReview(productReviewId: string): Promise<boolean> {
  const review = await prisma.productReview.findUnique({ where: { id: productReviewId }, select: { id: true } });
  if (!review) return false;
  await prisma.productReview.update({ where: { id: productReviewId }, data: { status: "hidden" } });
  return true;
}

/** Whether `user` may reply to / moderate reviews of this product — same
 * as canEditStore() on the parent store. */
export async function canManageProductReviews(
  productId: string,
  user: { id: string; role?: string } | null | undefined
): Promise<boolean> {
  if (!user) return false;
  const product = await prisma.product.findUnique({ where: { id: productId }, include: { store: true } });
  if (!product) return false;
  return canEditStore(product.store, user);
}
