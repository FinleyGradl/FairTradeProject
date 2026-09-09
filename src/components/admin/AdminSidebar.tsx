// path: src/components/admin/AdminSidebar.tsx
"use client";

import { usePathname, Link } from "@/i18n/navigation";
import {
  ShieldCheck,
  Mail,
  Megaphone,
  Ticket,
  ScrollText,
  Users,
  Receipt,
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

  return (
    <nav aria-label="Admin-Bereich" className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
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
  );
}