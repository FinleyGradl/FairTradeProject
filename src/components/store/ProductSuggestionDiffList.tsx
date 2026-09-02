"use client";
// path: src/components/store/ProductSuggestionDiffList.tsx

import { ArrowRight, PlusCircle, Trash2 } from "lucide-react";
import {
  getProductFieldDiffs,
  type ProductSuggestionChanges,
  type CurrentProductSnapshot,
} from "@/lib/product-suggestion-diff";

interface ProductSuggestionDiffListProps {
  type: "create" | "edit" | "delete";
  changes: ProductSuggestionChanges;
  current: CurrentProductSnapshot | null;
  productName?: string | null;
}

export function ProductSuggestionDiffList({
  type,
  changes,
  current,
  productName,
}: ProductSuggestionDiffListProps) {
  if (type === "delete") {
    return (
      <p className="flex items-center gap-2 text-sm text-red-700">
        <Trash2 className="h-3.5 w-3.5 shrink-0" />
        Vorschlag: <span className="font-medium">„{productName}“</span> entfernen
      </p>
    );
  }

  const fieldDiffs = getProductFieldDiffs(changes, current);

  return (
    <div>
      {type === "create" && (
        <p className="mb-1.5 flex items-center gap-2 text-sm font-medium text-sky-700">
          <PlusCircle className="h-3.5 w-3.5 shrink-0" />
          Neues Produkt
        </p>
      )}
      <ul className="space-y-1.5 text-sm">
        {fieldDiffs.map((diff) => (
          <li key={diff.field} className="flex flex-wrap items-baseline gap-x-2">
            <span className="w-24 shrink-0 font-medium text-earth/70">{diff.label}</span>
            {type === "edit" && (
              <>
                <span className="text-earth/50 line-through decoration-earth/30">{diff.oldValue}</span>
                <ArrowRight className="h-3 w-3 shrink-0 text-earth/40" />
              </>
            )}
            <span className="font-medium text-earth">{diff.newValue}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
