// path: src/app/[locale]/nutzungsbedingungen/page.tsx
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { LegalBindingNotice } from "@/components/legal/LegalBindingNotice";
import { NutzungsbedingungenDe, NutzungsbedingungenEn } from "@/components/legal/NutzungsbedingungenContent";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legalTitles");
  return { title: t("nutzungsbedingungen") };
}

export default async function NutzungsbedingungenPage() {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("legalTitles")]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-earth">
      <h1 className="text-2xl font-bold">{t("nutzungsbedingungen")}</h1>
      <LegalBindingNotice />
      {locale === "de" ? <NutzungsbedingungenDe /> : <NutzungsbedingungenEn />}
    </div>
  );
}