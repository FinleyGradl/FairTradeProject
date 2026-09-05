import { useEffect, useRef } from "react";

/**
 * Wires up the two keyboard/focus behaviors every custom modal needs
 * (WCAG 2.1.2 No Keyboard Trap / 2.4.3 Focus Order):
 *  - Escape closes it
 *  - focus returns to the element that had it before the modal opened
 *
 * The panel itself still needs `role="dialog" aria-modal="true"` and an
 * `aria-label`/`aria-labelledby`, and ideally a ref to autofocus its
 * first focusable element — this hook only handles open/close plumbing.
 */
export function useDialogA11y(isOpen: boolean, onClose: () => void) {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen, onClose]);
}
