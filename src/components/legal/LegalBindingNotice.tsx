import { getTranslations } from "next-intl/server";

/**
 * Shown on legal pages (Impressum, Datenschutz, Nutzungsbedingungen,
 * Barrierefreiheitserklärung). The body text of these pages stays German —
 * that's the legally binding version — this banner just tells English-
 * speaking visitors that. Translate the actual legal body text separately
 * (and have it reviewed) if/when you want full English versions.
 */
export async function LegalBindingNotice() {
  const t = await getTranslations("legal");
  return (
    <p className="mt-4 rounded-lg border border-sage/20 bg-sage/5 px-4 py-3 text-sm text-earth/70">
      {t("bindingNotice")}
    </p>
  );
}
