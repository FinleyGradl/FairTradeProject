import crypto from "node:crypto";
import { prisma } from "@/lib/db";
import { resolveCountry } from "@/lib/geo-ip";

/** Zeroes out the host part of an IP so we never persist a full address. */
function anonymizeIp(ip: string): string {
  if (ip.includes(":")) {
    // IPv6 — keep only the first 3 groups (~/48, roughly ISP-block level).
    const groups = ip.split(":");
    return groups.slice(0, 3).join(":") + "::";
  }
  const parts = ip.split(".");
  if (parts.length === 4) {
    parts[3] = "0";
    return parts.join(".");
  }
  return ip;
}

function clientIp(headers: { get(name: string): string | null }): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip");
}

/**
 * Daily-rotating salted hash — lets us count roughly-unique visitors per day
 * without ever storing anything that identifies a person across days or that
 * could be reversed back to an IP address.
 */
function visitorHash(anonymizedIp: string, userAgent: string | null): string {
  const daySalt = new Date().toISOString().slice(0, 10);
  return crypto
    .createHash("sha256")
    .update(`${daySalt}|${anonymizedIp}|${userAgent ?? ""}`)
    .digest("hex");
}

export async function recordPageView(params: {
  storeId: string;
  path: string;
  referrerUrl?: string | null;
  request: { headers: { get(name: string): string | null } };
}) {
  const ip = clientIp(params.request.headers);
  const anonymized = ip ? anonymizeIp(ip) : "unknown";
  const userAgent = params.request.headers.get("user-agent");

  let referrerHost: string | null = null;
  if (params.referrerUrl) {
    try {
      referrerHost = new URL(params.referrerUrl).host;
    } catch {
      referrerHost = null;
    }
  }

  const country = await resolveCountry(params.request, ip);

  await prisma.pageView.create({
    data: {
      storeId: params.storeId,
      path: params.path,
      referrerUrl: params.referrerUrl?.slice(0, 500) ?? null,
      referrerHost,
      country,
      visitorHash: visitorHash(anonymized, userAgent),
    },
  });
}

/** Fire-and-forget wrapper so a tracking failure never breaks the page/API response it's called from. */
export function recordPageViewSafe(params: Parameters<typeof recordPageView>[0]) {
  recordPageView(params).catch((err) => console.error("recordPageView failed:", err));
}

export async function recordSearchImpressions(storeIds: string[], query?: string) {
  if (storeIds.length === 0) return;
  try {
    await prisma.searchImpression.createMany({
      data: storeIds.map((storeId) => ({ storeId, query: query?.slice(0, 200) || null })),
    });
  } catch (err) {
    console.error("recordSearchImpressions failed:", err);
  }
}

// --- Aggregation for the owner-facing insights dashboard --------------------

export interface StoreInsights {
  rangeDays: number;
  totalViews: number;
  uniqueVisitors: number;
  viewsByDay: { date: string; views: number }[];
  topReferrers: { host: string; count: number }[];
  topCountries: { country: string; count: number }[];
  searchQueries: { query: string; impressions: number; clicks: number }[];
}

export async function getStoreInsights(storeId: string, rangeDays = 30): Promise<StoreInsights> {
  const since = new Date(Date.now() - rangeDays * 24 * 60 * 60 * 1000);

  const [views, impressions] = await Promise.all([
    prisma.pageView.findMany({
      where: { storeId, createdAt: { gte: since } },
      select: { referrerUrl: true, referrerHost: true, country: true, visitorHash: true, createdAt: true },
    }),
    prisma.searchImpression.findMany({
      where: { storeId, createdAt: { gte: since } },
      select: { query: true },
    }),
  ]);

  const totalViews = views.length;
  const uniqueVisitors = new Set(views.map((v) => v.visitorHash)).size;

  const byDay = new Map<string, number>();
  for (let i = rangeDays - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    byDay.set(d, 0);
  }
  for (const v of views) {
    const d = v.createdAt.toISOString().slice(0, 10);
    if (byDay.has(d)) byDay.set(d, (byDay.get(d) ?? 0) + 1);
  }

  const referrerCounts = new Map<string, number>();
  const countryCounts = new Map<string, number>();
  const clicksByQuery = new Map<string, number>();

  const appHost = (() => {
    try {
      return process.env.APP_URL ? new URL(process.env.APP_URL).host : null;
    } catch {
      return null;
    }
  })();

  for (const v of views) {
    const label = !v.referrerHost
      ? "Direkt / unbekannt"
      : appHost && v.referrerHost === appHost
        ? "Intern (FairFind)"
        : v.referrerHost;
    referrerCounts.set(label, (referrerCounts.get(label) ?? 0) + 1);

    if (v.country) countryCounts.set(v.country, (countryCounts.get(v.country) ?? 0) + 1);

    // Attribute a view to a search query if it came from our own
    // /search or /explore page with a `q` parameter — this approximates
    // "clicks" for a given query, similar to Search Console.
    if (v.referrerUrl) {
      try {
        const url = new URL(v.referrerUrl);
        if ((url.pathname === "/search" || url.pathname === "/explore")) {
          const q = url.searchParams.get("q");
          if (q) clicksByQuery.set(q, (clicksByQuery.get(q) ?? 0) + 1);
        }
      } catch {
        // ignore malformed referrer URLs
      }
    }
  }

  const impressionsByQuery = new Map<string, number>();
  for (const imp of impressions) {
    const q = imp.query ?? "(ohne Suchbegriff)";
    impressionsByQuery.set(q, (impressionsByQuery.get(q) ?? 0) + 1);
  }

  const allQueries = new Set([...impressionsByQuery.keys(), ...clicksByQuery.keys()]);
  const searchQueries = [...allQueries]
    .map((query) => ({
      query,
      impressions: impressionsByQuery.get(query) ?? 0,
      clicks: clicksByQuery.get(query) ?? 0,
    }))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 20);

  return {
    rangeDays,
    totalViews,
    uniqueVisitors,
    viewsByDay: [...byDay.entries()].map(([date, count]) => ({ date, views: count })),
    topReferrers: [...referrerCounts.entries()]
      .map(([host, count]) => ({ host, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
    topCountries: [...countryCounts.entries()]
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
    searchQueries,
  };
}