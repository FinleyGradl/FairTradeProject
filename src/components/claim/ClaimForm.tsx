"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ClaimForm({ storeSlug }: { storeSlug: string }) {
  const router = useRouter();
  const [businessEmail, setBusinessEmail] = useState("");
  const [proofText, setProofText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch(`/api/v1/stores/${storeSlug}/claim`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessEmail, proofText }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Fehlgeschlagen.");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push(`/stores/${storeSlug}`), 1200);
  }

  if (success) {
    return (
      <div className="mt-8 flex flex-col items-center gap-2 rounded-xl border border-sage/10 bg-surface p-6 text-center">
        <CheckCircle2 className="h-8 w-8 text-sage dark:text-sage-300" />
        <p className="font-medium text-earth">Anfrage eingereicht</p>
        <p className="text-sm text-earth/70">
          Wir prüfen deine Angaben und melden uns per E-Mail, sobald der Laden freigegeben ist.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-xl border border-sage/10 bg-surface p-6">
      <div>
        <label className="text-sm font-medium text-earth">Geschäftliche E-Mail</label>
        <Input
          type="email"
          value={businessEmail}
          onChange={(e) => setBusinessEmail(e.target.value)}
          placeholder="you@yourstore.com"
          className="mt-1"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-earth">Nachweis der Inhaberschaft *</label>
        <textarea
          value={proofText}
          onChange={(e) => setProofText(e.target.value)}
          placeholder="Wie können wir verifizieren, dass du diesen Laden betreibst? (z. B. Website, Impressum, Gewerbenachweis, Rechnung…)"
          rows={4}
          required
          minLength={20}
          className="mt-1 w-full rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth placeholder:text-earth/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        />
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Anfrage einreichen"}
      </Button>
    </form>
  );
}