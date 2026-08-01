"use client";

import { CATEGORIES, FAIR_BADGE_LABELS } from "@/lib/stores";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FilterPanelProps {
  selectedCategory?: string;
  selectedBadge?: string;
  radius: number;
  onCategoryChange: (category: string | undefined) => void;
  onBadgeChange: (badge: string | undefined) => void;
  onRadiusChange: (radius: number) => void;
  className?: string;
}

export function FilterPanel({
  selectedCategory,
  selectedBadge,
  radius,
  onCategoryChange,
  onBadgeChange,
  onRadiusChange,
  className,
}: FilterPanelProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <label className="mb-2 block text-sm font-medium text-earth">
          Radius: {radius} km
        </label>
        <input
          type="range"
          min={1}
          max={50}
          value={radius}
          onChange={(e) => onRadiusChange(Number(e.target.value))}
          className="w-full accent-sage"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-earth">Category</p>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() =>
                onCategoryChange(selectedCategory === cat ? undefined : cat)
              }
            >
              <Badge
                variant={selectedCategory === cat ? "default" : "outline"}
                className="cursor-pointer"
              >
                {cat}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-earth">Fair-trade badges</p>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(FAIR_BADGE_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => onBadgeChange(selectedBadge === key ? undefined : key)}
            >
              <Badge
                variant={selectedBadge === key ? "default" : "outline"}
                className="cursor-pointer"
              >
                {label}
              </Badge>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
