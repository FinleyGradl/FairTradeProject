"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { StoreCard, type StoreCardData } from "@/components/store/StoreCard";
import { EmptyState } from "@/components/EmptyState";
import { Loader2 } from "lucide-react";

export default function SavedPage() {
  const [stores, setStores] = useState<StoreCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("fairfind-saved-stores");
    const ids: string[] = stored ? JSON.parse(stored) : [];

    if (ids.length === 0) {
      setLoading(false);
      return;
    }

    fetch("/api/v1/stores?limit=50")
      .then((r) => r.json())
      .then((data) => {
        const saved = (data.stores ?? []).filter((s: StoreCardData) =>
          ids.includes(s.id)
        );
        setStores(saved);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-2">
        <Heart className="h-6 w-6 text-sage" />
        <h1 className="text-2xl font-bold text-earth">Saved stores</h1>
      </div>
      <p className="mt-1 text-sm text-earth/70">
        Stores you&apos;ve bookmarked (saved locally in this prototype)
      </p>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-sage" />
        </div>
      ) : stores.length === 0 ? (
        <EmptyState
          title="No saved stores yet"
          description="Tap the heart icon on any store to save it here."
        />
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-sm text-earth/50">
        <Link href="/explore" className="text-sage hover:underline">
          Discover more stores →
        </Link>
      </p>
    </div>
  );
}
