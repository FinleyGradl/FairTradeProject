"use client";
// path: src/components/store/SuggestEditForm.tsx

import { useRouter } from "@/i18n/navigation";
import { useState, FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getDayName } from "@/lib/hours";
import type { HourChange } from "@/lib/suggestion-diff";

export interface SuggestEditInitialValues {
  name: string;
  description: string;
  addressLine: string;
  city: string;
  postalCode: string;
  phone: string;
  website: string;
  email: string;
  hours: HourChange[];
}

interface SuggestEditFormProps {
  storeSlug: string;
  initialValues: SuggestEditInitialValues;
}

/** Deliberately mirrors the current values back into the form (like Google
 * Business Profile's "suggest an edit") — the person only touches what's
 * actually wrong, and only the touched fields end up in the diff the
 * owner/admin/community reviews. */
export function SuggestEditForm({ storeSlug, initialValues }: SuggestEditFormProps) {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function update<K extends keyof SuggestEditInitialValues>(key: K, value: SuggestEditInitialValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function updateHour(day: number, patch: Partial<HourChange>) {
    setValues((v) => ({
      ...v,
      hours: v.hours.map((h) => (h.dayOfWeek === day ? { ...h, ...patch } : h)),
    }));
  }

  function diffPayload() {
    const payload: Record<string, unknown> = {};
    (Object.keys(initialValues) as (keyof SuggestEditInitialValues)[]).forEach((key) => {
      if (key === "hours") return;
      if (values[key] !== initialValues[key]) payload[key] = values[key];
    });
    const hoursChanged = values.hours.some((h, i) => {
      const orig = initialValues.hours[i];
      return (
        h.isClosed !== orig.isClosed ||
        (!h.isClosed && (h.openTime !== orig.openTime || h.closeTime !== orig.closeTime))
      );
    });
    if (hoursChanged) payload.hours = values.hours;
    if (note.trim()) payload.note = note.trim();
    return payload;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = diffPayload();
    if (Object.keys(payload).filter((k) => k !== "note").length === 0) {
      setLoading(false);
      setError("Bitte ändere mindestens ein Feld, bevor du den Vorschlag absendest.");
      return;
    }

    const res = await fetch(`/api/v1/stores/${storeSlug}/suggestions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Etwas ist schiefgelaufen.");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push(`/stores/${storeSlug}`), 1200);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-4 rounded-xl border border-sage/10 bg-surface p-5">
        <h2 className="font-semibold text-earth">Grunddaten</h2>
        <div>
          <label className="mb-1 block text-sm font-medium text-earth">Name</label>
          <Input value={values.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-earth">Beschreibung</label>
          <textarea
            value={values.description}
            onChange={(e) => update("description", e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth placeholder:text-earth/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-sage/10 bg-surface p-5">
        <h2 className="font-semibold text-earth">Adresse</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-earth">Straße &amp; Hausnummer</label>
            <Input value={values.addressLine} onChange={(e) => update("addressLine", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-earth">PLZ</label>
            <Input value={values.postalCode} onChange={(e) => update("postalCode", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-earth">Stadt</label>
            <Input value={values.city} onChange={(e) => update("city", e.target.value)} />
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-sage/10 bg-surface p-5">
        <h2 className="font-semibold text-earth">Kontakt</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-earth">Telefon</label>
            <Input value={values.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-earth">Website</label>
            <Input value={values.website} onChange={(e) => update("website", e.target.value)} type="url" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-earth">E-Mail</label>
            <Input value={values.email} onChange={(e) => update("email", e.target.value)} type="email" />
          </div>
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-sage/10 bg-surface p-5">
        <h2 className="font-semibold text-earth">Öffnungszeiten</h2>
        <div className="space-y-2">
          {values.hours.map((h) => (
            <div key={h.dayOfWeek} className="flex flex-wrap items-center gap-3">
              <span className="w-10 text-sm font-medium text-earth">{getDayName(h.dayOfWeek)}</span>
              <label className="flex items-center gap-1.5 text-xs text-earth/70">
                <input
                  type="checkbox"
                  checked={h.isClosed}
                  onChange={(e) => updateHour(h.dayOfWeek, { isClosed: e.target.checked })}
                  className="h-3.5 w-3.5"
                />
                geschlossen
              </label>
              {!h.isClosed && (
                <>
                  <input
                    type="time"
                    value={h.openTime}
                    onChange={(e) => updateHour(h.dayOfWeek, { openTime: e.target.value })}
                    className="rounded-lg border border-sage/20 px-2 py-1 text-sm"
                  />
                  <span className="text-earth/50">–</span>
                  <input
                    type="time"
                    value={h.closeTime}
                    onChange={(e) => updateHour(h.dayOfWeek, { closeTime: e.target.value })}
                    className="rounded-lg border border-sage/20 px-2 py-1 text-sm"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2 rounded-xl border border-sage/10 bg-surface p-5">
        <label className="block text-sm font-medium text-earth">Notiz (optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="Woher weißt du das? Z. B. selbst vor Ort gewesen, auf der Website des Ladens gesehen…"
          className="w-full rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth placeholder:text-earth/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        />
      </section>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      {success && (
        <p className="flex items-center gap-1.5 text-sm text-sage dark:text-sage-300">
          <CheckCircle2 className="h-4 w-4" />
          Danke! Dein Vorschlag wurde eingereicht.
        </p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Vorschlag absenden"}
        </Button>
      </div>

      <p className="text-xs text-earth/50">
        Nur geänderte Felder werden vorgeschlagen. Hat dieser Laden eine:n bestätigte:n
        Inhaber:in, entscheidet er/sie über deinen Vorschlag. Andernfalls prüft ihn entweder
        unser Moderations-Team oder die Community stimmt darüber ab.
      </p>
    </form>
  );
}
