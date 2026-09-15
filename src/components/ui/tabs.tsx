"use client";
// path: src/components/ui/tabs.tsx

import type { ComponentType } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: ComponentType<{ className?: string }>;
}

interface TabsProps {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

/** Lightweight, dependency-free tab bar with an optional notification-style
 * count badge per tab — used to break the admin moderation dashboard's
 * long stacked sections up into switchable panels.
 *
 * Below `md` this renders as a dropdown instead of a horizontal scroll
 * row: with 5+ tabs (and German labels like "Änderungsvorschläge") a
 * scroll row on a phone just clips the last tab at the viewport edge
 * with no hint that there's more — a select shows every option at once
 * and switches in one tap. */
export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  const activeTab = tabs.find((tab) => tab.id === active) ?? tabs[0];
  const ActiveIcon = activeTab?.icon;

  return (
    <div className={className}>
      <div className="relative md:hidden">
        {ActiveIcon && (
          <ActiveIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/60" />
        )}
        <select
          aria-label="Bereich auswählen"
          value={activeTab?.id}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full appearance-none rounded-lg border border-sage/20 bg-surface py-2.5 pr-9 text-sm font-medium text-earth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage",
            ActiveIcon ? "pl-9" : "pl-3"
          )}
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
              {!!tab.count && ` (${tab.count})`}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/60" />
      </div>

      <div role="tablist" className="hidden gap-1 overflow-x-auto border-b border-sage/15 md:flex">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={cn(
                "-mb-px flex shrink-0 items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-sage text-earth"
                  : "border-transparent text-earth/50 hover:text-earth/80"
              )}
            >
              {Icon && <Icon className="h-3.5 w-3.5" />}
              {tab.label}
              {!!tab.count && (
                <span
                  className={cn(
                    "inline-flex min-w-[1.25rem] items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-semibold leading-none",
                    isActive ? "bg-sage text-white" : "bg-sage-100 text-sage-700 dark:text-sage-300"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}