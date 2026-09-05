"use client";
// path: src/components/store/ProductManagePanel.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, Trash2, PlusCircle, Package, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface ManagedProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number | null;
  currency: string;
  category: string | null;
  imageUrl: string | null;
  inStock: boolean;
  reviewCount: number;
}

interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
  inStock: boolean;
}

const EMPTY_FORM: ProductFormValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  imageUrl: "",
  inStock: true,
};

function toFormValues(p: ManagedProduct): ProductFormValues {
  return {
    name: p.name,
    description: p.description ?? "",
    price: p.price != null ? String(p.price) : "",
    category: p.category ?? "",
    imageUrl: p.imageUrl ?? "",
    inStock: p.inStock,
  };
}

interface ProductManagePanelProps {
  storeSlug: string;
  products: ManagedProduct[];
}

/** Direct product CRUD for whoever can edit the store (owner/admin/
 * moderator) — no suggestion/review step, changes apply immediately. See
 * ProductSuggestForm for the non-owner "propose a change" flow. */
export function ProductManagePanel({ storeSlug, products: initial }: ProductManagePanelProps) {
  const router = useRouter();
  const [products, setProducts] = useState(initial);
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<ProductFormValues>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function startNew() {
    setForm(EMPTY_FORM);
    setError(null);
    setEditing("new");
  }

  function startEdit(product: ManagedProduct) {
    setForm(toFormValues(product));
    setError(null);
    setEditing(product.id);
  }

  function buildPayload() {
    return {
      name: form.name.trim(),
      description: form.description.trim(),
      price: form.price.trim() ? Number(form.price) : null,
      category: form.category.trim(),
      imageUrl: form.imageUrl.trim(),
      inStock: form.inStock,
    };
  }

  async function handleSave() {
    if (form.name.trim().length < 2) {
      setError("Bitte gib einen Namen an (mind. 2 Zeichen).");
      return;
    }
    setError(null);
    setLoading(true);

    const isNew = editing === "new";
    const res = await fetch(
      isNew ? `/api/v1/stores/${storeSlug}/products` : `/api/v1/products/${editing}`,
      {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      }
    );
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Das hat nicht geklappt.");
      return;
    }

    if (isNew) {
      setProducts((prev) => [...prev, { ...data.product, reviewCount: 0 }]);
    } else {
      setProducts((prev) => prev.map((p) => (p.id === editing ? { ...p, ...data.product } : p)));
    }
    setEditing(null);
    router.refresh();
  }

  async function handleDelete(product: ManagedProduct) {
    if (!confirm(`„${product.name}“ wirklich löschen?`)) return;
    setDeletingId(product.id);
    const res = await fetch(`/api/v1/products/${product.id}`, { method: "DELETE" });
    setDeletingId(null);
    if (!res.ok) return;
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
    router.refresh();
  }

  return (
    <div className="rounded-xl border border-sage/10 bg-surface p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-sage dark:text-sage-300" />
          <h2 className="font-semibold text-earth">Produkte ({products.length})</h2>
        </div>
        {editing === null && (
          <Button type="button" size="sm" variant="outline" className="gap-1.5" onClick={startNew}>
            <PlusCircle className="h-3.5 w-3.5" />
            Produkt hinzufügen
          </Button>
        )}
      </div>

      {products.length === 0 && editing === null && (
        <p className="mt-3 text-sm text-earth/60">Noch keine Produkte angelegt.</p>
      )}

      <div className="mt-4 space-y-2">
        {products.map((product) =>
          editing === product.id ? (
            <ProductFormCard
              key={product.id}
              form={form}
              setForm={setForm}
              error={error}
              loading={loading}
              onSave={handleSave}
              onCancel={() => setEditing(null)}
              submitLabel="Speichern"
            />
          ) : (
            <div
              key={product.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-sage/10 p-3"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-earth">{product.name}</p>
                <p className="truncate text-xs text-earth/50">
                  {product.price != null ? `${product.price.toFixed(2)} ${product.currency}` : "Kein Preis"}
                  {product.category ? ` · ${product.category}` : ""}
                  {product.reviewCount > 0 ? ` · ${product.reviewCount} Bewertungen` : ""}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {!product.inStock && <Badge variant="secondary">Ausverkauft</Badge>}
                <Button type="button" size="sm" variant="ghost" onClick={() => startEdit(product)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="text-earth/50 hover:text-red-600 hover:dark:text-red-400"
                  onClick={() => handleDelete(product)}
                  disabled={deletingId === product.id}
                >
                  {deletingId === product.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>
          )
        )}

        {editing === "new" && (
          <ProductFormCard
            form={form}
            setForm={setForm}
            error={error}
            loading={loading}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
            submitLabel="Anlegen"
          />
        )}
      </div>
    </div>
  );
}

function ProductFormCard({
  form,
  setForm,
  error,
  loading,
  onSave,
  onCancel,
  submitLabel,
}: {
  form: ProductFormValues;
  setForm: (updater: (prev: ProductFormValues) => ProductFormValues) => void;
  error: string | null;
  loading: boolean;
  onSave: () => void;
  onCancel: () => void;
  submitLabel: string;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-sage/20 bg-sage-50/30 p-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-earth">Name *</label>
        <button type="button" onClick={onCancel} className="text-earth/40 hover:text-earth">
          <X className="h-4 w-4" />
        </button>
      </div>
      <input
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        maxLength={120}
        className="w-full rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
      />
      <textarea
        value={form.description}
        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        rows={2}
        maxLength={2000}
        placeholder="Beschreibung"
        className="w-full rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth placeholder:text-earth/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
      />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-earth/70">Preis (€)</label>
          <input
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            inputMode="decimal"
            className="mt-1 w-full rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-earth/70">Kategorie</label>
          <input
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            maxLength={60}
            className="mt-1 w-full rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-earth/70">Bild-URL</label>
        <input
          value={form.imageUrl}
          onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          placeholder="https://…"
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-earth">
        <input
          type="checkbox"
          checked={form.inStock}
          onChange={(e) => setForm((f) => ({ ...f, inStock: e.target.checked }))}
        />
        Auf Lager
      </label>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      <div className="flex gap-2">
        <Button type="button" size="sm" onClick={onSave} disabled={loading}>
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : submitLabel}
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={onCancel}>
          Abbrechen
        </Button>
      </div>
    </div>
  );
}
