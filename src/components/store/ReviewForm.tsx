"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  storeSlug: string;
  isSignedIn: boolean;
}

export function ReviewForm({ storeSlug, isSignedIn }: ReviewFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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

  if (success) {
    return (
      <p className="rounded-lg border border-sage/10 bg-sage-50 p-4 text-sm text-earth/80">
        Danke für deine Bewertung! Sie ist jetzt sichtbar.
      </p>
    );
  }

  if (!open) {
    return (
      <Button type="button" variant="outline" size="sm" onClick={handleStart}>
        Bewertung schreiben
      </Button>
    );
  }

  return (
    <div className="space-y-3 rounded-xl border border-sage/10 bg-white p-4">
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
                    ? "fill-amber-400 text-amber-400"
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
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <Button type="button" size="sm" onClick={handleSubmit} disabled={loading}>
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Bewertung absenden"}
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>
          Abbrechen
        </Button>
      </div>
    </div>
  );
}
