"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LocationPicker } from "@/components/store/LocationPicker";
import { CoverImageUploader } from "@/components/store/CoverImageUploader";
import { CATEGORIES, FAIR_BADGE_LABELS } from "@/lib/constants";
import { getDayName } from "@/lib/hours";
import { DEFAULT_CENTER } from "@/lib/geo";
import { cn } from "@/lib/utils";

export interface StoreHourFormRow {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

export interface StoreFormValues {
  name: string;
  description: string;
  addressLine: string;
  city: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  phone: string;
  website: string;
  email: string;
  coverImage: string;
  fairBadges: string[];
  categories: string[];
  hours: StoreHourFormRow[];
}

const DEFAULT_HOURS: StoreHourFormRow[] = Array.from({ length: 7 }, (_, i) => ({
  dayOfWeek: i,
  openTime: "09:00",
  closeTime: "18:00",
  isClosed: i >= 5, // default: closed on weekends, adjustable
}));

export const EMPTY_STORE_FORM: StoreFormValues = {
  name: "",
  description: "",
  addressLine: "",
  city: "",
  postalCode: "",
  country: "DE",
  latitude: DEFAULT_CENTER.lat,
  longitude: DEFAULT_CENTER.lng,
  phone: "",
  website: "",
  email: "",
  coverImage: "",
  fairBadges: [],
  categories: [],
  hours: DEFAULT_HOURS,
};

interface StoreFormProps {
  mode: "create" | "edit";
  initialValues: StoreFormValues;
  storeSlug?: string;
}

export function StoreForm({ mode, initialValues, storeSlug }: StoreFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<StoreFormValues>(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function update<K extends keyof StoreFormValues>(key: K, value: StoreFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function toggleFromList(key: "fairBadges" | "categories", item: string) {
    setValues((v) => {
      const list = v[key];
      const next = list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
      return { ...v, [key]: next };
    });
  }

  function updateHour(day: number, patch: Partial<StoreHourFormRow>) {
    setValues((v) => ({
      ...v,
      hours: v.hours.map((h) => (h.dayOfWeek === day ? { ...h, ...patch } : h)),
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setLoading(true);

    const payload = {
      ...values,
      website: values.website.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      coverImage: values.coverImage.trim(),
    };

    const url = mode === "create" ? "/api/v1/stores" : `/api/v1/stores/${storeSlug}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Etwas ist schiefgelaufen.");
      setFieldErrors(data.issues ?? {});
      return;
    }

    setSuccess(true);
    const slug = data.store?.slug as string | undefined;
    if (slug) {
      setTimeout(() => router.push(`/stores/${slug}`), 900);
    }
  }

  const fieldError = (key: string) => fieldErrors[key]?.[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-4 rounded-xl border border-sage/10 bg-white p-5">
        <h2 className="font-semibold text-earth">Grunddaten</h2>

        <div>
          <label className="mb-1 block text-sm font-medium text-earth">Name *</label>
          <Input
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Weltladen Musterstadt"
            required
          />
          {fieldError("name") && <p className="mt-1 text-xs text-red-600">{fieldError("name")}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-earth">Beschreibung *</label>
          <textarea
            value={values.description}
            onChange={(e) => update("description", e.target.value)}
            rows={4}
            required
            className="w-full rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth placeholder:text-earth/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            placeholder="Was macht diesen Laden besonders? Sortiment, Herkunft der Produkte, Besonderheiten…"
          />
          {fieldError("description") && (
            <p className="mt-1 text-xs text-red-600">{fieldError("description")}</p>
          )}
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-earth">Kategorien</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleFromList("categories", c)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  values.categories.includes(c)
                    ? "border-sage bg-sage text-white"
                    : "border-sage/30 text-earth/70 hover:bg-sage-50"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-earth">Fair-Trade-Siegel</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(FAIR_BADGE_LABELS).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => toggleFromList("fairBadges", key)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  values.fairBadges.includes(key)
                    ? "border-sage bg-sage text-white"
                    : "border-sage/30 text-earth/70 hover:bg-sage-50"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-earth">Titelbild</label>
          {mode === "edit" && storeSlug ? (
            <CoverImageUploader
              storeSlug={storeSlug}
              currentCoverImage={values.coverImage || null}
              onUploaded={(coverImage) => update("coverImage", coverImage ?? "")}
            />
          ) : (
            <>
              <Input
                value={values.coverImage}
                onChange={(e) => update("coverImage", e.target.value)}
                placeholder="https://…"
                type="url"
              />
              <p className="mt-1 text-xs text-earth/50">
                Optional — ein Link zu einem gehosteten Foto. Ein direkter Bild-Upload ist
                verfügbar, sobald der Laden angelegt ist (unter „Bearbeiten“).
              </p>
            </>
          )}
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-sage/10 bg-white p-5">
        <h2 className="font-semibold text-earth">Adresse &amp; Standort</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-earth">Straße &amp; Hausnummer *</label>
            <Input
              value={values.addressLine}
              onChange={(e) => update("addressLine", e.target.value)}
              required
            />
            {fieldError("addressLine") && (
              <p className="mt-1 text-xs text-red-600">{fieldError("addressLine")}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-earth">PLZ *</label>
            <Input
              value={values.postalCode}
              onChange={(e) => update("postalCode", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-earth">Stadt *</label>
            <Input value={values.city} onChange={(e) => update("city", e.target.value)} required />
          </div>
        </div>

        <LocationPicker
          value={{ lat: values.latitude, lng: values.longitude }}
          onChange={(pos) => {
            update("latitude", pos.lat);
            update("longitude", pos.lng);
          }}
        />
      </section>

      <section className="space-y-4 rounded-xl border border-sage/10 bg-white p-5">
        <h2 className="font-semibold text-earth">Kontakt</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-earth">Telefon</label>
            <Input value={values.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-earth">Website</label>
            <Input
              value={values.website}
              onChange={(e) => update("website", e.target.value)}
              type="url"
              placeholder="https://…"
            />
            {fieldError("website") && <p className="mt-1 text-xs text-red-600">{fieldError("website")}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-earth">E-Mail</label>
            <Input value={values.email} onChange={(e) => update("email", e.target.value)} type="email" />
            {fieldError("email") && <p className="mt-1 text-xs text-red-600">{fieldError("email")}</p>}
          </div>
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-sage/10 bg-white p-5">
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

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && (
        <p className="flex items-center gap-1.5 text-sm text-sage">
          <CheckCircle2 className="h-4 w-4" />
          {mode === "create" ? "Laden veröffentlicht — er ist jetzt im Verzeichnis sichtbar." : "Änderungen gespeichert."}
        </p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : mode === "create" ? (
            "Laden veröffentlichen"
          ) : (
            "Änderungen speichern"
          )}
        </Button>
      </div>

      {mode === "create" && (
        <p className="text-xs text-earth/50">
          Dein Laden ist sofort im Verzeichnis sichtbar. Andere Nutzer:innen können ihn
          bestätigen oder melden — bei genug Meldungen wird er zur Prüfung an ein Moderations-Team
          weitergeleitet.
        </p>
      )}
      {mode === "edit" && (
        <p className="text-xs text-earth/50">
          Hinweis: Nach dem Speichern muss die Community diesen Laden erneut bestätigen — vorherige
          Bestätigungen und Badges werden zurückgesetzt, da sich der Inhalt geändert hat.
        </p>
      )}
    </form>
  );
}