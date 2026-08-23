// Dev/promo codes for sponsorship checkout. Disabled by default — set
// ENABLE_PROMO_CODES=true (e.g. only in your local/staging .env) to allow
// redemption at all. In production this should normally stay unset/false,
// since a 100%-off code fully bypasses Mollie.
//
// Codes here are a simple hardcoded list since there's only a couple of
// internal ones; if you need many/rotating codes, swap this for a DB table
// following the same shape.

export interface PromoCode {
  code: string; // stored/compared uppercase
  discountPercent: number; // 1–100
  label: string;
}

const PROMO_CODES: PromoCode[] = [
  { code: "DIW3DJV4", discountPercent: 100, label: "Internes Dev/Test-Sponsoring (100% Rabatt)" },
];

export function promoCodesEnabled(): boolean {
  return process.env.ENABLE_PROMO_CODES === "true";
}

export function resolvePromoCode(input: string | null | undefined): PromoCode | null {
  if (!input || !promoCodesEnabled()) return null;
  const normalized = input.trim().toUpperCase();
  return PROMO_CODES.find((p) => p.code === normalized) ?? null;
}