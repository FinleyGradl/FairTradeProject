import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { LegalBindingNotice } from "@/components/legal/LegalBindingNotice";
import { BarrierefreiheitDe, BarrierefreiheitEn } from "@/components/legal/BarrierefreiheitContent";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legalTitles");
  return { title: t("barrierefreiheit") };
}

export default async function BarrierefreiheitPage() {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("legalTitles")]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-earth">
      <h1 className="text-2xl font-bold">{t("barrierefreiheit")}</h1>
      <LegalBindingNotice />
      {locale === "de" ? <BarrierefreiheitDe /> : <BarrierefreiheitEn />}
    </div>
  );
}