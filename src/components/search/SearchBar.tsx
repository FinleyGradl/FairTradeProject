"use client";

import { useRouter } from "@/i18n/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormEvent, useId, useState } from "react";

interface SearchBarProps {
  defaultValue?: string;
  placeholder?: string;
  action?: string;
  className?: string;
}

export function SearchBar({
  defaultValue = "",
  placeholder = "Läden, Produkte, Orte suchen…",
  action = "/search",
  className,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);
  const inputId = useId();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`${action}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className={className} role="search">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/40" aria-hidden="true" />
        <label htmlFor={inputId} className="sr-only">
          Suche
        </label>
        <Input
          id={inputId}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10"
        />
      </div>
    </form>
  );
}
