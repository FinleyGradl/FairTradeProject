// path: src/lib/product-suggestion-diff.ts
//
// Client-safe (no Prisma import) formatting helpers for rendering a
// ProductSuggestion's changes — shared by the owner's review queue, the
// admin moderation queue, and the public community-vote widget. Mirrors
// lib/suggestion-diff.ts for stores.

export const PRODUCT_SUGGESTION_FIELD_LABELS: Record<string, string> = {
  name: "Name",
  description: "Beschreibung",
  price: "Preis",
  category: "Kategorie",
  imageUrl: "Bild",
  inStock: "Verfügbarkeit",
};

export type ProductSuggestionChanges = Partial<{
  name: string;
  description: string;
  price: number | null;
  category: string;
  imageUrl: string;
  inStock: boolean;
}>;

export interface CurrentProductSnapshot {
  name: string;
  description: string | null;
  price: number | null;
  category: string | null;
  imageUrl: string | null;
  inStock: boolean;
}

function formatValue(field: string, value: unknown): string {
  if (value === undefined || value === null || value === "") return "\u2014";
  if (field === "price") return `${Number(value).toFixed(2)} \u20ac`;
  if (field === "inStock") return value ? "Auf Lager" : "Nicht auf Lager";
  return String(value);
}

/** Every changed field, paired with the product's current value (or, for a
 * "create" suggestion, an empty current snapshot) for a before/after
 * display. */
export function getProductFieldDiffs(
  changes: ProductSuggestionChanges,
  current: CurrentProductSnapshot | null
) {
  return Object.entries(PRODUCT_SUGGESTION_FIELD_LABELS)
    .filter(([key]) => changes[key as keyof ProductSuggestionChanges] !== undefined)
    .map(([key, label]) => ({
      field: key,
      label,
      oldValue: current ? formatValue(key, current[key as keyof CurrentProductSnapshot]) : "\u2014",
      newValue: formatValue(key, changes[key as keyof ProductSuggestionChanges]),
    }));
}
