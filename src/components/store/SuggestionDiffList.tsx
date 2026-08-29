"use client";
// path: src/components/store/SuggestionDiffList.tsx

import { ArrowRight } from "lucide-react";
import {
  getScalarFieldDiffs,
  getHoursDiffs,
  type SuggestionChanges,
  type CurrentStoreSnapshot,
} from "@/lib/suggestion-diff";

interface SuggestionDiffListProps {
  changes: SuggestionChanges;
  current: CurrentStoreSnapshot;
}

/** Compact before/after list for a single suggestion's changed fields —
 * used in both the owner/admin review queues and the public community-vote
 * widget so a diff always looks the same everywhere. */
export function SuggestionDiffList({ changes, current }: SuggestionDiffListProps) {
  const fieldDiffs = getScalarFieldDiffs(changes, current);
  const hourDiffs = getHoursDiffs(changes, current);

  return (
    <ul className="space-y-1.5 text-sm">
      {fieldDiffs.map((diff) => (
        <li key={diff.field} className="flex flex-wrap items-baseline gap-x-2">
          <span className="w-24 shrink-0 font-medium text-earth/70">{diff.label}</span>
          <span className="text-earth/50 line-through decoration-earth/30">{diff.oldValue}</span>
          <ArrowRight className="h-3 w-3 shrink-0 text-earth/40" />
          <span className="font-medium text-earth">{diff.newValue}</span>
        </li>
      ))}
      {hourDiffs.length > 0 && (
        <li className="flex flex-wrap items-baseline gap-x-2">
          <span className="w-24 shrink-0 font-medium text-earth/70">Öffnungszeiten</span>
          <span className="flex flex-wrap gap-x-3 gap-y-1">
            {hourDiffs.map((d) => (
              <span key={d.dayOfWeek} className="whitespace-nowrap">
                <span className="text-earth/60">{d.dayName}: </span>
                <span className="text-earth/50 line-through decoration-earth/30">{d.oldLabel}</span>
                {" \u2192 "}
                <span className="font-medium text-earth">{d.newLabel}</span>
              </span>
            ))}
          </span>
        </li>
      )}
    </ul>
  );
}
