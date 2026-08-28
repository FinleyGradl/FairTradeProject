// path: src/components/store/TransferStoreCard.tsx
"use client";

import { useEffect, useState } from "react";
import { ArrowRightLeft, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PendingTransfer {
  id: string;
  toUser: { name: string | null; email: string };
  message: string | null;
  expiresAt: string;
  createdAt: string;
}

/**
 * Lets the current owner hand a store off to another registered user.
 * Nothing changes until the recipient actively accepts the emailed invite
 * — see /transfers/[token] and lib/ownership-transfer.ts.
 */
export function TransferStoreCard({ storeSlug }: { storeSlug: string }) {
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState<PendingTransfer | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/v1/stores/${storeSlug}/transfer`)
      .then((res) => res.json())
      .then((data) => setPending(data.pending ?? null))
      .finally(() => setLoading(false));
  }, [storeSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const res = await fetch(`/api/v1/stores/${storeSlug}/transfer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toEmail: email, message }),
    });
    const data = await res.json().catch(() => ({}));
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error ?? "Übertragung fehlgeschlagen.");
      return;
    }

    setSuccess(`Einladung an ${email} gesendet.`);
    setShowForm(false);
    setEmail("");
    setMessage("");
    // Re-fetch so the pending-invite panel below reflects the new state.
    const refreshed = await fetch(`/api/v1/stores/${storeSlug}/transfer`).then((r) => r.json());
    setPending(refreshed.pending ?? null);
  }

  async function handleCancel() {
    if (!confirm("Diese Übertragungsanfrage wirklich stornieren?")) return;
    setSubmitting(true);
    setError(null);
    const res = await fetch(`/api/v1/stores/${storeSlug}/transfer`, { method: "DELETE" });
    setSubmitting(false);
    if (res.ok) {
      setPending(null);
      setSuccess("Übertragungsanfrage storniert.");
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-sage/10 bg-white p-5">
        <Loader2 className="h-4 w-4 animate-spin text-sage" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-sage/10 bg-white p-5">
      <h2 className="flex items-center gap-2 text-base font-semibold text-earth">
        <ArrowRightLeft className="h-4 w-4 text-sage" />
        Laden übertragen
      </h2>
      <p className="mt-1 text-sm text-earth/60">
        Gib diesen Laden an eine andere registrierte Person ab — z. B. bei einem
        Nachfolgerwechsel. Die Übertragung wird erst wirksam, wenn die Person sie annimmt.
      </p>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-3 text-sm text-sage-700">{success}</p>}

      {pending ? (
        <div className="mt-4 rounded-lg bg-cream p-4">
          <p className="text-sm text-earth">
            Ausstehende Einladung an{" "}
            <span className="font-medium">{pending.toUser.name ?? pending.toUser.email}</span>
          </p>
          {pending.message && <p className="mt-1 text-sm italic text-earth/60">„{pending.message}“</p>}
          <p className="mt-1 text-xs text-earth/50">
            Läuft ab am {new Date(pending.expiresAt).toLocaleDateString("de-DE")}
          </p>
          <Button
            type="button"
            variant="destructiveOutline"
            size="sm"
            className="mt-3 gap-1"
            onClick={handleCancel}
            disabled={submitting}
          >
            <X className="h-3.5 w-3.5" /> Einladung stornieren
          </Button>
        </div>
      ) : showForm ? (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-earth" htmlFor="transfer-email">
              E-Mail der neuen Inhaber:in
            </label>
            <input
              id="transfer-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="person@beispiel.de"
              className="w-full rounded-lg border border-sage/20 px-3 py-2 text-sm focus:border-sage focus:outline-none"
            />
            <p className="mt-1 text-xs text-earth/50">Die Person muss bereits ein FairFind-Konto haben.</p>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-earth" htmlFor="transfer-message">
              Nachricht (optional)
            </label>
            <textarea
              id="transfer-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              maxLength={500}
              placeholder="z. B. Grund der Übergabe"
              className="w-full rounded-lg border border-sage/20 px-3 py-2 text-sm focus:border-sage focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={submitting} className="gap-1">
              {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Einladung senden
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(false)}>
              Abbrechen
            </Button>
          </div>
        </form>
      ) : (
        <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => setShowForm(true)}>
          Übertragung starten
        </Button>
      )}
    </div>
  );
}