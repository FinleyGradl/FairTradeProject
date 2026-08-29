"use client";
// path: src/components/store/DeleteStoreCard.tsx

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DeleteStoreCardProps {
  storeSlug: string;
  storeName: string;
  /** Slightly different copy for an admin/moderator deleting someone
   * else's listing vs. an owner deleting their own. */
  isModerator: boolean;
}

/**
 * Irreversibly deletes a store — reviews, photos, community trust history
 * and all. Mirrors the "Danger Zone" type-the-name-to-confirm pattern from
 * DeleteAccountSection.tsx, since a plain confirm() felt too easy to click
 * through for something this destructive.
 */
export function DeleteStoreCard({ storeSlug, storeName, isModerator }: DeleteStoreCardProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameMatches = confirmText.trim() === storeName;
  const canSubmit = nameMatches && !loading;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError(null);

    const res = await fetch(`/api/v1/stores/${storeSlug}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setLoading(false);
      setError(data.error ?? "Löschen fehlgeschlagen.");
      return;
    }

    router.push(isModerator ? "/admin/moderation" : "/me/stores");
    router.refresh();
  }

  return (
    <div className="rounded-xl border border-red-200 bg-red-50/50">
      <div className="p-4">
        <div className="flex items-center gap-2 text-red-700">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <h3 className="text-lg font-semibold">Danger Zone</h3>
        </div>
        <p className="mt-1 text-sm text-earth/70">
          {isModerator
            ? "Laden endgültig löschen — inklusive aller Bewertungen, Fotos, Änderungsvorschläge und der Community-Bestätigungshistorie. Diese Aktion kann nicht rückgängig gemacht werden."
            : "Laden endgültig löschen — inklusive aller Bewertungen, Fotos und Änderungsvorschläge. Ein laufendes Sponsoring wird dabei automatisch gekündigt. Diese Aktion kann nicht rückgängig gemacht werden."}
        </p>

        {!expanded ? (
          <Button
            type="button"
            variant="destructiveOutline"
            size="sm"
            className="mt-3"
            onClick={() => setExpanded(true)}
          >
            Laden löschen
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3 border-t border-red-200 pt-4">
            <div>
              <label htmlFor="confirmStoreName" className="mb-1 block text-sm font-medium text-earth">
                Gib zur Bestätigung <strong>{storeName}</strong> ein
              </label>
              <Input
                id="confirmStoreName"
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={storeName}
                autoComplete="off"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex gap-2">
              <Button type="submit" variant="destructive" size="sm" disabled={!canSubmit}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Wird gelöscht…
                  </>
                ) : (
                  "Ja, Laden endgültig löschen"
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setExpanded(false);
                  setError(null);
                  setConfirmText("");
                }}
                disabled={loading}
              >
                Abbrechen
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
