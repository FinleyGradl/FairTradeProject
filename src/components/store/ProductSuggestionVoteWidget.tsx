"use client";
// path: src/components/store/ProductSuggestionVoteWidget.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThumbsUp, Flag, Loader2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductSuggestionDiffList } from "@/components/store/ProductSuggestionDiffList";
import type { ProductSuggestionChanges, CurrentProductSnapshot } from "@/lib/product-suggestion-diff";

interface CommunityProductSuggestion {
  id: string;
  type: "create" | "edit" | "delete";
  changes: ProductSuggestionChanges;
  note: string | null;
  confirmCount: number;
  disputeCount: number;
  myVote: "confirm" | "dispute" | null;
  product: (CurrentProductSnapshot & { id: string; name: string }) | null;
}

interface ProductSuggestionVoteWidgetProps {
  storeSlug: string;
  suggestions: CommunityProductSuggestion[];
  isSignedIn: boolean;
}

/** This store has no confirmed owner yet, so proposed product changes are
 * resolved by the community (net confirm/dispute votes) in parallel with
 * the admin moderation queue — mirrors SuggestionVoteWidget for store
 * fields. */
export function ProductSuggestionVoteWidget({
  storeSlug,
  suggestions,
  isSignedIn,
}: ProductSuggestionVoteWidgetProps) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, "confirm" | "dispute" | null>>(
    Object.fromEntries(suggestions.map((s) => [s.id, s.myVote]))
  );
  const [counts, setCounts] = useState<Record<string, { confirmCount: number; disputeCount: number }>>(
    Object.fromEntries(suggestions.map((s) => [s.id, { confirmCount: s.confirmCount, disputeCount: s.disputeCount }]))
  );
  const [resolved, setResolved] = useState<Set<string>>(new Set());

  async function vote(suggestionId: string, choice: "confirm" | "dispute") {
    if (!isSignedIn) {
      router.push(`/login?callbackUrl=/stores/${storeSlug}`);
      return;
    }
    setBusyId(suggestionId);
    const res = await fetch(`/api/v1/stores/${storeSlug}/product-suggestions/${suggestionId}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vote: choice }),
    });
    const data = await res.json().catch(() => ({}));
    setBusyId(null);
    if (!res.ok) return;

    setVotes((v) => ({ ...v, [suggestionId]: choice }));
    setCounts((c) => ({
      ...c,
      [suggestionId]: { confirmCount: data.confirmCount, disputeCount: data.disputeCount },
    }));
    if (data.status !== "pending") {
      setResolved((prev) => new Set(prev).add(suggestionId));
      router.refresh();
    }
  }

  const visible = suggestions.filter((s) => !resolved.has(s.id));
  if (visible.length === 0) return null;

  return (
    <section className="rounded-xl border border-sky-200 bg-sky-50/40 p-5">
      <div className="flex items-center gap-2">
        <Package className="h-4 w-4 text-sky-700" />
        <h3 className="font-semibold text-earth">Vorgeschlagene Produkte</h3>
      </div>
      <p className="mt-1 text-sm text-earth/60">
        Dieser Laden hat noch keine:n bestätigte:n Inhaber:in — die Community entscheidet über
        Produktvorschläge mit.
      </p>

      <div className="mt-4 space-y-4">
        {visible.map((s) => (
          <div key={s.id} className="rounded-lg border border-sky-200/70 bg-white p-4">
            <ProductSuggestionDiffList
              type={s.type}
              changes={s.changes}
              current={s.product}
              productName={s.product?.name}
            />
            {s.note && <p className="mt-2 text-sm text-earth/70">{s.note}</p>}

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant={votes[s.id] === "confirm" ? "default" : "outline"}
                className="gap-1.5"
                onClick={() => vote(s.id, "confirm")}
                disabled={busyId === s.id}
              >
                {busyId === s.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ThumbsUp className="h-3.5 w-3.5" />}
                Stimmt
              </Button>
              <Button
                type="button"
                size="sm"
                variant={votes[s.id] === "dispute" ? "default" : "outline"}
                className="gap-1.5"
                onClick={() => vote(s.id, "dispute")}
                disabled={busyId === s.id}
              >
                {busyId === s.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Flag className="h-3.5 w-3.5" />}
                Stimmt nicht
              </Button>
              <span className="text-xs text-earth/50">
                {counts[s.id]?.confirmCount ?? 0} bestätigt · {counts[s.id]?.disputeCount ?? 0} widersprochen
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
