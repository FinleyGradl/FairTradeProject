import { prisma } from "@/lib/db";
import { filterByRadius } from "@/lib/geo";
import { parseJsonArray } from "@/lib/utils";
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

// Re-exported for any server-side code that still imports these from here.
// Client components must import from "@/lib/constants" directly instead,
// since this file pulls in the Prisma/pg client and cannot be bundled client-side.
export { FAIR_BADGE_LABELS, CATEGORIES } from "./constants";
