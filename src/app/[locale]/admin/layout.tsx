// path: src/app/[locale]/admin/layout.tsx
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/auth";
import { canModerate, getPendingModerationCount } from "@/lib/stores";
import { canManageUsers } from "@/lib/users";
import { AdminSidebar, type AdminTab } from "@/components/admin/AdminSidebar";
import { getLocale } from "next-intl/server";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const session = await auth();
  if (!session?.user) {
    return redirect({ href: "/login?callbackUrl=/admin", locale });
  }

  const isModerator = canModerate(session.user);
  const isAdmin = session.user.role === "admin";
  const isSuperuser = canManageUsers(session.user);

  // Matches (isModerator || isAdmin || isSuperuser) checked here with the
  // per-page guards each admin page already has — this is the first line of
  // defense (keeps randoms out of the whole section), the page-level checks
  // stay as the real authority per page.
  if (!isModerator && !isAdmin && !isSuperuser) {
    notFound();
  }

  const pendingModerationCount = isModerator ? await getPendingModerationCount() : 0;

  const rawTabs: (AdminTab | false)[] = [
    isModerator && {
      href: "/admin/moderation",
      label: "Moderation",
      icon: "ShieldCheck",
      badge: pendingModerationCount,
    },
    isModerator && {
      href: "/admin/notification-settings",
      label: "E-Mail-Einstellungen",
      icon: "Mail",
    },
    isAdmin && { href: "/admin/sponsoring", label: "Sponsoring-Übersicht", icon: "Megaphone" },
    isAdmin && { href: "/admin/promo-codes", label: "Promo-Codes", icon: "Ticket" },
    (isAdmin || isSuperuser) && {
      href: "/admin/audit-log",
      label: "Audit-Log",
      icon: "ScrollText",
    },
    isSuperuser && { href: "/admin/users", label: "Nutzerverwaltung", icon: "Users" },
    isSuperuser && {
      href: "/admin/settings/billing",
      label: "Rechnungs-Einstellungen",
      icon: "Receipt",
    },
  ];
  const tabs = rawTabs.filter((t): t is AdminTab => t !== false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:flex lg:items-start lg:gap-10">
      <aside className="mb-8 lg:sticky lg:top-20 lg:mb-0 lg:w-56 lg:shrink-0">
        <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-earth/50 lg:block hidden">
          Admin
        </h2>
        <AdminSidebar tabs={tabs} />
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}