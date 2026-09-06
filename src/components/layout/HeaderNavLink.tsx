"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * Same as next/link, but sets aria-current="page" when the current route
 * matches (WCAG 2.4.8 Location) — kept as its own tiny client component
 * so Header itself can stay a server component.
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
