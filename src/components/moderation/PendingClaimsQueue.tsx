"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PendingClaim {
  id: string;
  proofText: string;
  createdAt: string;
  store: { slug: string; name: string; ownerUserId: string | null };
  user: { id: string; name: string | null; email: string; trustScore: number };
}

export function PendingClaimsQueue({ claims }: { claims: PendingClaim[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function act(id: string, action: "approve" | "reject") {
    setBusyId(id);
    const res = await fetch(`/api/admin/moderation/claims/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    setBusyId(null);
    if (res.ok) router.refresh();
  }

  if (claims.length === 0) {
    return <p className="text-sm text-earth/60">Keine offenen Beanspruchungen.</p>;
  }

  return (
    <div className="space-y-4">
      {claims.map((claim) => (
        <div key={claim.id} className="rounded-xl border border-sage/10 bg-surface p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Link href={`/stores/${claim.store.slug}`} className="font-medium text-earth hover:underline">
                {claim.store.name}
              </Link>
              <p className="mt-1 text-sm text-earth/70">
                {claim.user.name ?? claim.user.email}{" "}
                <Badge variant="secondary" className="ml-1">
                  Trust {claim.user.trustScore}
                </Badge>
              </p>
            </div>
            {claim.store.ownerUserId && (
              <Badge variant="outline" className="border-amber-400 dark:border-amber-600 text-amber-700 dark:text-amber-300">
                Laden hat bereits Inhaber:in
              </Badge>
            )}
          </div>

          <p className="mt-3 whitespace-pre-wrap rounded-lg bg-cream/60 p-3 text-sm text-earth/80">
            {claim.proofText}
          </p>

          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              onClick={() => act(claim.id, "approve")}
              disabled={busyId === claim.id}
              className="gap-1"
            >
              {busyId === claim.id ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Check className="h-3.5 w-3.5" />
              )}
              Als Inhaber:in bestätigen
            </Button>
            <Button
              size="sm"
              variant="destructiveOutline"
              onClick={() => act(claim.id, "reject")}
              disabled={busyId === claim.id}
              className="gap-1"
            >
              <X className="h-3.5 w-3.5" /> Ablehnen
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}