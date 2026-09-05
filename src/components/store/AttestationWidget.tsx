"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThumbsUp, Flag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerifiedBadge } from "@/components/store/VerifiedBadge";

interface AttestationWidgetProps {
  storeSlug: string;
  confirmCount: number;
  disputeCount: number;
  verificationLevel: "unverified" | "community" | "admin";
  myVote: "confirm" | "dispute" | null;
  isSignedIn: boolean;
  isOwnStore: boolean;
}

export function AttestationWidget({
  storeSlug,
  confirmCount,
  disputeCount,
  verificationLevel,
  myVote,
  isSignedIn,
  isOwnStore,
}: AttestationWidgetProps) {
  const router = useRouter();
  const [vote, setVote] = useState(myVote);
  const [counts, setCounts] = useState({ confirmCount, disputeCount });
  const [level, setLevel] = useState(verificationLevel);
  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(newVote: "confirm" | "dispute", disputeReason?: string) {
    setError(null);
    setLoading(true);
    const res = await fetch(`/api/v1/stores/${storeSlug}/attest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vote: newVote, reason: disputeReason }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Das hat nicht geklappt.");
      return;
    }

    setVote(newVote);
    setCounts({ confirmCount: data.store.confirmCount, disputeCount: data.store.disputeCount });
    setLevel(data.store.verificationLevel);
    setShowDisputeForm(false);
    setReason("");
    if (data.store.status !== "active") {
      // The store just crossed the dispute threshold and was pulled from
      // the public directory — refresh so the page reflects that.
      router.refresh();
    }
  }

  function handleConfirm() {
    if (!isSignedIn) {
      router.push(`/login?callbackUrl=/stores/${storeSlug}`);
      return;
    }
    submit("confirm");
  }

  function handleDisputeClick() {
    if (!isSignedIn) {
      router.push(`/login?callbackUrl=/stores/${storeSlug}`);
      return;
    }
    setShowDisputeForm(true);
  }

  if (isOwnStore) return null;

  return (
    <div className="rounded-xl border border-sage/10 bg-surface p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-medium text-earth">Ist dieser Laden aktuell &amp; legit?</p>
          <p className="mt-0.5 text-sm text-earth/60">
            {counts.confirmCount} {counts.confirmCount === 1 ? "Person hat" : "Personen haben"} das
            bestätigt.
          </p>
        </div>
        <VerifiedBadge level={level} />
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          type="button"
          variant={vote === "confirm" ? "default" : "outline"}
          size="sm"
          onClick={handleConfirm}
          disabled={loading}
          className="gap-1.5"
        >
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ThumbsUp className="h-3.5 w-3.5" />}
          Bestätigen
        </Button>
        <Button
          type="button"
          variant={vote === "dispute" ? "default" : "outline"}
          size="sm"
          onClick={handleDisputeClick}
          disabled={loading}
          className="gap-1.5"
        >
          <Flag className="h-3.5 w-3.5" />
          Melden
        </Button>
      </div>

      {showDisputeForm && (
        <div className="mt-3 space-y-2">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Was stimmt nicht? (z. B. geschlossen, falsche Adresse, kein Fair-Trade-Sortiment mehr…)"
            rows={3}
            className="w-full rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth placeholder:text-earth/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          />
          <Button
            type="button"
            size="sm"
            onClick={() => submit("dispute", reason)}
            disabled={loading || reason.trim().length < 10}
          >
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Meldung absenden"}
          </Button>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}