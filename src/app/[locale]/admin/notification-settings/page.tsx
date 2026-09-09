// path: src/app/admin/notification-settings/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link, redirect } from "@/i18n/navigation";
import { Bell } from "lucide-react";
import { auth } from "@/auth";
import { canModerate } from "@/lib/stores";
import { getOrCreatePreferences } from "@/lib/notification-preferences";
import { NOTIFICATION_CATEGORIES } from "@/lib/notification-categories";
import { NotificationSettingsForm } from "@/components/admin/NotificationSettingsForm";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = { title: "Benachrichtigungs-Einstellungen" };

export default async function NotificationSettingsPage() {
  const locale = await getLocale();
  const session = await auth();
  if (!session?.user) {
    return redirect({ href: "/login?callbackUrl=/admin/notification-settings", locale });
  }
  if (!canModerate(session.user)) {
    notFound();
  }

  const prefs = await getOrCreatePreferences(session.user.id);

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-earth">Benachrichtigungs-Einstellungen</h1>
          <p className="mt-1 text-sm text-earth/70">
            Wähle, über welche Ereignisse du per E-Mail informiert werden möchtest.
          </p>
        </div>
        <Link
          href="/me/notifications"
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth hover:bg-sage-50"
        >
          <Bell className="h-4 w-4" /> Übersicht
        </Link>
      </div>

      <div className="mt-8">
        <NotificationSettingsForm
          initial={Object.fromEntries(
            NOTIFICATION_CATEGORIES.map((c) => [c, prefs[c]])
          ) as Record<(typeof NOTIFICATION_CATEGORIES)[number], boolean>}
          isAdmin={session.user.role === "admin"}
        />
      </div>
    </>
  );
}