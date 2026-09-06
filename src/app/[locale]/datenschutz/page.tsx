// path: src/app/[locale]/datenschutz/page.tsx
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { LegalBindingNotice } from "@/components/legal/LegalBindingNotice";
import { DatenschutzDe, DatenschutzEn } from "@/components/legal/DatenschutzContent";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legalTitles");
  return { title: t("datenschutz") };
}

export default async function DatenschutzPage() {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("legalTitles")]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-earth">
      <h1 className="text-2xl font-bold">{t("datenschutz")}</h1>
      <LegalBindingNotice />
      {locale === "de" ? <DatenschutzDe /> : <DatenschutzEn />}
    </div>
  );
}