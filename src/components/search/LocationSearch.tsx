"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GeocodeResult {
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationSearchProps {
  onLocation: (coords: { lat: number; lng: number }, label: string) => void;
  className?: string;
}

/**
 * Text search for a city/address, reusing the same Nominatim (OpenStreetMap)
 * geocoder already used in the "add store" location picker. Results are
 * biased to Germany since this is a nationwide directory, not scoped to
 * one city.
 */
export function LocationSearch({ onLocation, className }: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  async function search() {
    if (!query.trim()) return;
    setSearching(true);
    setError(null);
    setResults([]);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=de&q=${encodeURIComponent(
          query
        )}`
      );
      const data: GeocodeResult[] = await res.json();
      if (data.length === 0) {
        setError("Kein Ort gefunden.");
      } else {
        setResults(data);
        setOpen(true);
      }
    } catch {
      setError("Ortssuche momentan nicht erreichbar.");
    } finally {
      setSearching(false);
    }
  }

  function pickResult(result: GeocodeResult) {
    onLocation({ lat: parseFloat(result.lat), lng: parseFloat(result.lon) }, result.display_name);
    setQuery(result.display_name);
    setResults([]);
    setOpen(false);
  }

  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="flex gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/40" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                search();
              }
            }}
            placeholder="Ort oder PLZ suchen…"
            className="w-48 pl-9 sm:w-64"
          />
        </div>
        <Button type="button" variant="secondary" onClick={search} disabled={searching}>
          {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Suchen"}
        </Button>
      </div>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

      {open && results.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full min-w-[16rem] overflow-auto rounded-lg border border-sage/20 bg-white text-sm shadow-lg">
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
    </div>
  );
}