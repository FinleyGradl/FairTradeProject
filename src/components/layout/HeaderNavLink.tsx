"use client";

import type { ComponentProps } from "react";
import { Link, usePathname } from "@/i18n/navigation";

/**
 * Same as next/link (via next-intl's locale-aware Link), but sets
 * aria-current="page" when the current route matches (WCAG 2.4.8
 * Location) — kept as its own tiny client component so Header itself can
 * stay a server component.
 */
export function HeaderNavLink({ href, children, ...props }: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const path = typeof href === "string" ? href : href.pathname ?? "";
  const isActive = pathname === path || pathname?.startsWith(`${path}/`);

  return (
    <Link href={href} aria-current={isActive ? "page" : undefined} {...props}>
      {children}
    </Link>
  );
}
