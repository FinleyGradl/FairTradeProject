"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, X, Loader2, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FlaggedStore {
  id: string;
  slug: string;
  name: string;
  city: string;
  confirmCount: number;
  disputeCount: number;
  categories: string[];
  createdBy: { name: string | null; email: string };
  disputes: { userName: string | null; reason: string | null; createdAt: string }[];
}

export function FlaggedStoresQueue({ stores }: { stores: FlaggedStore[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function act(id: string, action: "approve" | "reject") {
    setBusyId(id);
    const res = await fetch(`/api/admin/moderation/stores/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    setBusyId(null);
    if (res.ok) router.refresh();
  }

  if (stores.length === 0) {
    return <p className="text-sm text-earth/60">Keine gemeldeten Läden. 🎉</p>;
  }

  return (
    <div className="space-y-4">
      {stores.map((store) => (
        <div key={store.id} className="rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50/40 dark:bg-amber-950/20 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Link href={`/stores/${store.slug}`} className="font-medium text-earth hover:underline">
                {store.name}
              </Link>
              <p className="text-sm text-earth/60">{store.city}</p>
              <p className="mt-1 text-xs text-earth/50">
                Eingereicht von {store.createdBy.name ?? store.createdBy.email}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{store.confirmCount} Bestätigungen</Badge>
              <Badge variant="outline" className="border-amber-400 dark:border-amber-600 text-amber-700 dark:text-amber-300">
                {store.disputeCount} Meldungen
              </Badge>
            </div>
          </div>

          {store.disputes.length > 0 && (
            <ul className="mt-3 space-y-1.5 border-t border-amber-200/60 dark:border-amber-800/40 pt-3">
              {store.disputes.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-earth/80">
                  <Flag className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                  <span>
                    <span className="font-medium">{d.userName ?? "Anonym"}:</span> {d.reason}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              onClick={() => act(store.id, "approve")}
              disabled={busyId === store.id}
              className="gap-1"
            >
              {busyId === store.id ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Check className="h-3.5 w-3.5" />
              )}
              Freigeben &amp; als geprüft markieren
            </Button>
            <Button
              size="sm"
              variant="destructiveOutline"
              onClick={() => act(store.id, "reject")}
              disabled={busyId === store.id}
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