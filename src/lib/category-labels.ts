// src/lib/category-labels.ts
//
// CATEGORIES in constants.ts holds the stable values persisted on Store
// records (English words used as storage keys — never rename these,
// existing stores reference them). This file only maps each stored value
// to a key in messages/*.json's "categories" namespace, for display.
import { CATEGORIES } from "./constants";

export const CATEGORY_TRANSLATION_KEYS: Record<(typeof CATEGORIES)[number], string> = {
  "Grocery": "grocery",
  "Coffee & Tea": "coffeeTea",
  "Clothing": "clothing",
  "Gifts": "gifts",
  "Zero Waste": "zeroWaste",
  "Chocolate": "chocolate",
  "Home & Living": "homeLiving",
};

/**
 * Resolves a stored category value to its translation key. Falls back to
 * the raw value itself if it's ever a legacy/unknown value, so nothing
 * crashes or renders blank.
 */
export function categoryTranslationKey(category: string): string {
  return CATEGORY_TRANSLATION_KEYS[category] ?? category;
}
