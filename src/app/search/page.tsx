"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/search/SearchBar";
import { StoreCard, type StoreCardData } from "@/components/store/StoreCard";
import { ProductCard } from "@/components/store/ProductCard";
import { EmptyState } from "@/components/EmptyState";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "all" | "stores" | "products";

interface ProductResult {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price?: number | null;
  currency: string;
  category?: string | null;
  imageUrl?: string | null;
  inStock: boolean;
  store?: { slug: string; name: string; city: string };
}

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const typeParam = searchParams.get("type") as Tab | null;

  const [tab, setTab] = useState<Tab>(typeParam ?? "all");
  const [stores, setStores] = useState<StoreCardData[]>([]);
  const [products, setProducts] = useState<ProductResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) {
      setStores([]);
      setProducts([]);
      return;
    }

    setLoading(true);
    Promise.all([
      fetch(`/api/v1/stores?q=${encodeURIComponent(q)}&limit=20`).then((r) => r.json()),
      fetch(`/api/v1/products?q=${encodeURIComponent(q)}&limit=20`).then((r) => r.json()),
    ]).then(([storeData, productData]) => {
      setStores(storeData.stores ?? []);
      setProducts(productData.products ?? []);
      setLoading(false);
    });
  }, [q]);

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "all", label: "All", count: stores.length + products.length },
    { id: "stores", label: "Stores", count: stores.length },
    { id: "products", label: "Products", count: products.length },
  ];

  const showStores = tab === "all" || tab === "stores";
  const showProducts = tab === "all" || tab === "products";

  return (
    <>
      {q && (
        <>
          <div className="mt-6 flex gap-2 border-b border-sage/10">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "border-b-2 px-4 py-2 text-sm font-medium transition-colors",
                  tab === t.id
                    ? "border-sage text-sage"
                    : "border-transparent text-earth/60 hover:text-earth"
                )}
              >
                {t.label} ({t.count})
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-sage" />
            </div>
          ) : stores.length === 0 && products.length === 0 ? (
            <EmptyState description={`No results for "${q}". Try a different search term.`} />
          ) : (
            <div className="mt-6 space-y-8">
              {showStores && stores.length > 0 && (
                <section>
                  {tab === "all" && (
                    <h2 className="mb-4 text-lg font-semibold text-earth">Stores</h2>
                  )}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {stores.map((store) => (
                      <StoreCard key={store.id} store={store} />
                    ))}
                  </div>
                </section>
              )}
              {showProducts && products.length > 0 && (
                <section>
                  {tab === "all" && (
                    <h2 className="mb-4 text-lg font-semibold text-earth">Products</h2>
                  )}
                  <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </>
      )}

      {!q && (
        <p className="mt-8 text-center text-earth/60">
          Search for stores, products, or cities across the fair-trade directory.
        </p>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-earth">Search</h1>
      <SearchBar className="mt-4" />
      <Suspense fallback={<div className="py-12 text-center text-earth/60">Loading…</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
