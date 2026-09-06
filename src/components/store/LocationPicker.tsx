"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Loader2, Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DEFAULT_CENTER } from "@/lib/geo";

const LocationPickerInner = dynamic(() => import("./LocationPickerInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[280px] items-center justify-center rounded-xl bg-sage-50">
      <Loader2 className="h-8 w-8 animate-spin text-sage dark:text-sage-300" />
    </div>
  ),
});

interface GeocodeResult {
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationPickerProps {
  value: { lat: number; lng: number };
  onChange: (pos: { lat: number; lng: number }) => void;
  className?: string;
}

export function LocationPicker({ value, onChange, className }: LocationPickerProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [locating, setLocating] = useState(false);
  const [flyTrigger, setFlyTrigger] = useState(0);

  async function search() {
    if (!query.trim()) return;
    setSearching(true);
    setResults([]);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(query)}`
      );
      const data: GeocodeResult[] = await res.json();
      setResults(data);
    } catch {
      // Nominatim can rate-limit or be unreachable — the person can still
      // place the pin manually, so this fails silently rather than
      // blocking the form.
    } finally {
      setSearching(false);
    }
  }

  function pickResult(result: GeocodeResult) {
    onChange({ lat: parseFloat(result.lat), lng: parseFloat(result.lon) });
    setResults([]);
    setQuery(result.display_name);
    setFlyTrigger((t) => t + 1);
  }

  function useMyLocation() {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setFlyTrigger((t) => t + 1);
        setLocating(false);
      },
      () => {
        onChange(DEFAULT_CENTER);
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  return (
    <div className={className}>
      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              search();
            }
          }}
          placeholder="Adresse suchen…"
        />
        <Button type="button" variant="secondary" onClick={search} disabled={searching}>
          {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
        <Button type="button" variant="outline" onClick={useMyLocation} disabled={locating}>
          {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
        </Button>
      </div>

      {results.length > 0 && (
        <ul className="mt-2 max-h-48 overflow-auto rounded-lg border border-sage/20 bg-surface text-sm shadow-sm">
          {results.map((r, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => pickResult(r)}
                className="block w-full px-3 py-2 text-left text-earth hover:bg-sage-50"
              >
                {r.display_name}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 h-64">
        <LocationPickerInner position={value} onChange={onChange} flyToTrigger={flyTrigger} />
      </div>
      <p className="mt-2 text-xs text-earth/60">
        Klicke auf die Karte oder ziehe den Pin, um die genaue Position zu setzen.
      </p>
      <p className="mt-1 text-xs text-earth/50">
        {value.lat.toFixed(5)}, {value.lng.toFixed(5)}
      </p>
    </div>
  );
}