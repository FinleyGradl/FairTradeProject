// path: src/lib/promo-codes.ts
import { prisma } from "@/lib/db";

// Two layers of promo codes:
//  1. Admin-managed codes (this file, DB-backed) — created in /admin/promo-codes,
//     any discount %, optional expiry/redemption cap. These are "real"
//     business discount codes and work regardless of ENABLE_PROMO_CODES.
//  2. A single hardcoded dev/test code (DIW3DJV4, 100% off) for local
//     testing without needing to seed the DB — gated behind
//     ENABLE_PROMO_CODES so it can't accidentally work in production.

const DEV_CODE = { code: "DIW3DJV4", discountPercent: 100, label: "Internes Dev/Test-Sponsoring (100% Rabatt)" };

export interface ResolvedPromoCode {
  code: string;
  discountPercent: number;
  label: string | null;
  source: "admin" | "dev";
}

function devCodesEnabled(): boolean {
  return process.env.ENABLE_PROMO_CODES === "true";
}

/** Validates & resolves a code a user typed in at checkout. Does NOT redeem it — call recordPromoRedemption separately once the discount is actually granted. */
export async function resolvePromoCode(input: string | null | undefined): Promise<ResolvedPromoCode | null> {
  if (!input) return null;
  const normalized = input.trim().toUpperCase();
  if (!normalized) return null;

  const dbCode = await prisma.promoCode.findUnique({ where: { code: normalized } });
  if (dbCode) {
    if (!dbCode.active) return null;
    if (dbCode.expiresAt && dbCode.expiresAt.getTime() < Date.now()) return null;
    if (dbCode.maxRedemptions != null && dbCode.redemptionCount >= dbCode.maxRedemptions) return null;
    return {
      code: dbCode.code,
      discountPercent: dbCode.discountPercent,
      label: dbCode.label,
      source: "admin",
    };
  }

  if (devCodesEnabled() && normalized === DEV_CODE.code) {
    return { ...DEV_CODE, source: "dev" };
  }

  return null;
}

/** Call once a promo code's discount has actually been granted (subscription created / payment confirmed). */
export async function recordPromoRedemption(code: string): Promise<void> {
  try {
    await prisma.promoCode.update({
      where: { code: code.trim().toUpperCase() },
      data: { redemptionCount: { increment: 1 } },
    });
  } catch {
    // Dev code or already deleted — nothing to increment, that's fine.
  }
}

// --- Admin management ---------------------------------------------------

function randomCode(length = 8): string {
  // Excludes visually ambiguous characters (0/O, 1/I/L).
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

export async function listPromoCodes() {
  return prisma.promoCode.findMany({
    orderBy: { createdAt: "desc" },
    include: { createdBy: { select: { name: true, email: true } } },
  });
}

export async function createPromoCode(params: {
  code?: string | null;
  discountPercent: number;
  label?: string | null;
  maxRedemptions?: number | null;
  expiresAt?: Date | null;
  createdByUserId: string;
}) {
  const discountPercent = Math.min(100, Math.max(1, Math.round(params.discountPercent)));

  let code = params.code?.trim().toUpperCase() || randomCode();
  // Extremely unlikely, but guard against a collision on an explicitly-typed code.
  for (let attempt = 0; attempt < 5; attempt++) {
    const existing = await prisma.promoCode.findUnique({ where: { code } });
    if (!existing) break;
    if (params.code) throw new Error("Dieser Code existiert bereits.");
    code = randomCode();
  }

  return prisma.promoCode.create({
    data: {
      code,
      discountPercent,
      label: params.label?.trim() || null,
      maxRedemptions: params.maxRedemptions ?? null,
      expiresAt: params.expiresAt ?? null,
      createdByUserId: params.createdByUserId,
    },
  });
}

export async function setPromoCodeActive(id: string, active: boolean) {
  return prisma.promoCode.update({ where: { id }, data: { active } });
}

export async function deletePromoCode(id: string) {
  return prisma.promoCode.delete({ where: { id } });
}