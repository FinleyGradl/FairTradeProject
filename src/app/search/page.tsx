"use client";

import { Suspense, useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SearchBar } from "@/components/search/SearchBar";
import { StoreCard, type StoreCardData } from "@/components/store/StoreCard";
import { ProductCard } from "@/components/store/ProductCard";
import { FilterPanel } from "@/components/search/FilterPanel";
import { LocationSearch } from "@/components/search/LocationSearch";
import { StoreMap } from "@/components/map/StoreMap";
import { EmptyState } from "@/components/EmptyState";
import { Loader2, Map as MapIcon, List as ListIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_CENTER } from "@/lib/geo";

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
  store?: { slug: string; name: string; city: string; latitude: number; longitude: number };
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const q = searchParams.get("q") ?? "";
  const typeParam = searchParams.get("type") as Tab | null;
  
  // URL params mapped to state (for initial load)
  const initialCat = searchParams.get("category") ?? undefined;
  const initialBadge = searchParams.get("badge") ?? undefined;
  const initialRadius = Number(searchParams.get("radius")) || 50;
  
  const initialLat = searchParams.has("lat") ? Number(searchParams.get("lat")) : undefined;
  const initialLng = searchParams.has("lng") ? Number(searchParams.get("lng")) : undefined;

  const [tab, setTab] = useState<Tab>(typeParam ?? "all");
  const [stores, setStores] = useState<StoreCardData[]>([]);
  const [products, setProducts] = useState<ProductResult[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Filter states
  const [category, setCategory] = useState<string | undefined>(initialCat);
  const [badge, setBadge] = useState<string | undefined>(initialBadge);
  const [radius, setRadius] = useState<number>(initialRadius);
  const [center, setCenter] = useState<{ lat: number; lng: number } | undefined>(
    initialLat && initialLng ? { lat: initialLat, lng: initialLng } : undefined
  );
  
  // Interactive Map states
  const [selectedStoreSlug, setSelectedStoreSlug] = useState<string | null>(null);
  const [showMobileMap, setShowMobileMap] = useState(false);

  // Sync state to URL 
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) params.set("category", category);
    else params.delete("category");
    
    if (badge) params.set("badge", badge);
    else params.delete("badge");
    
    params.set("radius", radius.toString());
    
    if (center) {
      params.set("lat", center.lat.toString());
      params.set("lng", center.lng.toString());
    } else {
      params.delete("lat");
      params.delete("lng");
    }
    
    // Use replace to avoid filling history with filter tweaks
    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [category, badge, radius, center, router, searchParams]);

  // Fetch results
  useEffect(() => {
    let active = true;
    setLoading(true);
    
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (badge) params.set("badge", badge);
    params.set("radius", radius.toString());
    params.set("limit", "50");
    
    if (center) {
      params.set("lat", center.lat.toString());
      params.set("lng", center.lng.toString());
    }

    Promise.all([
      fetch(`/api/v1/stores?${params.toString()}`).then((r) => r.json()),
      fetch(`/api/v1/products?${params.toString()}`).then((r) => r.json()),
    ]).then(([storeData, productData]) => {
      if (!active) return;
      setStores(storeData.stores ?? []);
      setProducts(productData.products ?? []);
      setLoading(false);
    });

    return () => { active = false; };
  }, [q, category, badge, radius, center]);

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "all", label: "All", count: stores.length + products.length },
    { id: "stores", label: "Stores", count: stores.length },
    { id: "products", label: "Products", count: products.length },
  ];

  const showStores = tab === "all" || tab === "stores";
  const showProducts = tab === "all" || tab === "products";

  // Map stores that are valid to show on the map (must have lat/lng)
  const mapStores = stores
    .filter(s => s.latitude && s.longitude)
    .map(s => ({
      id: s.id,
      slug: s.slug,
      name: s.name,
      latitude: s.latitude,
      longitude: s.longitude,
      avgRating: s.avgRating
    }));

  const handleSelectStore = useCallback((slug: string) => {
    setSelectedStoreSlug(slug);
    // Scroll to the card
    const el = document.getElementById(`store-card-${slug}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-2", "ring-sage", "ring-offset-2", "transition-all");
      setTimeout(() => {
        el.classList.remove("ring-2", "ring-sage", "ring-offset-2");
      }, 1500);
    }
  }, []);
  
  const handleCardClick = useCallback((slug: string) => {
    setSelectedStoreSlug(slug);
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col md:flex-row overflow-hidden">
      {/* Left panel: Search, Filters, Results */}
      <div className={cn(
        "w-full md:w-1/2 lg:w-7/12 flex-1 flex flex-col overflow-y-auto bg-white transition-transform",
        showMobileMap ? "hidden md:flex" : "flex"
      )}>
        <div className="p-4 md:p-6 pb-24 md:pb-6 space-y-6">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-earth hidden md:block">Search</h1>
            <SearchBar defaultValue={q} />
            <LocationSearch onLocation={(coords) => setCenter(coords)} />
          </div>

          <div className="rounded-xl border border-sage/20 bg-sage-50/50 p-4">
            <h2 className="mb-3 font-semibold text-earth">Filters</h2>
            <FilterPanel 
              selectedCategory={category}
              selectedBadge={badge}
              radius={radius}
              onCategoryChange={setCategory}
              onBadgeChange={setBadge}
              onRadiusChange={setRadius}
            />
          </div>

          <div className="flex gap-2 border-b border-sage/10 overflow-x-auto pb-1 hide-scrollbar">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "border-b-2 px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
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
            <EmptyState description="No results found. Try adjusting your filters or search in a different area." />
          ) : (
            <div className="space-y-8">
              {showStores && stores.length > 0 && (
                <section>
                  {tab === "all" && (
                    <h2 className="mb-4 text-lg font-semibold text-earth">Stores</h2>
                  )}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {stores.map((store) => (
                      <div 
                        id={`store-card-${store.slug}`} 
                        key={store.id} 
                        onClick={() => handleCardClick(store.slug)}
                        className="cursor-pointer rounded-xl"
                      >
                        <StoreCard store={store} />
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {showProducts && products.length > 0 && (
                <section>
                  {tab === "all" && (
                    <h2 className="mb-4 text-lg font-semibold text-earth">Products</h2>
                  )}
                  <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right panel: Map */}
      <div className={cn(
        "w-full h-[calc(100vh-4rem)] md:h-auto md:w-1/2 lg:w-5/12 border-l border-sage/10 relative",
        showMobileMap ? "block fixed inset-0 z-50 pt-16 bg-white" : "hidden md:block"
      )}>
        {showMobileMap && (
          <button 
            onClick={() => setShowMobileMap(false)}
            className="absolute top-4 right-4 z-[60] bg-white rounded-full p-2 shadow-md"
          >
            <X className="h-5 w-5 text-earth" />
          </button>
        )}
        <StoreMap 
          stores={mapStores} 
          center={center ?? DEFAULT_CENTER}
          selectedSlug={selectedStoreSlug}
          onSelectStore={handleSelectStore}
          className="h-full w-full"
        />
      </div>

      {/* Mobile Map Toggle FAB */}
      <button
        onClick={() => setShowMobileMap(!showMobileMap)}
        className="md:hidden fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-full bg-sage px-4 py-3 text-white shadow-lg font-medium"
      >
        {showMobileMap ? (
          <>
            <ListIcon className="h-5 w-5" />
            <span>List</span>
          </>
        ) : (
          <>
            <MapIcon className="h-5 w-5" />
            <span>Map</span>
          </>
        )}
      </button>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="w-full h-full bg-white">
      <Suspense fallback={<div className="flex h-[calc(100vh-4rem)] items-center justify-center text-earth/60"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
