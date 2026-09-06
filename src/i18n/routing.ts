// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

// Deutsch bleibt Standardsprache (Zielmarkt Deutschland), Englisch zusätzlich.
// localePrefix "always" -> /de/... und /en/... sind beide explizit, "/"
// selbst existiert nicht mehr als Route (die Middleware leitet auf die
// erkannte/gespeicherte Sprache um). Das hält die URL-Struktur eindeutig
// und vermeidet doppelten Content unter zwei URLs für dieselbe Sprache.
export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
  // Erkennt die Sprache des Browsers (Accept-Language) nur, wenn noch keine
  // Präferenz gespeichert ist. Der next-intl-Cookie übersteuert das danach.
  localeDetection: true,
});

export type AppLocale = (typeof routing.locales)[number];
