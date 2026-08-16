"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEFAULT_CENTER } from "@/lib/geo";

const StoreMapInner = dynamic(() => import("./StoreMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[300px] items-center justify-center bg-sage-50">
      <Loader2 className="h-8 w-8 animate-spin text-sage" />
    </div>
  ),
});

export interface MapStore {
  id: string;
  slug: string;
  name: string;
  latitude: number;
  longitude: number;
  avgRating?: number | null;
}

interface StoreMapProps {
  stores: MapStore[];
  center?: { lat: number; lng: number };
  userLocation?: { lat: number; lng: number } | null;
  selectedSlug?: string | null;
  onSelectStore?: (slug: string) => void;
  className?: string;
}

export function StoreMap(props: StoreMapProps) {
  return <StoreMapInner {...props} />;
}

interface LocationPromptProps {
  onLocation: (coords: { lat: number; lng: number }) => void;
  className?: string;
}

export function LocationPrompt({ onLocation, className }: LocationPromptProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      },
      () => {
        setError("Could not get your location. Showing all of Germany instead.");
        onLocation(DEFAULT_CENTER);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className={className}>
      <Button onClick={requestLocation} disabled={loading} variant="secondary">
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <MapPin className="h-4 w-4" />
        )}
        Use my location
      </Button>
      {error && <p className="mt-2 text-sm text-amber-700">{error}</p>}
    </div>
  );
}

export function useGeolocation(defaultCenter = DEFAULT_CENTER) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (requested || !navigator.geolocation) return;
    setRequested(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setLocation(defaultCenter)
    );
  }, [requested, defaultCenter]);

  return { location, setLocation };
}
