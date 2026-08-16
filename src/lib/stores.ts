import { prisma } from "@/lib/db";
import { filterByRadius } from "@/lib/geo";
import { parseJsonArray, slugify } from "@/lib/utils";
import type { StoreCreateInput, StoreUpdateInput } from "@/lib/validators/store";
import type { Prisma, Store, Product, Review, StoreHours } from "../../prisma/generated/prisma/client";

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
};

function computeAvgRating(reviews: Review[]): number | null {
  const published = reviews.filter((r) => r.status === "published");
  if (published.length === 0) return null;
  const sum = published.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / published.length) * 10) / 10;
}

function enrichStore(
  store: Store & { hours: StoreHours[]; reviews: Review[] },
  distanceM?: number
): StoreListItem {
  return {
    ...store,
    avgRating: computeAvgRating(store.reviews),
    reviewCount: store.reviews.filter((r) => r.status === "published").length,
    distanceM,
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
    fairBadges: parseJsonArray(store.fairBadges),
    categories: parseJsonArray(store.categories),
    coverImage: store.coverImage,
    avgRating: store.avgRating,
    reviewCount: store.reviewCount,
    distanceM: store.distanceM,
    hours: store.hours,
    isOpen: store.hours.length > 0,
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

  let enriched: StoreListItem[] = stores.map((s) => enrichStore(s));

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

  const total = enriched.length;
  const offset = (page - 1) * limit;
  const paginated = enriched.slice(offset, offset + limit);

  return {
    stores: paginated.map(serializeStore),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
}

export async function getStoreBySlug(slug: string) {
  const store = await prisma.store.findUnique({
    where: { slug },
    include: {
      hours: { orderBy: { dayOfWeek: "asc" } },
      products: { orderBy: { name: "asc" } },
      reviews: {
        where: { status: "published" },
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, avatarUrl: true } } },
      },
      photos: { orderBy: { sortOrder: "asc" } },
      owner: { select: { id: true, name: true } },
    },
  });

  if (!store) return null;

  const listItem = enrichStore(store);
  return {
    ...serializeStore(listItem),
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
    })),
    photos: store.photos,
    owner: store.owner,
  };
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
  const stores = await prisma.store.findMany({
    where: { status: "active" },
    include: {
      hours: true,
      reviews: { where: { status: "published" } },
    },
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  return stores.map((s) => serializeStore(enrichStore(s)));
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
      // New submissions go through moderation before showing up in the
      // public directory — mirrors the "Listings are reviewed before
      // going live" copy on the add-store page.
      status: "pending",
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

export async function updateStore(slug: string, input: StoreUpdateInput) {
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
      },
    });

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

export async function getUserStoreOverview(userId: string) {
  const [createdOrOwned, claims] = await Promise.all([
    prisma.store.findMany({
      where: { OR: [{ createdById: userId }, { ownerUserId: userId }] },
      orderBy: { createdAt: "desc" },
    }),
    prisma.storeClaim.findMany({
      where: { userId },
      include: { store: { select: { slug: true, name: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return { stores: createdOrOwned, claims };
}

// Re-exported for any server-side code that still imports these from here.
// Client components must import from "@/lib/constants" directly instead,
// since this file pulls in the Prisma/pg client and cannot be bundled client-side.
export { FAIR_BADGE_LABELS, CATEGORIES } from "./constants";