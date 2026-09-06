"use client";
// path: src/components/store/ProductReviewsList.tsx

import { useState } from "react";
import { Flag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/store/RatingStars";

export interface ProductReviewListItem {
  id: string;
  rating: number;
  title: string | null;
  body: string;
  createdAt: string | Date;
  ownerReply: string | null;
  user: { id: string; name: string | null; avatarUrl?: string | null };
  reportedByMe: boolean;
}

interface ProductReviewsListProps {
  reviews: ProductReviewListItem[];
  isSignedIn: boolean;
  currentUserId?: string | null;
}

export function ProductReviewsList({ reviews: initialReviews, isSignedIn, currentUserId }: ProductReviewsListProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleReport(review: ProductReviewListItem) {
    setBusyId(review.id);
    setError(null);
    const res = await fetch(`/api/v1/product-reviews/${review.id}/report`, { method: "POST" });
    const data = await res.json().catch(() => ({}));
    setBusyId(null);

    if (!res.ok) {
      setError(data.error ?? "Melden fehlgeschlagen.");
      return;
    }

    setReviews((prev) => prev.map((r) => (r.id === review.id ? { ...r, reportedByMe: true } : r)));
  }

  if (reviews.length === 0) {
    return <p className="text-sm text-earth/60">Noch keine Bewertungen für dieses Produkt.</p>;
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      {reviews.map((review) => {
        const canReport = isSignedIn && !review.reportedByMe && review.user.id !== currentUserId;
        return (
          <div key={review.id} className="rounded-lg border border-sage/10 bg-surface p-4">
            <div className="flex items-start justify-between gap-2">
              <RatingStars rating={review.rating} size="sm" />
              {canReport && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto gap-1 p-1 text-xs text-earth/50 hover:text-earth"
                  onClick={() => handleReport(review)}
                  disabled={busyId === review.id}
                >
                  {busyId === review.id ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Flag className="h-3 w-3" />
                  )}
                  Melden
                </Button>
              )}
              {review.reportedByMe && <span className="text-xs text-earth/50">Gemeldet</span>}
            </div>
            {review.title && <p className="mt-1 font-medium text-earth">{review.title}</p>}
            <p className="mt-1 text-sm text-earth/80">{review.body}</p>
            <p className="mt-2 text-xs text-earth/50">
              {review.user.name ?? "Anonymous"} · {new Date(review.createdAt).toLocaleDateString()}
            </p>
            {review.ownerReply && (
              <div className="mt-3 rounded bg-sage-50 p-3 text-sm">
                <p className="font-medium text-sage dark:text-sage-300">Antwort des Ladens</p>
                <p className="text-earth/80">{review.ownerReply}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
