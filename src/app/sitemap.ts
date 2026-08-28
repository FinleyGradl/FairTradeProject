import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

const BASE_URL = "https://traceable.ddns.net";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Statische Seiten
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/explore`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/add-store`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // Kategorie-Seiten
    {
      url: `${BASE_URL}/kategorie/mode`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/kategorie/lebensmittel`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/kategorie/kaffee-tee`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/kategorie/geschenke`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/kategorie/zero-waste`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // Dynamische Store-Seiten aus der Datenbank
  let storeRoutes: MetadataRoute.Sitemap = [];
  try {
    const stores = await prisma.store.findMany({
      where: { status: "active" },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });

    storeRoutes = stores.map((store) => ({
      url: `${BASE_URL}/stores/${store.slug}`,
      lastModified: store.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // Datenbank nicht erreichbar beim Build – Store-URLs werden beim nächsten
    // Request neu generiert (force-dynamic ist gesetzt)
    console.warn("[sitemap] Datenbank nicht erreichbar – Store-URLs werden übersprungen.");
  }

  return [...staticRoutes, ...storeRoutes];
}

// Immer frisch rendern, damit neue Stores sofort in der Sitemap erscheinen
export const dynamic = "force-dynamic";
