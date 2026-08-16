import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

/**
 * Bulk-Import-Endpoint für Store-Daten aus externen Quellen (z.B. die
 * offizielle Weltladen-Liste). Gedacht für Server-zu-Server-Aufrufe
 * (Skripte, Cronjobs), NICHT für den Browser — daher Token-Auth statt
 * NextAuth-Session, siehe requireImportToken() unten.
 *
 * Aufruf:
 *   POST /api/v1/admin/import/stores
 *   Authorization: Bearer <IMPORT_API_TOKEN>
 *   Body: { dryRun?: boolean, items: ImportStoreInput[] }
 *
 * Idempotent: ein Item, das anhand von Name+Adresse bereits als Store
 * existiert, wird übersprungen statt dupliziert. Beim erneuten Ausführen
 * mit denselben Daten ändert sich also nichts mehr.
 */

const IMPORT_USER_EMAIL = "import@weltladen-import.local";
const IMPORT_USER_NAME = "Weltladen Import";

const fairBadgeEnum = z.enum(["fairtrade", "wfto", "bcorp", "organic"]);
const statusEnum = z.enum(["pending", "active", "rejected", "closed"]);

const importHourSchema = z
  .object({
    dayOfWeek: z.number().int().min(0).max(6),
    openTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "HH:MM erwartet"),
    closeTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "HH:MM erwartet"),
    isClosed: z.boolean().default(false),
  })
  .refine((h) => h.isClosed || h.closeTime > h.openTime, {
    message: "Schließzeit muss nach der Öffnungszeit liegen",
    path: ["closeTime"],
  });

