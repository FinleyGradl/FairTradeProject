import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stores = await prisma.store.findMany({
    where: { status: "active" },
    select: { slug: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });

  const storeEntries: MetadataRoute.Sitemap = stores.map((store) => ({
    url: `${siteUrl}/stores/${store.slug}`,
    lastModified: store.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const staticEntries: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/add-store`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/impressum`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/datenschutz`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/nutzungsbedingungen`, changeFrequency: "yearly", priority: 0.2 },
  ];

  return [...staticEntries, ...storeEntries];
}