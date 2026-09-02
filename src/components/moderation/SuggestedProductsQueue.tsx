"use client";
// path: src/components/moderation/SuggestedProductsQueue.tsx

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Check, X, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductSuggestionDiffList } from "@/components/store/ProductSuggestionDiffList";
import type { ProductSuggestionChanges, CurrentProductSnapshot } from "@/lib/product-suggestion-diff";

interface SuggestedProduct {
  id: string;
  type: "create" | "edit" | "delete";
  changes: ProductSuggestionChanges;
  note: string | null;
  createdAt: string;
  confirmCount: number;
  disputeCount: number;
  store: { slug: string; name: string };
  suggestedBy: { name: string | null; email: string; trustScore: number };
  product: (CurrentProductSnapshot & { id: string; name: string }) | null;
}

/** Product suggestions on unmanaged (ownerless) stores — same
 * community-vote-in-parallel model as SuggestedEditsQueue, applied to
 * products instead of store fields. */
export function SuggestedProductsQueue({ suggestions }: { suggestions: SuggestedProduct[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [items, setItems] = useState(suggestions);

  async function review(item: SuggestedProduct, action: "approve" | "reject") {
    setBusyId(item.id);
    const res = await fetch(`/api/v1/stores/${item.store.slug}/product-suggestions/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    setBusyId(null);
    if (res.ok) {
      setItems((prev) => prev.filter((s) => s.id !== item.id));
      router.refresh();
    }
  }

  if (items.length === 0) {
    return <p className="text-sm text-earth/60">Keine offenen Produktvorschläge.</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="rounded-xl border border-sky-200 bg-sky-50/40 p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <Link href={`/stores/${item.store.slug}`} className="font-medium text-earth hover:underline">
                {item.store.name}
              </Link>
              <p className="text-xs text-earth/50">
                Vorgeschlagen von {item.suggestedBy.name ?? item.suggestedBy.email}
              </p>
            </div>
            {(item.confirmCount > 0 || item.disputeCount > 0) && (
              <Badge variant="outline" className="border-sky-400 text-sky-700">
                {item.confirmCount} bestätigt · {item.disputeCount} widersprochen
              </Badge>
            )}
          </div>

          <div className="mt-3 border-t border-sky-200/60 pt-3">
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
              onClick={() => review(item, "approve")}
              disabled={busyId === item.id}
            >
              {busyId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
              Übernehmen
            </Button>
            <Button
              size="sm"
              variant="destructiveOutline"
              className="gap-1"
              onClick={() => review(item, "reject")}
              disabled={busyId === item.id}
            >
              {busyId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <X className="h-3.5 w-3.5" />}
              Ablehnen
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
