// path: src/lib/products.ts
//
// Products belong to a store and don't have an owner field of their own —
// "who may touch a product" is always derived from the parent store's
// canEditStore() check. Two ways to change a product:
//   - Direct: whoever can edit the store (owner/creator-of-unclaimed/
//     admin/moderator) creates/edits/deletes products immediately via
//     createProduct/updateProduct/deleteProduct below.
//   - Suggested: anyone else proposes a create/edit/delete via
//     ProductSuggestion — same managed/unmanaged review split as
//     StoreEditSuggestion (see lib/edit-suggestions.ts), which this module
//     closely mirrors.
import { prisma } from "@/lib/db";
import { canEditStore, canModerate, adjustTrustScore } from "@/lib/stores";
import { slugify } from "@/lib/utils";
import { TRUST_SCORE_DELTAS, EDIT_SUGGESTION_THRESHOLDS } from "@/lib/trust";
import type { ProductSuggestionInput, ProductCreateInput, ProductUpdateInput } from "@/lib/validators/product";
import type { ProductSuggestionChanges } from "@/lib/product-suggestion-diff";
import type { Store, Product, AttestationVote } from "../../prisma/generated/prisma/client";

export type { ProductSuggestionChanges };

export function parseProductSuggestionChanges(raw: string): ProductSuggestionChanges {
  return JSON.parse(raw) as ProductSuggestionChanges;
}

function normalizeOptional(value: string | undefined): string | null {
  if (value === undefined) return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

async function uniqueProductSlug(storeId: string, name: string, excludeId?: string): Promise<string> {
  const base = slugify(name) || "produkt";
  let candidate = base;
  let suffix = 1;
  while (
    await prisma.product.findFirst({
      where: { storeId, slug: candidate, ...(excludeId ? { id: { not: excludeId } } : {}) },
      select: { id: true },
    })
  ) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
  return candidate;
}

// --- Direct CRUD (owner/admin/moderator) ------------------------------------

export async function createProduct(storeId: string, input: ProductCreateInput): Promise<Product> {
  const slug = await uniqueProductSlug(storeId, input.name);
  return prisma.product.create({
    data: {
      storeId,
      name: input.name,
      slug,
      description: normalizeOptional(input.description),
      price: input.price ?? null,
      currency: input.currency || "EUR",
      category: normalizeOptional(input.category),
      imageUrl: normalizeOptional(input.imageUrl),
      inStock: input.inStock,
    },
  });
}

export async function updateProduct(productId: string, input: ProductUpdateInput): Promise<Product> {
  const data: Record<string, unknown> = {};
  if (input.name !== undefined) {
    data.name = input.name;
    const product = await prisma.product.findUnique({ where: { id: productId }, select: { storeId: true } });
    if (product) data.slug = await uniqueProductSlug(product.storeId, input.name, productId);
  }
  if (input.description !== undefined) data.description = normalizeOptional(input.description);
  if (input.price !== undefined) data.price = input.price;
  if (input.category !== undefined) data.category = normalizeOptional(input.category);
  if (input.imageUrl !== undefined) data.imageUrl = normalizeOptional(input.imageUrl);
  if (input.inStock !== undefined) data.inStock = input.inStock;

  return prisma.product.update({ where: { id: productId }, data });
}

export async function deleteProduct(productId: string): Promise<void> {
  await prisma.product.delete({ where: { id: productId } });
}

/** A store's products for the owner's management panel — includes each
 * product's own rating (not the store-combined one). */
export async function listProductsForStore(storeId: string) {
  const products = await prisma.product.findMany({
    where: { storeId },
    include: { reviews: { where: { status: "published" }, select: { rating: true, status: true } } },
    orderBy: { name: "asc" },
  });
  return products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: p.price,
    currency: p.currency,
    category: p.category,
    imageUrl: p.imageUrl,
    inStock: p.inStock,
    reviewCount: p.reviews.filter((r) => r.status === "published").length,
  }));
}

export function canEditProduct(
  store: Pick<Store, "ownerUserId" | "createdById">,
  user: { id: string; role?: string } | null | undefined
): boolean {
  return canEditStore(store, user);
}

// --- Community-suggested products -------------------------------------------

