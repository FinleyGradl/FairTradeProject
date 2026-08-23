// path: src/components/admin/PromoCodeManager.tsx
"use client";

import { useState } from "react";
import { Trash2, Loader2, Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface PromoCodeRow {
  id: string;
  code: string;
  discountPercent: number;
  label: string | null;
  active: boolean;
  maxRedemptions: number | null;
  redemptionCount: number;
  expiresAt: string | null;
  createdAt: string;
  createdBy: { name: string | null; email: string } | null;
}

export function PromoCodeManager({ initialCodes }: { initialCodes: PromoCodeRow[] }) {
  const [codes, setCodes] = useState(initialCodes);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [form, setForm] = useState({
    code: "",
    discountPercent: 20,
    label: "",
    maxRedemptions: "",
    expiresAt: "",
  });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCreating(true);
    try {
      const res = await fetch("/api/admin/promo-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: form.code.trim() || undefined,
          discountPercent: Number(form.discountPercent),
          label: form.label.trim() || undefined,
          maxRedemptions: form.maxRedemptions ? Number(form.maxRedemptions) : undefined,
          expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Fehler beim Erstellen.");
      setCodes((prev) => [{ ...data.code, createdBy: null }, ...prev]);
      setForm({ code: "", discountPercent: 20, label: "", maxRedemptions: "", expiresAt: "" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler.");
    } finally {
      setCreating(false);
    }
  }

  async function toggleActive(row: PromoCodeRow) {
    const res = await fetch(`/api/admin/promo-codes/${row.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !row.active }),
    });
    if (res.ok) {
      const data = await res.json();
      setCodes((prev) => prev.map((c) => (c.id === row.id ? { ...c, active: data.code.active } : c)));
    }
  }

  async function remove(id: string) {
    if (!confirm("Code wirklich löschen?")) return;
    const res = await fetch(`/api/admin/promo-codes/${id}`, { method: "DELETE" });
    if (res.ok) setCodes((prev) => prev.filter((c) => c.id !== id));
  }

  function copy(row: PromoCodeRow) {
    navigator.clipboard.writeText(row.code).then(() => {
      setCopiedId(row.id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  }

  return (
    <div>
      <Card className="mb-8">
        <CardContent className="p-4">
          <form onSubmit={handleCreate} className="grid gap-3 sm:grid-cols-5">
            <div className="sm:col-span-1">
              <label className="mb-1 block text-xs text-earth/60">Code (leer = zufällig)</label>
              <Input
                value={form.code}
                onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
                placeholder="z. B. SOMMER25"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-earth/60">Rabatt (%)</label>
              <Input
                type="number"
                min={1}
                max={100}
                value={form.discountPercent}
                onChange={(e) => setForm((f) => ({ ...f, discountPercent: Number(e.target.value) }))}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-earth/60">Notiz</label>
              <Input
                value={form.label}
                onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                placeholder="z. B. Newsletter-Aktion"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-earth/60">Max. Einlösungen</label>
              <Input
                type="number"
                min={1}
                value={form.maxRedemptions}
                onChange={(e) => setForm((f) => ({ ...f, maxRedemptions: e.target.value }))}
                placeholder="unbegrenzt"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-earth/60">Gültig bis</label>
              <Input
                type="date"
                value={form.expiresAt}
                onChange={(e) => setForm((f) => ({ ...f, expiresAt: e.target.value }))}
              />
            </div>
            <div className="sm:col-span-5">
              <Button type="submit" disabled={creating}>
                {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Code erstellen"}
              </Button>
            </div>
          </form>
          {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        </CardContent>
      </Card>

      <div className="space-y-2">
        {codes.length === 0 && (
          <p className="py-8 text-center text-sm text-earth/50">Noch keine Promo-Codes erstellt.</p>
        )}
        {codes.map((row) => {
          const exhausted = row.maxRedemptions != null && row.redemptionCount >= row.maxRedemptions;
          const expired = row.expiresAt ? new Date(row.expiresAt).getTime() < Date.now() : false;
          return (
            <Card key={row.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copy(row)}
                      className="flex items-center gap-1 rounded bg-sage-100 px-2 py-0.5 font-mono text-sm text-earth"
                      title="Code kopieren"
                    >
                      {row.code} {copiedId === row.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </button>
                    <Badge variant="secondary">{row.discountPercent}% Rabatt</Badge>
                    {!row.active && <Badge variant="outline">Deaktiviert</Badge>}
                    {exhausted && <Badge variant="outline">Aufgebraucht</Badge>}
                    {expired && <Badge variant="outline">Abgelaufen</Badge>}
                  </div>
                  <p className="mt-1 text-xs text-earth/60">
                    {row.label && <>{row.label} · </>}
                    Genutzt: {row.redemptionCount}
                    {row.maxRedemptions != null ? ` / ${row.maxRedemptions}` : ""}
                    {row.expiresAt && <> · gültig bis {new Date(row.expiresAt).toLocaleDateString("de-DE")}</>}
                    {row.createdBy && <> · erstellt von {row.createdBy.name ?? row.createdBy.email}</>}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => toggleActive(row)}>
                    {row.active ? "Deaktivieren" : "Aktivieren"}
                  </Button>
                  <Button variant="destructiveOutline" size="sm" onClick={() => remove(row.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}