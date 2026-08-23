export const FAIR_BADGE_LABELS: Record<string, string> = {
  fairtrade: "Fairtrade",
  wfto: "WFTO",
  bcorp: "B Corp",
  organic: "Organic",
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
// algorithm in lib/sponsorship.ts.
export type SponsorshipTierId = "basic" | "plus" | "top";

export interface SponsorshipTierDef {
  id: SponsorshipTierId;
  label: string;
  priceEuros: number; // per month, gross
  boostWeight: number;
  description: string;
  features: string[];
}

export const SPONSORSHIP_TIERS: Record<SponsorshipTierId, SponsorshipTierDef> = {
  basic: {
    id: "basic",
    label: "Basis",
    priceEuros: 9.9,
    boostWeight: 1,
    description: "Etwas mehr Sichtbarkeit in Suche & Kategorie.",
    features: ["\"Gesponsert\"-Badge auf deinem Eintrag", "Leichte Bevorzugung in Ergebnislisten", "Zugriff auf die Insights-Übersicht"],
  },
  plus: {
    id: "plus",
    label: "Plus",
    priceEuros: 24.9,
    boostWeight: 2,
    description: "Spürbar bessere Platzierung für aktive Läden.",
    features: ["Alles aus Basis", "Deutlich höhere Platzierung in Ergebnislisten", "Bevorzugte Anzeige auf der Startseite"],
  },
  top: {
    id: "top",
    label: "Top",
    priceEuros: 49.9,
    boostWeight: 3,
    description: "Maximale Sichtbarkeit für dein Geschäft.",
    features: ["Alles aus Plus", "Höchste Priorität in Ergebnislisten", "Detaillierte Herkunfts- & Suchanfragen-Insights"],
  },
};

export const SPONSORSHIP_TIER_ORDER: SponsorshipTierId[] = ["basic", "plus", "top"];