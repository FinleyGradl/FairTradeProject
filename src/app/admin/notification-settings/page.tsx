// path: src/app/admin/notification-settings/page.tsx
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { canModerate } from "@/lib/stores";
import { getOrCreatePreferences } from "@/lib/notification-preferences";
import { NOTIFICATION_CATEGORIES } from "@/lib/notification-categories";
import { NotificationSettingsForm } from "@/components/admin/NotificationSettingsForm";

export const metadata: Metadata = { title: "Benachrichtigungs-Einstellungen" };

export default async function NotificationSettingsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/notification-settings");
  }
  if (!canModerate(session.user)) {
    notFound();
  }

  const prefs = await getOrCreatePreferences(session.user.id);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-earth">Benachrichtigungs-Einstellungen</h1>
      <p className="mt-1 text-sm text-earth/70">
        Wähle, über welche Ereignisse du per E-Mail informiert werden möchtest.
      </p>

      <div className="mt-8">
        <NotificationSettingsForm
          initial={Object.fromEntries(
            NOTIFICATION_CATEGORIES.map((c) => [c, prefs[c]])
          ) as Record<(typeof NOTIFICATION_CATEGORIES)[number], boolean>}
          isAdmin={session.user.role === "admin"}
        />
      </div>
    </div>
  );
}
