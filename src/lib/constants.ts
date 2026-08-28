// src/lib/constants.ts

// --- Store photo gallery -------------------------------------------------
// Number of distinct users who need to report a gallery photo before it
// shows up in the admin moderation queue (see listReportedPhotos() in
// lib/stores.ts). Reaching this does not remove the photo automatically —
// it just gives admins/moderators the option to.
export const PHOTO_REPORT_THRESHOLD = 5;

// --- Reviews --------------------------------------------------------------
// Number of distinct users who need to report a review before it shows up
// in the admin moderation queue (see listReportedReviews() in lib/stores.ts).
// Reaching this does not hide the review automatically — it just gives
// admins/moderators the option to.
export const REVIEW_REPORT_THRESHOLD = 5;

export const FAIR_BADGE_LABELS: Record<string, string> = {
  fairtrade: "Fairtrade",
  wfto: "WFTO",
  bcorp: "B Corp",
  organic: "Bio / Organic",
};

export const CATEGORIES = [
  "Grocery",
  "Coffee & Tea",
  "Clothing",
  "Gifts",
  "Zero Waste",
  "Chocolate",
  "Home & Living",
];

// --- Sponsoring ---------------------------------------------------------
// Client-safe (no Prisma/Mollie imports) so this can be used in both server
// and client components. `boostWeight` feeds directly into the ranking
// algorithm in lib/sponsorship.ts. Every paid tier includes Insights —
// the "Gesponsert" badge and the ranking boost only kick in from Plus up
// (see includesSponsoredBadge / boostWeight = 0 on Basis).
export type SponsorshipTierId = "basic" | "plus" | "top";

export interface SponsorshipTierDef {
  id: SponsorshipTierId;
  label: string;
  priceEuros: number; // per month, gross
  boostWeight: number; // 0 = no ranking boost / no sponsored placement
  includesInsights: boolean;
  includesSponsoredBadge: boolean;
  description: string;
  features: string[];
}

export const SPONSORSHIP_TIERS: Record<SponsorshipTierId, SponsorshipTierDef> = {
  basic: {
    id: "basic",
    label: "Basis",
    priceEuros: 4.9,
    boostWeight: 0,
    includesInsights: true,
    includesSponsoredBadge: false,
    description: "Analysen & Einblicke zu deinem Laden — ganz ohne Sponsoring.",
    features: [
      "Zugriff auf die Insights-Übersicht",
      "Aufrufe, Herkunft & Suchanfragen im Blick",
      "Kein Sponsoring: kein Badge, keine Bevorzugung in Ergebnislisten",
    ],
  },
  plus: {
    id: "plus",
    label: "Plus",
    priceEuros: 24.9,
    boostWeight: 2,
    includesInsights: true,
    includesSponsoredBadge: true,
    description: "Insights plus spürbar bessere Platzierung für aktive Läden.",
    features: [
      "Alles aus Basis",
      "\"Gesponsert\"-Badge auf deinem Eintrag",
      "Deutlich höhere Platzierung in Ergebnislisten",
      "Bevorzugte Anzeige auf der Startseite",
    ],
  },
  top: {
    id: "top",
    label: "Top",
    priceEuros: 49.9,
    boostWeight: 3,
    includesInsights: true,
    includesSponsoredBadge: true,
    description: "Maximale Sichtbarkeit für dein Geschäft.",
    features: [
      "Alles aus Plus",
      "Höchste Priorität in Ergebnislisten",
      "Detaillierte Herkunfts- & Suchanfragen-Insights",
    ],
  },
};

export const SPONSORSHIP_TIER_ORDER: SponsorshipTierId[] = ["basic", "plus", "top"];