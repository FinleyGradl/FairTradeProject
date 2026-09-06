// path: src/components/admin/BillingSettingsForm.tsx
"use client";

import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface BillingSettingsValue {
  invoiceIssuerName: string;
  invoiceIssuerStreet: string;
  invoiceIssuerZipCity: string;
  invoiceIssuerCountry: string;
  invoiceIssuerEmail: string;
  invoiceIssuerTaxNumber: string | null;
  invoiceIssuerVatId: string | null;
  isKleinunternehmer: boolean;
  vatRatePercent: number;
  invoiceIssuerIban: string | null;
  invoiceIssuerBankName: string | null;
  invoiceFooterNote: string | null;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-earth">{label}</span>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

export function BillingSettingsForm({ initial }: { initial: BillingSettingsValue }) {
  const [values, setValues] = useState<BillingSettingsValue>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof BillingSettingsValue>(key: K, value: BillingSettingsValue[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/settings/billing", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Speichern fehlgeschlagen.");
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {error && <p className="rounded-lg bg-red-50 dark:bg-red-950/40 px-3 py-2 text-sm text-red-700 dark:text-red-400">{error}</p>}

      <Card>
        <CardContent className="space-y-4 p-4">
          <h2 className="text-sm font-semibold text-earth">Rechnungssteller</h2>
          <Field label="Name" value={values.invoiceIssuerName} onChange={(v) => set("invoiceIssuerName", v)} />
          <Field
            label="Straße & Hausnummer"
            value={values.invoiceIssuerStreet}
            onChange={(v) => set("invoiceIssuerStreet", v)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="PLZ & Ort"
              value={values.invoiceIssuerZipCity}
              onChange={(v) => set("invoiceIssuerZipCity", v)}
            />
            <Field
              label="Land"
              value={values.invoiceIssuerCountry}
              onChange={(v) => set("invoiceIssuerCountry", v)}
            />
          </div>
          <Field
            label="Kontakt-E-Mail (erscheint auf der Rechnung)"
            value={values.invoiceIssuerEmail}
            onChange={(v) => set("invoiceIssuerEmail", v)}
            type="email"
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <h2 className="text-sm font-semibold text-earth">Steuerliche Angaben</h2>
          <label className="flex cursor-pointer items-center justify-between gap-4 py-1 text-sm">
            <span className="text-earth">
              Kleinunternehmerregelung (§19 UStG) — keine USt. auf Rechnungen ausweisen
            </span>
            <input
              type="checkbox"
              checked={values.isKleinunternehmer}
              onChange={(e) => set("isKleinunternehmer", e.target.checked)}
              className="h-5 w-5 accent-sage-600"
            />
          </label>
          {!values.isKleinunternehmer && (
            <Field
              label="USt.-Satz (%)"
              value={String(values.vatRatePercent)}
              onChange={(v) => set("vatRatePercent", Number(v) || 0)}
              type="number"
            />
          )}
          <Field
            label="Steuernummer"
            value={values.invoiceIssuerTaxNumber ?? ""}
            onChange={(v) => set("invoiceIssuerTaxNumber", v)}
            placeholder="Optional"
          />
          <Field
            label="USt-IdNr."
            value={values.invoiceIssuerVatId ?? ""}
            onChange={(v) => set("invoiceIssuerVatId", v)}
            placeholder="Optional"
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <h2 className="text-sm font-semibold text-earth">Bankverbindung (optional)</h2>
          <Field
            label="IBAN"
            value={values.invoiceIssuerIban ?? ""}
            onChange={(v) => set("invoiceIssuerIban", v)}
          />
          <Field
            label="Bank"
            value={values.invoiceIssuerBankName ?? ""}
            onChange={(v) => set("invoiceIssuerBankName", v)}
          />
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-earth">Fußnotentext (optional)</span>
            <textarea
              value={values.invoiceFooterNote ?? ""}
              onChange={(e) => set("invoiceFooterNote", e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-sage/20 bg-surface px-3 py-2 text-sm text-earth"
              placeholder="Erscheint klein unter jeder Rechnung."
            />
          </label>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="button" onClick={save} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Speichern"}
        </Button>
        {saved && !saving && (
          <span className="flex items-center gap-1 text-sm text-sage-600 dark:text-sage-400">
            <Check className="h-4 w-4" /> Gespeichert
          </span>
        )}
      </div>
    </div>
  );
}
