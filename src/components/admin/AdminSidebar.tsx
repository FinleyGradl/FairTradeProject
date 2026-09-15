// path: src/components/admin/AdminSidebar.tsx
"use client";

import { usePathname, useRouter, Link } from "@/i18n/navigation";
import {
  ShieldCheck,
  Mail,
  Megaphone,
  Ticket,
  ScrollText,
  Users,
  Receipt,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  ShieldCheck,
  Mail,
  Megaphone,
  Ticket,
  ScrollText,
  Users,
  Receipt,
} as const;

export interface AdminTab {
  href: string;
  label: string;
  icon: keyof typeof ICONS;
  badge?: number;
}

export function AdminSidebar({ tabs }: { tabs: AdminTab[] }) {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab =
    tabs.find((tab) => pathname === tab.href) ??
    tabs.find((tab) => pathname.startsWith(`${tab.href}/`)) ??
    tabs[0];
  const ActiveIcon = ICONS[activeTab.icon];

  return (
    <>
      {/* Mobile / tablet: a dropdown instead of a horizontally scrolling
          tab row — with 7 sections a scroll-tabs bar hides most of them
          off-screen and needs discovery-by-swiping, a select is one tap
          and shows every option at once. */}
      <div className="relative lg:hidden">
        <label className="sr-only" htmlFor="admin-section">
          Admin-Bereich
        </label>
        <ActiveIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/60" aria-hidden="true" />
        <select
          id="admin-section"
          value={activeTab.href}
          onChange={(e) => router.push(e.target.value)}
          className="w-full appearance-none rounded-lg border border-sage/20 bg-surface py-2.5 pl-9 pr-9 text-sm font-medium text-earth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          {tabs.map((tab) => (
            <option key={tab.href} value={tab.href}>
              {tab.label}
              {typeof tab.badge === "number" && tab.badge > 0 ? ` (${tab.badge})` : ""}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/60" aria-hidden="true" />
      </div>

      {/* Desktop: full vertical sidebar, unchanged. */}
      <nav aria-label="Admin-Bereich" className="hidden lg:flex lg:flex-col lg:gap-1">
        {tabs.map((tab) => {
          const Icon = ICONS[tab.icon];
          const active = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap",
                active ? "bg-sage text-white" : "text-earth hover:bg-sage-50"
              )}
            >
              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4" aria-hidden="true" /> {tab.label}
              </span>
              {typeof tab.badge === "number" && tab.badge > 0 && (
                <span
                  className={cn(
                    "flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-semibold",
                    active ? "bg-white/25 text-white" : "bg-red-500 text-white dark:bg-red-600"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}