const SUGGESTABLE_PRODUCT_FIELDS = ["name", "description", "price", "category", "imageUrl", "inStock"] as const;

function normalizeStr(value: string | null | undefined): string {
  return (value ?? "").trim();
}

/** Builds the { field: newValue } diff for an "edit" suggestion, comparing
 * only against fields the caller actually provided. Returns null if
 * nothing actually changed. For a "create" suggestion, every provided
 * field is included as-is (there's no "current" to diff against). */
function buildProductChanges(
  product: Product | null,
  input: ProductSuggestionInput
): ProductSuggestionChanges | null {
  const changes: ProductSuggestionChanges = {};

  if (input.name !== undefined) {
    if (!product || normalizeStr(input.name) !== normalizeStr(product.name)) changes.name = input.name.trim();
  }
  if (input.description !== undefined) {
    if (!product || normalizeStr(input.description) !== normalizeStr(product.description)) {
      changes.description = input.description.trim();
    }
  }
  if (input.price !== undefined) {
    if (!product || input.price !== product.price) changes.price = input.price;
  }
  if (input.category !== undefined) {
    if (!product || normalizeStr(input.category) !== normalizeStr(product.category)) {
      changes.category = input.category.trim();
    }
  }
  if (input.imageUrl !== undefined) {
    if (!product || normalizeStr(input.imageUrl) !== normalizeStr(product.imageUrl)) {
      changes.imageUrl = input.imageUrl.trim();
    }
  }
  if (input.inStock !== undefined) {
    if (!product || input.inStock !== product.inStock) changes.inStock = input.inStock;
  }

  return Object.keys(changes).length > 0 ? changes : null;
}

export async function createProductSuggestion(
  storeSlug: string,
  actingUser: { id: string; role?: string },
  input: ProductSuggestionInput
): Promise<
  | { error: "NOT_FOUND" | "PRODUCT_NOT_FOUND" | "NO_CHANGES" | "CAN_EDIT_DIRECTLY" }
  | { suggestion: Awaited<ReturnType<typeof prisma.productSuggestion.create>> }
> {
  const store = await prisma.store.findUnique({ where: { slug: storeSlug } });
  if (!store) return { error: "NOT_FOUND" };

  // People who can already edit the store directly use the real product
  // forms — suggestions are for everyone else.
  if (canEditStore(store, actingUser)) {
    return { error: "CAN_EDIT_DIRECTLY" };
  }

  let product: Product | null = null;
  if (input.type !== "create") {
    if (!input.productId) return { error: "PRODUCT_NOT_FOUND" };
    product = await prisma.product.findFirst({ where: { id: input.productId, storeId: store.id } });
    if (!product) return { error: "PRODUCT_NOT_FOUND" };
  }

  let changes: ProductSuggestionChanges | null = {};
  if (input.type === "delete") {
    changes = {}; // nothing to diff — the suggestion type alone says "remove this"
  } else {
    changes = buildProductChanges(input.type === "create" ? null : product, input);
    if (!changes) return { error: "NO_CHANGES" };
  }

  const suggestion = await prisma.productSuggestion.create({
    data: {
      storeId: store.id,
      productId: product?.id ?? null,
      type: input.type,
      suggestedByUserId: actingUser.id,
      changes: JSON.stringify(changes),
      note: input.note?.trim() || null,
    },
  });

  return { suggestion };
}

/** Pending product suggestions for a store's owner/admin review queue. */
export async function listPendingProductSuggestionsForStore(storeId: string) {
  return prisma.productSuggestion.findMany({
    where: { storeId, status: "pending" },
    include: {
      suggestedBy: { select: { id: true, name: true, email: true, trustScore: true } },
      product: true,
    },
    orderBy: { createdAt: "asc" },
  });
}