// Bewusst etwas großzügiger als storeBaseSchema (max 6 Kategorien): die
// Quelldaten liefern teils mehr Produkt-Tags pro Laden.
const importStoreSchema = z.object({
  name: z.string().min(2).max(160),
  description: z.string().min(10).max(2000),
  addressLine: z.string().min(1).max(200),
  city: z.string().min(1).max(100),
  postalCode: z.string().min(1).max(20),
  country: z.string().length(2).default("DE"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  phone: z.string().max(40).nullish(),
  website: z.string().url().nullish(),
  email: z.string().email().nullish(),
  fairBadges: z.array(fairBadgeEnum).max(4).optional().default([]),
  categories: z.array(z.string().max(60)).max(20).optional().default([]),
  hours: z.array(importHourSchema).max(7).optional().default([]),
  status: statusEnum.optional().default("active"),
});

const importBodySchema = z.object({
  dryRun: z.boolean().optional().default(false),
  items: z.array(z.unknown()).min(1).max(500),
});

type ImportResult = {
  index: number;
  name: string;
  outcome: "created" | "skipped" | "would_create" | "would_skip" | "invalid" | "error";
  slug?: string;
  storeId?: string;
  reason?: string;
};

function requireImportToken(request: NextRequest): NextResponse | null {
  const expected = process.env.IMPORT_API_TOKEN;
  if (!expected) {
    // Fail closed: ohne konfiguriertes Token ist der Endpoint komplett deaktiviert.
    return NextResponse.json(
      { error: "Import-Endpoint ist nicht konfiguriert (IMPORT_API_TOKEN fehlt)." },
      { status: 503 }
    );
  }

  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : null;

  if (!token || token !== expected) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  return null;
}

async function getOrCreateImportUser(): Promise<string> {
  const user = await prisma.user.upsert({
    where: { email: IMPORT_USER_EMAIL },
    update: {},
    create: { email: IMPORT_USER_EMAIL, name: IMPORT_USER_NAME, role: "user" },
    select: { id: true },
  });
  return user.id;
}

/**
 * Findet einen freien Slug für (name, city). Existiert bereits ein Store
 * mit identischem Namen + Adresse, wird dessen Slug zurückgegeben und
 * `isDuplicate: true` gesetzt -> der Aufrufer überspringt das Anlegen.
 * Bei Namensgleichheit aber abweichender Adresse (z.B. zwei Filialen)
 * wird stattdessen ein neuer, durchnummerierter Slug vergeben.
 */
async function resolveSlug(
  name: string,
  city: string,
  addressLine: string,
  postalCode: string
): Promise<{ slug: string; isDuplicate: boolean }> {
  const base = slugify(`${name}-${city}`) || "weltladen";
  let candidate = base;
  let suffix = 1;

  // Sicherheitslimit, falls wirklich sehr viele gleichnamige Läden existieren.
  for (let i = 0; i < 200; i++) {
    const existing = await prisma.store.findUnique({
      where: { slug: candidate },
      select: { addressLine: true, postalCode: true },
    });

    if (!existing) {
      return { slug: candidate, isDuplicate: false };
    }

    const sameAddress =
      existing.addressLine.trim().toLowerCase() === addressLine.trim().toLowerCase() &&
      existing.postalCode.trim() === postalCode.trim();

    if (sameAddress) {
      return { slug: candidate, isDuplicate: true };
    }

    suffix += 1;
    candidate = `${base}-${suffix}`;
  }

  throw new Error(`Konnte keinen freien Slug für "${name}" finden.`);
}

export async function POST(request: NextRequest) {
  const authError = requireImportToken(request);
  if (authError) return authError;

  const body = await request.json().catch(() => null);
  const parsedBody = importBodySchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(
      { error: "Ungültiger Request-Body.", issues: parsedBody.error.flatten() },
      { status: 400 }
    );
  }

  const { dryRun, items } = parsedBody.data;
  const importUserId = dryRun ? null : await getOrCreateImportUser();
  const results: ImportResult[] = [];

  for (let index = 0; index < items.length; index++) {
    const rawItem = items[index];
    const parsedItem = importStoreSchema.safeParse(rawItem);

    if (!parsedItem.success) {
      const name =
        typeof rawItem === "object" && rawItem !== null && "name" in rawItem
          ? String((rawItem as Record<string, unknown>).name)
          : `#${index}`;
      results.push({
        index,
        name,
        outcome: "invalid",
        reason: JSON.stringify(parsedItem.error.flatten().fieldErrors),
      });
      continue;
    }

    const item = parsedItem.data;

    try {
      const { slug, isDuplicate } = await resolveSlug(
        item.name,
        item.city,
        item.addressLine,
        item.postalCode
      );

      if (isDuplicate) {
        results.push({
          index,
          name: item.name,
          outcome: dryRun ? "would_skip" : "skipped",
          slug,
          reason: "Store mit gleichem Namen + Adresse existiert bereits.",
        });
        continue;
      }

      if (dryRun) {
        results.push({ index, name: item.name, outcome: "would_create", slug });
        continue;
      }

      const store = await prisma.store.create({
        data: {
          slug,
          name: item.name,
          description: item.description,
          addressLine: item.addressLine,
          city: item.city,
          postalCode: item.postalCode,
          country: item.country || "DE",
          latitude: item.latitude,
          longitude: item.longitude,
          phone: item.phone || null,
          website: item.website || null,
          email: item.email || null,
          fairBadges: JSON.stringify(item.fairBadges),
          categories: JSON.stringify(item.categories),
          status: item.status,
          createdById: importUserId!,
          hours: { create: item.hours },
        },
        select: { id: true, slug: true },
      });

      results.push({ index, name: item.name, outcome: "created", slug: store.slug, storeId: store.id });
    } catch (error) {
      results.push({
        index,
        name: item.name,
        outcome: "error",
        reason: error instanceof Error ? error.message : "Unbekannter Fehler",
      });
    }
  }

  const summary = results.reduce<Record<string, number>>((acc, r) => {
    acc[r.outcome] = (acc[r.outcome] ?? 0) + 1;
    return acc;
  }, {});

  return NextResponse.json({ dryRun, summary, results }, { status: 200 });
}