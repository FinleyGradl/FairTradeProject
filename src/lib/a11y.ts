import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Wires up the three keyboard/focus behaviors every custom modal needs
 * (WCAG 2.1.2 No Keyboard Trap / 2.4.3 Focus Order):
 *  - Escape closes it
 *  - Tab/Shift+Tab is trapped inside the dialog panel (can't tab out
 *    into the page behind the overlay while it's open)
 *  - focus returns to the element that had it before the modal opened
 *
 * Pass a ref to the dialog panel element (the one with
 * `role="dialog" aria-modal="true"`) so the trap knows its boundaries.
 */
export function useDialogA11y(
  isOpen: boolean,
  onClose: () => void,
  panelRef?: React.RefObject<HTMLElement | null>
) {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef?.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (!panelRef.current.contains(active)) {
        // Focus somehow ended up outside the panel — pull it back in.
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen, onClose, panelRef]);
}

export interface MenuA11yOptions {
  /** Ref to the element with role="menu" (the panel that lists the items). */
  menuRef: React.RefObject<HTMLElement | null>;
  isOpen: boolean;
  onClose: () => void;
  /** Selector for the individual menu items inside menuRef. Defaults to [role="menuitem"]. */
  itemSelector?: string;
}

/**
 * Full WAI-ARIA menu-button keyboard behavior for a custom dropdown menu
 * (role="menu" + role="menuitem"/"menuitemradio" children):
 *  - ArrowDown/ArrowUp move focus between items (wrapping at the ends)
 *  - Home/End jump to the first/last item
 *  - Focus moves into the menu (first item, or the checked item for a
 *    radio-style menu) as soon as it opens
 *  - Tabbing out of the menu closes it, instead of leaving it open while
 *    focus continues into the rest of the page
 *
 * Escape-to-close and click-outside-to-close are left to the caller,
 * since those are already commonly wired up per-component.
 */
export function useMenuA11y({
  menuRef,
  isOpen,
  onClose,
  itemSelector = '[role="menuitem"], [role="menuitemradio"]',
}: MenuA11yOptions) {
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const items = () =>
      Array.from(menuRef.current!.querySelectorAll<HTMLElement>(itemSelector));

    const initial =
      items().find((el) => el.getAttribute("aria-checked") === "true") ?? items()[0];
    initial?.focus();

    function onKeyDown(e: KeyboardEvent) {
      const els = items();
      if (els.length === 0) return;
      const currentIndex = els.indexOf(document.activeElement as HTMLElement);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        els[(currentIndex + 1 + els.length) % els.length]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        els[(currentIndex - 1 + els.length) % els.length]?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        els[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        els[els.length - 1]?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, menuRef, itemSelector]);

  // Tabbing out of the menu should close it rather than leave it open.
  function handleBlur(e: React.FocusEvent) {
    if (!menuRef.current?.contains(e.relatedTarget as Node | null)) {
      onClose();
    }
  }

  return { handleBlur };
}
