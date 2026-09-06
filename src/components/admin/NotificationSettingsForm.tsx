// path: src/components/admin/NotificationSettingsForm.tsx
"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  NOTIFICATION_CATEGORY_LABELS,
  type NotificationCategory,
} from "@/lib/notification-categories";

// Grouped so mods (who never see sponsorship events) aren't shown a wall
// of irrelevant toggles — the sponsorship group is admin-only in practice
// since only admins manage sponsoring, but nothing technically blocks a
// moderator from opting in too.
const GROUPS: { title: string; categories: NotificationCategory[]; adminOnly?: boolean }[] = [
  {
    title: "Moderation",
    categories: [
      "notifyNewStoreReport",
      "notifyNewReviewReport",
      "notifyNewPhotoReport",
      "notifyNewClaim",
      "notifyNewSuggestion",
    ],
  },
  {
    title: "Sponsoring",
    categories: ["notifySponsorshipStarted", "notifySponsorshipCanceled", "notifySponsorshipPaymentFailed"],
    adminOnly: true,
  },
];

export function NotificationSettingsForm({
  initial,
  isAdmin,
}: {
  initial: Record<NotificationCategory, boolean>;
  isAdmin: boolean;
}) {
  const [values, setValues] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function toggle(category: NotificationCategory) {
    const next = { ...values, [category]: !values[category] };
    setValues(next);
    setSaved(false);
    setError(null);
    setSaving(true);
    try {
      const res = await fetch("/api/me/notification-preferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [category]: next[category] }),
      });
      if (!res.ok) throw new Error("Speichern fehlgeschlagen.");
      setSaved(true);
    } catch (e) {
      setValues(values); // revert
      setError(e instanceof Error ? e.message : "Unbekannter Fehler.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {error && <p className="rounded-lg bg-red-50 dark:bg-red-950/40 px-3 py-2 text-sm text-red-700 dark:text-red-400">{error}</p>}

      {GROUPS.filter((g) => !g.adminOnly || isAdmin).map((group) => (
        <Card key={group.title}>
          <CardContent className="p-4">
            <h2 className="text-sm font-semibold text-earth">{group.title}</h2>
            <div className="mt-3 divide-y divide-sage/10">
              {group.categories.map((category) => (
                <label
                  key={category}
                  className="flex cursor-pointer items-center justify-between gap-4 py-3 text-sm"
                >
                  <span className="text-earth">{NOTIFICATION_CATEGORY_LABELS[category]}</span>
                  <input
                    type="checkbox"
                    checked={values[category]}
                    onChange={() => toggle(category)}
                    className="h-5 w-5 accent-sage-600"
                  />
                </label>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex items-center gap-2 text-sm text-earth/60">
        {saving && (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Speichere...
          </>
        )}
        {!saving && saved && (
          <>
            <Check className="h-4 w-4 text-sage-600 dark:text-sage-400" /> Gespeichert
          </>
        )}
      </div>
    </div>
  );
}
