// path: src/components/profile/NewReviewEmailToggle.tsx
"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

export function NewReviewEmailToggle({ initialEnabled }: { initialEnabled: boolean }) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function toggle() {
    const next = !enabled;
    setEnabled(next);
    setSaved(false);
    setError(null);
    setSaving(true);
    try {
      const res = await fetch("/api/me/review-notification-preference", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: next }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Speichern fehlgeschlagen (${res.status}).`);
      }
      setSaved(true);
    } catch (e) {
      setEnabled(enabled); // revert
      setError(e instanceof Error ? e.message : "Unbekannter Fehler.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {error && (
        <p className="mb-3 rounded-lg bg-red-50 dark:bg-red-950/40 px-3 py-2 text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
      <label className="flex cursor-pointer items-center justify-between gap-4 text-sm">
        <span>
          <span className="text-earth">Neue Bewertung für meinen Laden</span>
          <span className="mt-0.5 block text-xs text-earth/60">
            E-Mail, sobald jemand einen deiner Läden zum ersten Mal bewertet.
          </span>
        </span>
        <input
          type="checkbox"
          checked={enabled}
          onChange={toggle}
          className="h-5 w-5 shrink-0 accent-sage-600"
        />
      </label>
      {(saving || saved) && (
        <div className="mt-2 flex items-center gap-2 text-xs text-earth/60">
          {saving ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Speichere...
            </>
          ) : (
            <>
              <Check className="h-3.5 w-3.5 text-sage-600 dark:text-sage-400" /> Gespeichert
            </>
          )}
        </div>
      )}
    </div>
  );
}