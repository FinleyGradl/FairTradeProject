"use client";

import { useEffect, useId, useRef, useState } from "react";
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
 *
 * Implements the WAI-ARIA combobox pattern (editable, with listbox popup):
 * the input keeps DOM focus at all times, ArrowUp/ArrowDown move a
 * highlighted `aria-activedescendant` through the results, Enter picks
 * the highlighted one, and Escape/outside-click closes the list.
 */
export function LocationSearch({ onLocation, className }: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const getOptionId = (i: number) => `${listboxId}-option-${i}`;

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  async function search() {
    if (!query.trim()) return;
    setSearching(true);
    setError(null);
    setResults([]);
    setActiveIndex(-1);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=de&q=${encodeURIComponent(
          query
        )}`
      );
      const data: GeocodeResult[] = await res.json();
      if (data.length === 0) {
        setError("Kein Ort gefunden.");
        setOpen(false);
      } else {
        setResults(data);
        setOpen(true);
      }
    } catch {
      setError("Ortssuche momentan nicht erreichbar.");
      setOpen(false);
    } finally {
      setSearching(false);
    }
  }

  function pickResult(result: GeocodeResult) {
    onLocation({ lat: parseFloat(result.lat), lng: parseFloat(result.lon) }, result.display_name);
    setQuery(result.display_name);
    setResults([]);
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (open && activeIndex >= 0 && results[activeIndex]) {
        pickResult(results[activeIndex]);
      } else {
        search();
      }
      return;
    }
    if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        setOpen(false);
        setActiveIndex(-1);
      }
      return;
    }
    if (!open || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    }
  }

  return (
    <div className={`relative ${className ?? ""}`} ref={containerRef}>
      <div className="flex gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/40" aria-hidden="true" />
          <label htmlFor={`${listboxId}-input`} className="sr-only">
            Ort oder Postleitzahl
          </label>
          <Input
            id={`${listboxId}-input`}
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={activeIndex >= 0 ? getOptionId(activeIndex) : undefined}
            autoComplete="off"
            placeholder="Ort oder PLZ suchen…"
            className="w-48 pl-9 sm:w-64"
          />
        </div>
        <Button type="button" variant="secondary" onClick={search} disabled={searching}>
          {searching ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : "Suchen"}
        </Button>
      </div>

      {/* Announces result counts and errors without moving focus. */}
      <div role="status" aria-live="polite" className="sr-only">
        {error
          ? error
          : open && results.length > 0
            ? `${results.length} Ergebnisse gefunden`
            : ""}
      </div>
      {error && <p aria-hidden="true" className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}

      {open && results.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Ortsvorschläge"
          className="absolute z-10 mt-1 w-full min-w-[16rem] overflow-auto rounded-lg border border-sage/20 bg-surface text-sm shadow-lg"
        >
          {results.map((r, i) => (
            <li key={i} id={getOptionId(i)} role="option" aria-selected={i === activeIndex}>
              <button
                type="button"
                tabIndex={-1}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => pickResult(r)}
                className={`block w-full px-3 py-2 text-left text-earth hover:bg-sage-50 ${
                  i === activeIndex ? "bg-sage-50" : ""
                }`}
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
