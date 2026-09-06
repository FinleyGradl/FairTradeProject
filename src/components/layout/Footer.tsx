import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-sage/10 bg-cream py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <p className="font-bold text-earth">FairFind</p>
            <p className="mt-1 max-w-sm text-sm text-earth/70">{t("tagline")}</p>
          </div>
          <nav aria-label={t("ariaLabel")} className="flex gap-8 text-sm">
            <div>
              <p className="font-medium text-earth">{t("discoverHeading")}</p>
              <ul className="mt-2 space-y-1 text-earth/70">
                <li><Link href="/explore" className="hover:text-sage hover:dark:text-sage-300">{t("exploreStores")}</Link></li>
                <li><Link href="/search" className="hover:text-sage hover:dark:text-sage-300">{t("search")}</Link></li>
                <li><Link href="/add-store" className="hover:text-sage hover:dark:text-sage-300">{t("addStore")}</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-earth">{t("categoriesHeading")}</p>
              <ul className="mt-2 space-y-1 text-earth/70">
                <li><Link href="/kategorie/mode" className="hover:text-sage hover:dark:text-sage-300">{t("categoryFashion")}</Link></li>
                <li><Link href="/kategorie/lebensmittel" className="hover:text-sage hover:dark:text-sage-300">{t("categoryGrocery")}</Link></li>
                <li><Link href="/kategorie/kaffee-tee" className="hover:text-sage hover:dark:text-sage-300">{t("categoryCoffee")}</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-earth">{t("aboutHeading")}</p>
              <ul className="mt-2 space-y-1 text-earth/70">
                <li><Link href="/about" className="hover:text-sage hover:dark:text-sage-300">{t("ourMission")}</Link></li>
                <li><Link href="/about#fair-trade" className="hover:text-sage hover:dark:text-sage-300">{t("whatIsFairTrade")}</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-earth">{t("legalHeading")}</p>
              <ul className="mt-2 space-y-1 text-earth/70">
                <li><Link href="/impressum" className="hover:text-sage hover:dark:text-sage-300">{t("impressum")}</Link></li>
                <li><Link href="/datenschutz" className="hover:text-sage hover:dark:text-sage-300">{t("privacy")}</Link></li>
                <li><Link href="/nutzungsbedingungen" className="hover:text-sage hover:dark:text-sage-300">{t("terms")}</Link></li>
                <li><Link href="/barrierefreiheit" className="hover:text-sage hover:dark:text-sage-300">{t("accessibility")}</Link></li>
              </ul>
            </div>
          </nav>
        </div>
        <p className="mt-8 text-center text-xs text-earth/50">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
