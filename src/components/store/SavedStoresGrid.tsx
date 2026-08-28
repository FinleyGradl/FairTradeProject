// path: src/components/store/SavedStoresGrid.tsx
"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { StoreCard, type StoreCardData } from "./StoreCard";

export function SavedStoresGrid({ initialStores }: { initialStores: StoreCardData[] }) {
  const [stores, setStores] = useState(initialStores);

  async function unsave(slug: string, id: string) {
    setStores((prev) => prev.filter((s) => s.id !== id));
    try {
      const res = await fetch(`/api/v1/stores/${slug}/save`, { method: "DELETE" });
      if (!res.ok) throw new Error();
    } catch {
      // Re-fetch is overkill here — worst case the store reappears after a
      // page reload if this failed, which is an acceptable fallback.
    }
  }

  if (stores.length === 0) return null;

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2">
      {stores.map((store) => (
        <div key={store.id} className="relative">
          <StoreCard store={store} />
          <button
            onClick={() => unsave(store.slug, store.id)}
            aria-label="Von der Merkliste entfernen"
            title="Von der Merkliste entfernen"
            className="absolute -right-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-red-200 bg-white text-red-500 shadow-sm hover:bg-red-50"
          >
            <Heart className="h-4 w-4 fill-current" />
          </button>
        </div>
      ))}
    </div>
  );
}