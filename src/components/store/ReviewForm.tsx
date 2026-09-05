// src/components/store/ReviewForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ExistingReview {
  id: string;
  rating: number;
  title: string | null;
  body: string;
}

interface ReviewFormProps {
  storeSlug: string;
  isSignedIn: boolean;
  /** The signed-in user's own review on this store, if they've already left one. */
  existingReview?: ExistingReview | null;
}

export function ReviewForm({ storeSlug, isSignedIn, existingReview = null }: ReviewFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState(existingReview?.title ?? "");
  const [body, setBody] = useState(existingReview?.body ?? "");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const isEditing = Boolean(existingReview);

  function handleStart() {
    if (!isSignedIn) {
      router.push(`/login?callbackUrl=/stores/${storeSlug}`);
      return;
    }
    setOpen(true);
  }

  async function handleSubmit() {
    if (rating < 1) {
      setError("Bitte wähle eine Bewertung (1–5 Sterne).");
      return;
    }
    if (body.trim().length < 10) {
      setError("Bitte schreibe mindestens 10 Zeichen.");
      return;
    }
    setError(null);
    setLoading(true);
    const res = await fetch(`/api/v1/stores/${storeSlug}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, title: title || undefined, body }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Das hat nicht geklappt.");
      return;
    }

    setSuccess(true);
    setOpen(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!existingReview) return;
    if (!confirm("Deine Bewertung wirklich löschen?")) return;
    setDeleting(true);
    setError(null);
    const res = await fetch(`/api/v1/reviews/${existingReview.id}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({}));
    setDeleting(false);

    if (!res.ok) {
      setError(data.error ?? "Löschen fehlgeschlagen.");
      return;
    }

    setDeleted(true);
    setOpen(false);
    router.refresh();
  }

  if (deleted) {
    return (
      <p className="rounded-lg border border-sage/10 bg-sage-50 p-4 text-sm text-earth/80">
        Deine Bewertung wurde gelöscht.
      </p>
    );
  }

  if (success) {
    return (
      <p className="rounded-lg border border-sage/10 bg-sage-50 p-4 text-sm text-earth/80">
        {isEditing ? "Deine Bewertung wurde aktualisiert." : "Danke für deine Bewertung! Sie ist jetzt sichtbar."}
      </p>
    );
  }

  if (!open) {
    return (
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={handleStart}>
          {isEditing ? "Bewertung bearbeiten" : "Bewertung schreiben"}
        </Button>
        {isEditing && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-1 text-earth/50 hover:text-red-600 hover:dark:text-red-400"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            Löschen
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-xl border border-sage/10 bg-surface p-4">
      <div>
        <p className="mb-1 text-sm font-medium text-earth">Deine Bewertung</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHoverRating(n)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`${n} Sterne`}
            >
              <Star
                className={cn(
                  "h-6 w-6",
                  n <= (hoverRating || rating)
                    ? "fill-amber-400 text-amber-400 dark:text-amber-300"
                    : "fill-none text-gray-300"
                )}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-earth">Titel (optional)</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
          className="mt-1 w-full rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth placeholder:text-earth/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          placeholder="Kurz zusammengefasst…"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-earth">Deine Erfahrung *</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          minLength={10}
          maxLength={2000}
          className="mt-1 w-full rounded-lg border border-sage/20 px-3 py-2 text-sm text-earth placeholder:text-earth/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          placeholder="Wie war dein Einkauf? Sortiment, Beratung, Preise…"
        />
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : isEditing ? (
            "Bewertung aktualisieren"
          ) : (
            "Bewertung absenden"
          )}
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>
          Abbrechen
        </Button>
        {isEditing && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="ml-auto gap-1 text-earth/50 hover:text-red-600 hover:dark:text-red-400"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            Löschen
          </Button>
        )}
      </div>
    </div>
  );
}