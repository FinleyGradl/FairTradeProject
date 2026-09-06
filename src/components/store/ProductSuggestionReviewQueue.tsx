"use client";
// path: src/components/store/ProductSuggestionReviewQueue.tsx

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Loader2, Check, X, MessageSquareText, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductSuggestionDiffList } from "@/components/store/ProductSuggestionDiffList";
import type { ProductSuggestionChanges, CurrentProductSnapshot } from "@/lib/product-suggestion-diff";

interface PendingProductSuggestion {
  id: string;
  type: "create" | "edit" | "delete";
  changes: ProductSuggestionChanges;
  note: string | null;
  createdAt: string;
  suggestedBy: { name: string | null; email: string; trustScore: number };
  product: CurrentProductSnapshot & { id: string; name: string } | null;
}

interface ProductSuggestionReviewQueueProps {
  storeSlug: string;
  suggestions: PendingProductSuggestion[];
}

/** Shown to a store's owner (or an admin/moderator) on the edit page —
 * other users' proposed products (new / changed / removed), waiting for a
 * yes/no. Mirrors SuggestionReviewQueue for store-field suggestions. */
export function ProductSuggestionReviewQueue({ storeSlug, suggestions }: ProductSuggestionReviewQueueProps) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [items, setItems] = useState(suggestions);

  async function review(id: string, action: "approve" | "reject") {
    setBusyId(id);
    const res = await fetch(`/api/v1/stores/${storeSlug}/product-suggestions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    setBusyId(null);
    if (res.ok) {
      setItems((prev) => prev.filter((s) => s.id !== id));
      router.refresh();
    }
  }

  if (items.length === 0) return null;

  return (
    <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-5">
      <div className="flex items-center gap-2">
        <Package className="h-4 w-4 text-sky-700" />
        <h2 className="font-semibold text-earth">Produktvorschläge ({items.length})</h2>
      </div>
      <p className="mt-1 text-sm text-earth/60">
        Andere Nutzer:innen haben diese Produkte vorgeschlagen, bearbeitet oder zum Entfernen
        markiert. Übernehmen wirkt sofort, Ablehnen verwirft den Vorschlag.
      </p>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg border border-sky-200/70 bg-surface p-4">
            <p className="text-xs text-earth/50">
              Vorgeschlagen von {item.suggestedBy.name ?? item.suggestedBy.email}
            </p>

            <div className="mt-2">
              <ProductSuggestionDiffList
                type={item.type}
                changes={item.changes}
                current={item.product}
                productName={item.product?.name}
              />
            </div>

            {item.note && (
              <p className="mt-3 flex items-start gap-2 text-sm text-earth/70">
                <MessageSquareText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600" />
                {item.note}
              </p>
            )}

            <div className="mt-3 flex gap-2">
              <Button
                size="sm"
                className="gap-1"
                onClick={() => review(item.id, "approve")}
                disabled={busyId === item.id}
              >
                {busyId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                Übernehmen
              </Button>
              <Button
                size="sm"
                variant="destructiveOutline"
                className="gap-1"
                onClick={() => review(item.id, "reject")}
                disabled={busyId === item.id}
              >
                {busyId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <X className="h-3.5 w-3.5" />}
                Ablehnen
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
