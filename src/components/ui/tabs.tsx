"use client";
// path: src/components/ui/tabs.tsx

import type { ComponentType } from "react";
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
 * long stacked sections up into switchable panels. */
export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex gap-1 overflow-x-auto border-b border-sage/15",
        className
      )}
    >
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
                  isActive ? "bg-sage text-white" : "bg-sage-100 text-sage-700"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
