// path: src/app/[locale]/me/notifications/page.tsx
import type { Metadata } from "next";
import { Link, redirect } from "@/i18n/navigation";
import { Settings } from "lucide-react";
import { auth } from "@/auth";
import { canModerate } from "@/lib/stores";
import { listNotifications, getUnreadCount } from "@/lib/notifications";
import { NotificationList } from "@/components/notifications/NotificationList";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = { title: "Benachrichtigungen" };

export default async function NotificationsPage() {
  const locale = await getLocale();
  const session = await auth();
  if (!session?.user) {
    return redirect({ href: "/login?callbackUrl=/me/notifications", locale });
  }

  const [{ notifications, nextCursor }, unreadCount] = await Promise.all([
    listNotifications(session.user.id),
    getUnreadCount(session.user.id),
  ]);

  // Where "which events land here" and "which of those get emailed" is
  // configured — regular users only get the review-email toggle on
  // /me/settings, admins/moderators additionally get the category opt-outs
  // on /admin/notification-settings.
  const settingsHref = canModerate(session.user) ? "/admin/notification-settings" : "/me/settings";

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-earth">Benachrichtigungen</h1>
          <p className="mt-1 text-sm text-earth/70">
            Alles, was mit deinen Läden, Bewertungen und Beiträgen auf FairFind passiert.
          </p>
        </div>
        <Link
          href={settingsHref}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth hover:bg-sage-50"
        >
          <Settings className="h-4 w-4" /> E-Mail-Einstellungen
        </Link>
      </div>

      <NotificationList
        initialNotifications={notifications.map((n) => ({ ...n, createdAt: n.createdAt.toISOString() }))}
        initialNextCursor={nextCursor}
        initialUnreadCount={unreadCount}
      />
    </div>
  );
}