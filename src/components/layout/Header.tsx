import { MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SearchBar } from "@/components/search/SearchBar";
import { buttonVariants } from "@/components/ui/button";
import { UserMenu } from "@/components/layout/UserMenu";
import { HeaderNavLink } from "@/components/layout/HeaderNavLink";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { auth } from "@/auth";
import { canModerate, getPendingModerationCount } from "@/lib/stores";
import { cn } from "@/lib/utils";

export async function Header() {
  const [session, t] = await Promise.all([auth(), getTranslations("nav")]);
  // Only bother querying counts for admins/moderators — everyone else
  // never sees the badge, no need to hit the DB on every page for them.
  const pendingModerationCount = canModerate(session?.user)
    ? await getPendingModerationCount()
    : 0;

  return (
    <header className="sticky top-0 z-50 border-b border-sage/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2">
          <MapPin className="h-6 w-6 text-sage dark:text-sage-300" aria-hidden="true" />
          <span className="text-xl font-bold text-earth">FairFind</span>
        </Link>

        <div className="hidden flex-1 md:block md:max-w-md lg:max-w-lg">
          <SearchBar />
        </div>

        <nav aria-label={t("ariaMain")} className="ml-auto flex items-center gap-2">
          <HeaderNavLink href="/explore" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            {t("explore")}
          </HeaderNavLink>
          <Link href="/search" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "md:hidden")}>
            {t("search")}
          </Link>
          <Link href="/add-store" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "hidden sm:inline-flex")}>
            {t("addStore")}
          </Link>
          <LanguageSwitcher />
          <ThemeToggle />
          <UserMenu pendingModerationCount={pendingModerationCount} />
        </nav>
      </div>
    </header>
  );
}
