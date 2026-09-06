import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { LegalBindingNotice } from "@/components/legal/LegalBindingNotice";
import { ImpressumDe, ImpressumEn } from "@/components/legal/ImpressumContent";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legalTitles");
  return { title: t("impressum") };
}

export default async function ImpressumPage() {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("legalTitles")]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-earth">
      <h1 className="text-2xl font-bold">{t("impressum")}</h1>
      <LegalBindingNotice />
      {locale === "de" ? <ImpressumDe /> : <ImpressumEn />}
    </div>
  );
}