"use client";

import { useLocale, useTranslations } from "next-intl";
import { Languages } from "lucide-react";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onChange(nextLocale: string) {
    // Swaps only the locale segment, keeps the current route (slugs etc.
    // included, since usePathname() already returns the resolved path)
    // exactly where the user is.
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="relative">
      <label className="sr-only" htmlFor="language-switcher">
        {t("label")}
      </label>
      <Languages
        className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/60"
        aria-hidden="true"
      />
      <select
        id="language-switcher"
        value={locale}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-md border border-sage/20 bg-transparent py-1.5 pl-7 pr-2 text-sm text-earth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {t(loc)}
          </option>
        ))}
      </select>
    </div>
  );
}
