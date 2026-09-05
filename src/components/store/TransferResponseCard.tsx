// path: src/components/store/TransferResponseCard.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, Loader2, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TransferResponseCardProps {
  token: string;
  store: { slug: string; name: string; city: string; addressLine: string; coverImage: string | null };
  fromName: string;
  message: string | null;
  expiresAt: string;
}

export function TransferResponseCard({
  token,
  store,
  fromName,
  message,
  expiresAt,
}: TransferResponseCardProps) {
  const router = useRouter();
  const [busy, setBusy] = useState<"accept" | "decline" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<"accepted" | "declined" | null>(null);

  async function respond(action: "accept" | "decline") {
    if (action === "decline" && !confirm("Diese Übertragungsanfrage wirklich ablehnen?")) return;

    setBusy(action);
    setError(null);
    const res = await fetch(`/api/v1/transfers/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(null);

    if (!res.ok) {
      setError(data.error ?? "Aktion fehlgeschlagen.");
      return;
    }

    setResult(data.status);
    if (data.status === "accepted") {
      router.refresh();
    }
  }

  if (result === "accepted") {
    return (
      <div className="rounded-xl border border-sage/10 bg-surface p-6 text-center">
        <Check className="mx-auto h-10 w-10 text-sage dark:text-sage-300" />
        <h1 className="mt-4 text-xl font-bold text-earth">Übertragung angenommen</h1>
        <p className="mt-2 text-earth/70">
          <span className="font-medium">{store.name}</span> gehört jetzt dir. Ein eventuell
          laufendes Sponsoring-Abo wurde beim Übertrag gekündigt — du kannst bei Bedarf ein neues
          starten.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={() => router.push(`/stores/${store.slug}/edit`)}>Laden verwalten</Button>
          <Button variant="outline" onClick={() => router.push("/me/stores")}>
            Meine Läden
          </Button>
        </div>
      </div>
    );
  }

  if (result === "declined") {
    return (
      <div className="rounded-xl border border-sage/10 bg-surface p-6 text-center">
        <h1 className="text-xl font-bold text-earth">Anfrage abgelehnt</h1>
        <p className="mt-2 text-earth/70">
          Du hast die Übertragung von <span className="font-medium">{store.name}</span> abgelehnt.
          Es hat sich nichts geändert.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-sage/10 bg-surface">
      <div className="relative h-36 bg-sage-100">
        {store.coverImage && (
          <Image src={store.coverImage} alt={store.name} fill className="object-cover" sizes="480px" />
        )}
      </div>
      <div className="p-6">
        <p className="text-sm text-earth/60">
          <span className="font-medium text-earth">{fromName}</span> möchte dir diesen Laden
          übertragen
        </p>
        <h1 className="mt-1 text-xl font-bold text-earth">{store.name}</h1>
        <p className="mt-1 flex items-center gap-1 text-sm text-earth/60">
          <MapPin className="h-3.5 w-3.5" /> {store.addressLine}, {store.city}
        </p>

        {message && (
          <p className="mt-4 rounded-lg bg-cream p-3 text-sm italic text-earth/80">„{message}“</p>
        )}

        <p className="mt-4 text-xs text-earth/50">
          Gültig bis {new Date(expiresAt).toLocaleDateString("de-DE")}. Mit der Annahme wirst du
          sofort Inhaber:in mit vollen Bearbeitungsrechten; ein laufendes Sponsoring-Abo wird dabei
          gekündigt.
        </p>

        {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}

        <div className="mt-5 flex gap-3">
          <Button onClick={() => respond("accept")} disabled={busy !== null} className="flex-1 gap-1">
            {busy === "accept" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            Annehmen
          </Button>
          <Button
            variant="destructiveOutline"
            onClick={() => respond("decline")}
            disabled={busy !== null}
            className="flex-1 gap-1"
          >
            {busy === "decline" ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
            Ablehnen
          </Button>
        </div>
      </div>
    </div>
  );
}