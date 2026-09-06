import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("aboutPage");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("aboutPage");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-earth">{t("title")}</h1>
      <p className="mt-4 text-lg text-earth/80 leading-relaxed">{t("intro")}</p>

      <section id="fair-trade" className="mt-12">
        <h2 className="text-2xl font-semibold text-earth">{t("fairTradeHeading")}</h2>
        <p className="mt-3 text-earth/80 leading-relaxed">{t("fairTradeBody")}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">Fairtrade International</Badge>
          <Badge variant="secondary">WFTO</Badge>
          <Badge variant="secondary">B Corp</Badge>
          <Badge variant="secondary">Bio / Organic</Badge>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-earth">{t("howItWorksHeading")}</h2>
        <ol className="mt-4 space-y-4 text-earth/80">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage text-sm font-bold text-white">1</span>
            <span><strong className="text-earth">{t("step1Title")}</strong> — {t("step1Body")}</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage text-sm font-bold text-white">2</span>
            <span><strong className="text-earth">{t("step2Title")}</strong> — {t("step2Body")}</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage text-sm font-bold text-white">3</span>
            <span><strong className="text-earth">{t("step3Title")}</strong> — {t("step3Body")}</span>
          </li>
        </ol>
      </section>

      <div className="mt-12 rounded-xl bg-sage-50 p-6 text-center">
        <p className="font-medium text-earth">{t("ctaHeading")}</p>
        <Link href="/explore" className={cn(buttonVariants(), "mt-4 inline-block")}>
          {t("ctaButton")}
        </Link>
      </div>
    </div>
  );
}