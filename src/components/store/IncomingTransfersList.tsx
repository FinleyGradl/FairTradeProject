// path: src/components/store/IncomingTransfersList.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IncomingTransfer {
  token: string;
  store: { slug: string; name: string; city: string };
  fromName: string;
  message: string | null;
  expiresAt: string;
}

export function IncomingTransfersList({ transfers }: { transfers: IncomingTransfer[] }) {
  const router = useRouter();
  const [items, setItems] = useState(transfers);
  const [busyToken, setBusyToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function respond(token: string, action: "accept" | "decline") {
    if (action === "decline" && !confirm("Diese Übertragungsanfrage wirklich ablehnen?")) return;

    setBusyToken(token);
    setError(null);
    const res = await fetch(`/api/v1/transfers/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const data = await res.json().catch(() => ({}));
    setBusyToken(null);

    if (!res.ok) {
      setError(data.error ?? "Aktion fehlgeschlagen.");
      return;
    }

    setItems((prev) => prev.filter((t) => t.token !== token));
    if (action === "accept") router.refresh();
  }

  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      {error && <p className="text-sm text-red-600">{error}</p>}
      {items.map((t) => (
        <div
          key={t.token}
          className="rounded-xl border border-sage/20 bg-sage-50/60 p-4 sm:flex sm:items-center sm:justify-between sm:gap-3"
        >
          <div className="min-w-0">
            <p className="text-sm text-earth">
              <span className="font-medium">{t.fromName}</span> möchte dir{" "}
              <span className="font-medium">{t.store.name}</span> übertragen
            </p>
            {t.message && <p className="mt-1 text-sm italic text-earth/60">„{t.message}“</p>}
            <p className="mt-1 text-xs text-earth/50">
              Gültig bis {new Date(t.expiresAt).toLocaleDateString("de-DE")}
            </p>
          </div>
          <div className="mt-3 flex shrink-0 gap-2 sm:mt-0">
            <Button
              size="sm"
              className="gap-1"
              onClick={() => respond(t.token, "accept")}
              disabled={busyToken === t.token}
            >
              {busyToken === t.token ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Check className="h-3.5 w-3.5" />
              )}
              Annehmen
            </Button>
            <Button
              size="sm"
              variant="destructiveOutline"
              className="gap-1"
              onClick={() => respond(t.token, "decline")}
              disabled={busyToken === t.token}
            >
              <X className="h-3.5 w-3.5" /> Ablehnen
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}