/** Pending product suggestions on *unmanaged* stores — the admin moderation queue. */
export async function listCommunityProductSuggestions() {
  return prisma.productSuggestion.findMany({
    where: { status: "pending", store: { ownerUserId: null } },
    include: {
      store: { select: { id: true, slug: true, name: true, ownerUserId: true } },
      suggestedBy: { select: { id: true, name: true, email: true, trustScore: true } },
      product: true,
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function countPendingCommunityProductSuggestions(): Promise<number> {
  return prisma.productSuggestion.count({
    where: { status: "pending", store: { ownerUserId: null } },
  });
}

/**
 * Pending product suggestions for the public community-vote widget on a
 * store's page — only meaningful for unmanaged (ownerless) stores; the
 * caller is expected to check that first.
 */
export async function listPublicProductSuggestionsForStore(storeId: string, viewerId?: string) {
  const suggestions = await prisma.productSuggestion.findMany({
    where: { storeId, status: "pending" },
    include: { product: true },
    orderBy: { createdAt: "asc" },
  });
  if (suggestions.length === 0) return [];

  const myVotes = viewerId
    ? await prisma.productSuggestionVote.findMany({
        where: { suggestionId: { in: suggestions.map((s) => s.id) }, userId: viewerId },
      })
    : [];
  const voteMap = new Map(myVotes.map((v) => [v.suggestionId, v.vote]));

  return suggestions.map((s) => ({
    id: s.id,
    type: s.type,
    changes: parseProductSuggestionChanges(s.changes),
    note: s.note,
    confirmCount: s.confirmCount,
    disputeCount: s.disputeCount,
    myVote: voteMap.get(s.id) ?? null,
    product: s.product,
  }));
}

/** Applies a suggestion's create/edit/delete to the store's product list. */
async function applyProductSuggestion(
  suggestion: {
    storeId: string;
    productId: string | null;
    type: string;
    changes: string;
  }
): Promise<void> {
  const changes = parseProductSuggestionChanges(suggestion.changes);

  if (suggestion.type === "delete") {
    if (suggestion.productId) {
      await prisma.product.delete({ where: { id: suggestion.productId } }).catch(() => undefined);
    }
    return;
  }

  if (suggestion.type === "create") {
    if (!changes.name) return;
    await createProduct(suggestion.storeId, {
      name: changes.name,
      description: changes.description ?? "",
      price: changes.price ?? null,
      currency: "EUR",
      category: changes.category ?? "",
      imageUrl: changes.imageUrl ?? "",
      inStock: changes.inStock ?? true,
    });
    return;
  }

  // edit
  if (suggestion.productId) {
    await updateProduct(suggestion.productId, {
      ...(changes.name !== undefined ? { name: changes.name } : {}),
      ...(changes.description !== undefined ? { description: changes.description } : {}),
      ...(changes.price !== undefined ? { price: changes.price } : {}),
      ...(changes.category !== undefined ? { category: changes.category } : {}),
      ...(changes.imageUrl !== undefined ? { imageUrl: changes.imageUrl } : {}),
      ...(changes.inStock !== undefined ? { inStock: changes.inStock } : {}),
    }).catch(() => undefined);
  }
}

/**
 * Direct approve/reject by whoever is authorized to review this
 * suggestion: the store's owner if it's managed, or an admin/moderator
 * either way.
 */
export async function reviewProductSuggestion(
  suggestionId: string,
  action: "approve" | "reject",
  actingUser: { id: string; role?: string }
): Promise<{ error: "NOT_FOUND" | "FORBIDDEN" | "ALREADY_REVIEWED" } | { success: true }> {
  const suggestion = await prisma.productSuggestion.findUnique({
    where: { id: suggestionId },
    include: { store: true },
  });
  if (!suggestion) return { error: "NOT_FOUND" };
  if (suggestion.status !== "pending") return { error: "ALREADY_REVIEWED" };

  const isOwner = suggestion.store.ownerUserId === actingUser.id;
  const isModerator = canModerate(actingUser);
  if (!isOwner && !isModerator) {
    return { error: "FORBIDDEN" };
  }

  if (action === "approve") {
    await applyProductSuggestion(suggestion);
    await adjustTrustScore(suggestion.suggestedByUserId, TRUST_SCORE_DELTAS.productSuggestionApplied);
  } else {
    await adjustTrustScore(suggestion.suggestedByUserId, TRUST_SCORE_DELTAS.productSuggestionRejected);
  }

  await prisma.productSuggestion.update({
    where: { id: suggestionId },
    data: {
      status: action === "approve" ? "approved" : "rejected",
      reviewedByUserId: actingUser.id,
      reviewedAt: new Date(),
    },
  });

  return { success: true };
}

/**
 * Community confirm/dispute vote on a pending product suggestion for an
 * *unmanaged* store. Reaching the net-vote threshold either way resolves
 * it automatically — see EDIT_SUGGESTION_THRESHOLDS in lib/trust.ts.
 */
export async function castProductSuggestionVote(
  suggestionId: string,
  userId: string,
  vote: AttestationVote
): Promise<
  | { error: "NOT_FOUND" | "NOT_COMMUNITY_REVIEWABLE" | "OWN_SUGGESTION" | "ALREADY_REVIEWED" }
  | { confirmCount: number; disputeCount: number; status: "pending" | "approved" | "rejected" }
> {
  const suggestion = await prisma.productSuggestion.findUnique({
    where: { id: suggestionId },
    include: { store: true },
  });
  if (!suggestion) return { error: "NOT_FOUND" };
  if (suggestion.store.ownerUserId !== null) {
    return { error: "NOT_COMMUNITY_REVIEWABLE" };
  }
  if (suggestion.status !== "pending") return { error: "ALREADY_REVIEWED" };
  if (suggestion.suggestedByUserId === userId) return { error: "OWN_SUGGESTION" };

  await prisma.productSuggestionVote.upsert({
    where: { suggestionId_userId: { suggestionId, userId } },
    create: { suggestionId, userId, vote },
    update: { vote },
  });

  const [confirmCount, disputeCount] = await Promise.all([
    prisma.productSuggestionVote.count({ where: { suggestionId, vote: "confirm" } }),
    prisma.productSuggestionVote.count({ where: { suggestionId, vote: "dispute" } }),
  ]);

  const net = confirmCount - disputeCount;
  let status: "pending" | "approved" | "rejected" = "pending";

  if (net >= EDIT_SUGGESTION_THRESHOLDS.autoApply) {
    status = "approved";
    await applyProductSuggestion(suggestion);
    await adjustTrustScore(suggestion.suggestedByUserId, TRUST_SCORE_DELTAS.productSuggestionApplied);
  } else if (-net >= EDIT_SUGGESTION_THRESHOLDS.autoReject) {
    status = "rejected";
    await adjustTrustScore(suggestion.suggestedByUserId, TRUST_SCORE_DELTAS.productSuggestionRejected);
  }

  if (status !== "pending") {
    await prisma.productSuggestion.update({
      where: { id: suggestionId },
      data: { status, confirmCount, disputeCount, reviewedAt: new Date() },
    });
  } else {
    await prisma.productSuggestion.update({
      where: { id: suggestionId },
      data: { confirmCount, disputeCount },
    });
  }

  return { confirmCount, disputeCount, status };
}

/**
 * A single product's public detail page — its own store context, its own
 * (product-only, not store-combined) rating, and the viewer's own review
 * if they've left one.
 */
export async function getProductBySlug(storeSlug: string, productSlug: string, viewerId?: string) {
  const store = await prisma.store.findUnique({ where: { slug: storeSlug } });
  if (!store) return null;

  const product = await prisma.product.findUnique({
    where: { storeId_slug: { storeId: store.id, slug: productSlug } },
    include: {
      store: { select: { id: true, slug: true, name: true, city: true, ownerUserId: true, createdById: true } },
      reviews: {
        where: { status: "published" },
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { id: true, name: true, avatarUrl: true } },
          _count: { select: { reports: true } },
        },
      },
    },
  });
  if (!product) return null;

  const myReports =
    viewerId && product.reviews.length > 0
      ? await prisma.productReviewReport.findMany({
          where: { userId: viewerId, productReviewId: { in: product.reviews.map((r) => r.id) } },
          select: { productReviewId: true },
        })
      : [];
  const myReportedIds = new Set(myReports.map((r) => r.productReviewId));

  const published = product.reviews;
  const avgRating =
    published.length > 0
      ? Math.round((published.reduce((sum, r) => sum + r.rating, 0) / published.length) * 10) / 10
      : null;

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    currency: product.currency,
    category: product.category,
    imageUrl: product.imageUrl,
    inStock: product.inStock,
    store: product.store,
    avgRating,
    reviewCount: published.length,
    reviews: product.reviews.map((r) => ({
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
    })),
  };
}
