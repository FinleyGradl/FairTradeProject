"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useMenuA11y } from "@/lib/a11y";
import { cn } from "@/lib/utils";
import type { Theme } from "@/lib/theme";

const OPTIONS: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Hell", icon: Sun },
  { value: "dark", label: "Dunkel", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

/**
 * A button that opens a small menu with the three theme options. Built by
 * hand (not a generic dropdown) so we control the exact ARIA wiring:
 * button has aria-haspopup/aria-expanded, the menu is a native
 * role="menu" with roving arrow-key navigation (ArrowUp/Down, Home/End),
 * closes and returns focus on Escape, and auto-closes if focus tabs out
 * of it — the full WAI-ARIA menu-button pattern.
 */
export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = () => setOpen(false);
  const { handleBlur } = useMenuA11y({ menuRef, isOpen: open, onClose: close });

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        containerRef.current?.querySelector("button")?.focus();
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const CurrentIcon = OPTIONS.find((o) => o.value === theme)?.icon ?? Monitor;

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Farbschema ändern (aktuell: ${OPTIONS.find((o) => o.value === theme)?.label}, angezeigt: ${resolvedTheme === "dark" ? "dunkel" : "hell"})`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-earth transition-colors hover:bg-sage-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
      >
        <CurrentIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Farbschema auswählen"
          onBlur={handleBlur}
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-lg border border-sage/10 bg-surface py-1 shadow-lg"
        >
          {OPTIONS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              role="menuitemradio"
              tabIndex={-1}
              aria-checked={theme === value}
              onClick={() => {
                setTheme(value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2 text-sm text-earth transition-colors hover:bg-sage-50 focus-visible:outline-none focus:bg-sage-50",
                theme === value && "font-medium text-sage dark:text-sage-300"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
