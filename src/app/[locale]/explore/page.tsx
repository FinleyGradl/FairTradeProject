"use client";

import { useCallback, useEffect, useState } from "react";
import { StoreCard, type StoreCardData } from "@/components/store/StoreCard";
import { StoreMap, LocationPrompt } from "@/components/map/StoreMap";
import { FilterPanel } from "@/components/search/FilterPanel";
import { LocationSearch } from "@/components/search/LocationSearch";
import { EmptyState } from "@/components/EmptyState";
import { DEFAULT_CENTER } from "@/lib/geo";
import { Loader2, List, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ExplorePage() {
  const [stores, setStores] = useState<StoreCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{ lat: number; lng: number }>(DEFAULT_CENTER);
  const [locationLabel, setLocationLabel] = useState<string | null>(null);
  const [radius, setRadius] = useState(100);
  const [category, setCategory] = useState<string>();
  const [badge, setBadge] = useState<string>();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [view, setView] = useState<"split" | "list" | "map">("split");

  const fetchStores = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      lat: String(location.lat),
      lng: String(location.lng),
      radius: String(radius),
      limit: "50",
    });
    if (category) params.set("category", category);
    if (badge) params.set("badge", badge);

    const res = await fetch(`/api/v1/stores?${params}`);
    const data = await res.json();
    setStores(data.stores ?? []);
    setLoading(false);
  }, [location, radius, category, badge]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-earth">Fairtrade-Läden entdecken</h1>
          <p className="text-sm text-earth/70">
            {stores.length} Fairtrade-Läden im Umkreis von {radius} km
            {locationLabel ? ` von ${locationLabel}` : ""}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <LocationSearch
            onLocation={(coords, label) => {
              setLocation(coords);
              setLocationLabel(label.split(",")[0]);
            }}
          />
          <LocationPrompt
            onLocation={(coords) => {
              setLocation(coords);
              setLocationLabel(null);
            }}
          />
          <div className="flex rounded-lg border border-sage/20">
            <Button
              variant={view === "list" || view === "split" ? "default" : "ghost"}
              size="sm"
              className="rounded-r-none"
              onClick={() => setView(view === "split" ? "list" : "split")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "map" ? "default" : "ghost"}
              size="sm"
              className="rounded-l-none"
              onClick={() => setView(view === "split" ? "map" : "split")}
            >
              <Map className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <FilterPanel
            radius={radius}
            selectedCategory={category}
            selectedBadge={badge}
            onRadiusChange={setRadius}
            onCategoryChange={setCategory}
            onBadgeChange={setBadge}
          />
        </aside>

        <div
          className={cn(
            "lg:col-span-3",
            view === "split" && "grid gap-4 lg:grid-cols-5",
            view === "map" && "grid",
            view === "list" && "grid"
          )}
        >
          {(view === "list" || view === "split") && (
            <div
              className={cn(
                "space-y-4 overflow-y-auto",
                view === "split" ? "lg:col-span-2 lg:max-h-[calc(100vh-12rem)]" : ""
              )}
            >
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-sage dark:text-sage-300" />
                </div>
              ) : stores.length === 0 ? (
                <EmptyState />
              ) : (
                stores.map((store) => (
                  <div
                    key={store.id}
                    onMouseEnter={() => setSelectedSlug(store.slug)}
                    onMouseLeave={() => setSelectedSlug(null)}
                  >
                    <StoreCard store={store} />
                  </div>
                ))
              )}
            </div>
          )}

          {(view === "map" || view === "split") && (
            <div
              className={cn(
                "sticky top-20",
                view === "split" ? "lg:col-span-3 lg:h-[calc(100vh-12rem)]" : "h-[calc(100vh-12rem)]"
              )}
            >
              <StoreMap
                stores={stores.map((s) => ({
                  id: s.id,
                  slug: s.slug,
                  name: s.name,
                  latitude: s.latitude,
                  longitude: s.longitude,
                  avgRating: s.avgRating,
                }))}
                center={location}
                userLocation={location}
                selectedSlug={selectedSlug}
                onSelectStore={setSelectedSlug}
                className="h-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}