"use client";
// path: src/components/store/ProductSuggestForm.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExistingProductOption {
  id: string;
  name: string;
}

interface ProductSuggestFormProps {
  storeSlug: string;
  isSignedIn: boolean;
  existingProducts: ExistingProductOption[];
}

type SuggestionType = "create" | "edit" | "delete";

/** Anyone who can't edit a store's products directly (see canEditProduct())
 * uses this to propose a new product, a change to an existing one, or its
 * removal — resolved by the owner (or community vote on unmanaged stores),
 * see ProductSuggestionReviewQueue / ProductSuggestionVoteWidget. */
export function ProductSuggestForm({ storeSlug, isSignedIn, existingProducts }: ProductSuggestFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<SuggestionType>("create");
  const [productId, setProductId] = useState(existingProducts[0]?.id ?? "");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(true);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleStart() {
    if (!isSignedIn) {
      router.push(`/login?callbackUrl=/stores/${storeSlug}`);
      return;
    }
    setOpen(true);
  }

  async function handleSubmit() {
    setError(null);

    if ((type === "edit" || type === "delete") && !productId) {
      setError("Bitte wähle ein Produkt aus.");
      return;
    }
    if (type === "create" && name.trim().length < 2) {
      setError("Bitte gib einen Namen an.");
      return;
    }

    setLoading(true);
    const body: Record<string, unknown> = { type, note: note || undefined };
    if (type !== "create") body.productId = productId;
    if (type !== "delete") {
      if (type === "create" || name.trim()) body.name = name.trim();
      if (type === "create" || description.trim()) body.description = description.trim();
      if (type === "create" || price.trim()) body.price = price.trim() ? Number(price) : null;
      if (type === "create" || category.trim()) body.category = category.trim();
      if (type === "edit" || type === "create") body.inStock = inStock;
    }

    const res = await fetch(`/api/v1/stores/${storeSlug}/product-suggestions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Das hat nicht geklappt.");
      return;
    }

    setSuccess(true);
    setOpen(false);
    router.refresh();
  }

  if (success) {
    return (
      <p className="rounded-lg border border-sage/10 bg-sage-50 p-4 text-sm text-earth/80">
        Danke! Dein Produktvorschlag wartet jetzt auf Prüfung.
      </p>
    );
  }

  if (!open) {
    return (
      <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={handleStart}>
        <PlusCircle className="h-3.5 w-3.5" />
        Produkt vorschlagen
      </Button>
    );
  }

  const typeOptions: { id: SuggestionType; label: string }[] = [
    { id: "create", label: "Neues Produkt" },
    { id: "edit", label: "Vorhandenes bearbeiten" },
    { id: "delete", label: "Vorhandenes entfernen" },
  ];

  return (
    <div className="space-y-3 rounded-xl border border-sage/10 bg-surface p-4">
      <div className="flex gap-2">
        {typeOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setType(opt.id)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              type === opt.id
                ? "border-sage bg-sage text-white"
                : "border-sage/20 text-earth/70 hover:border-sage/40"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {(type === "edit" || type === "delete") && (
        <div>
          <label className="text-sm font-medium text-earth">Produkt</label>
          {existingProducts.length === 0 ? (
            <p className="mt-1 text-sm text-earth/50">Dieser Laden hat noch keine Produkte.</p>
          ) : (
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              {existingProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {type !== "delete" && (
        <>
          <div>
            <label className="text-sm font-medium text-earth">
              Name{type === "create" ? " *" : " (optional — nur ausfüllen, wenn geändert)"}
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={120}
              className="mt-1 w-full rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth placeholder:text-earth/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              placeholder="Produktname"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-earth">Beschreibung</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              maxLength={2000}
              className="mt-1 w-full rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth placeholder:text-earth/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-earth">Preis (€)</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                inputMode="decimal"
                className="mt-1 w-full rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth placeholder:text-earth/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-earth">Kategorie</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                maxLength={60}
                className="mt-1 w-full rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth placeholder:text-earth/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-earth">
            <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
            Auf Lager
          </label>
        </>
      )}

      <div>
        <label className="text-sm font-medium text-earth">Notiz an die Moderation (optional)</label>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={500}
          className="mt-1 w-full rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth placeholder:text-earth/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          placeholder="Woher weißt du das?"
        />
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      <div className="flex gap-2">
        <Button type="button" size="sm" onClick={handleSubmit} disabled={loading}>
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Vorschlag absenden"}
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>
          Abbrechen
        </Button>
      </div>
    </div>
  );
}
