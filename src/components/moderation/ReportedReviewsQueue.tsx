// src/components/moderation/ReportedReviewsQueue.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flag, Loader2, EyeOff, ShieldOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/store/RatingStars";

interface ReportedReview {
  id: string;
  rating: number;
  title: string | null;
  body: string;
  reportCount: number;
  store: { slug: string; name: string };
  user: { name: string | null; email: string } | null;
  reports: { userName: string | null; reason: string | null; createdAt: string }[];
}

export function ReportedReviewsQueue({ reviews }: { reviews: ReportedReview[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [items, setItems] = useState(reviews);

  async function hide(review: ReportedReview) {
    setBusyId(review.id);
    const res = await fetch(`/api/v1/reviews/${review.id}`, { method: "DELETE" });
    setBusyId(null);
    if (res.ok) {
      setItems((prev) => prev.filter((r) => r.id !== review.id));
      router.refresh();
    }
  }

  async function dismiss(review: ReportedReview) {
    setBusyId(review.id);
    const res = await fetch(`/api/v1/reviews/${review.id}/report`, { method: "DELETE" });
    setBusyId(null);
    if (res.ok) {
      setItems((prev) => prev.filter((r) => r.id !== review.id));
      router.refresh();
    }
  }

  if (items.length === 0) {
    return <p className="text-sm text-earth/60">Keine gemeldeten Bewertungen. 🎉</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((review) => (
        <div key={review.id} className="rounded-xl border border-amber-200 bg-amber-50/40 p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <Link
                href={`/stores/${review.store.slug}`}
                className="font-medium text-earth hover:underline"
              >
                {review.store.name}
              </Link>
              <p className="text-xs text-earth/50">
                Verfasst von {review.user?.name ?? review.user?.email ?? "Unbekannt"}
              </p>
            </div>
            <Badge variant="outline" className="border-amber-400 text-amber-700">
              {review.reportCount} Meldungen
            </Badge>
          </div>

          <div className="mt-3 rounded-lg border border-sage/10 bg-white p-3">
            <RatingStars rating={review.rating} size="sm" />
            {review.title && <p className="mt-1 font-medium text-earth">{review.title}</p>}
            <p className="mt-1 text-sm text-earth/80">{review.body}</p>
          </div>

          {review.reports.length > 0 && (
            <ul className="mt-3 space-y-1.5 border-t border-amber-200/60 pt-3">
              {review.reports.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-earth/80">
                  <Flag className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
                  <span>
                    <span className="font-medium">{r.userName ?? "Anonym"}:</span>{" "}
                    {r.reason || "Kein Grund angegeben"}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              variant="destructiveOutline"
              className="gap-1"
              onClick={() => hide(review)}
              disabled={busyId === review.id}
            >
              {busyId === review.id ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <ShieldOff className="h-3.5 w-3.5" />
              )}
              Bewertung verbergen
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => dismiss(review)}
              disabled={busyId === review.id}
            >
              {busyId === review.id ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <EyeOff className="h-3.5 w-3.5" />
              )}
              Meldungen ignorieren
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}