"use client";

import { useTranslations } from "next-intl";
import { Compass, Heart, Search, User } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const t = useTranslations("mobileNav");
  const pathname = usePathname();

  const links = [
    { href: "/explore", icon: Compass, label: t("explore") },
    { href: "/search", icon: Search, label: t("search") },
    { href: "/me/saved", icon: Heart, label: t("saved") },
    { href: "/about", icon: User, label: t("about") },
  ] as const;

  return (
    <nav aria-label={t("ariaLabel")} className="fixed bottom-0 left-0 right-0 z-50 border-t border-sage/10 bg-surface md:hidden">
      <div className="flex justify-around py-2">
        {links.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname?.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 text-xs text-earth/70 hover:text-sage hover:dark:text-sage-300",
                isActive && "text-sage dark:text-sage-300"
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
