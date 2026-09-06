import { cn } from "@/lib/utils";

/**
 * Use for form-level or field-level error text. role="alert" makes screen
 * readers announce it the moment it appears, without the user needing to
 * move focus there (WCAG 4.1.3 Status Messages). Give it an `id` and wire
 * the related input's `aria-describedby` to that id so the association is
 * also exposed programmatically, not just visually.
 */
export function FormError({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (!children) return null;
  return (
    <p
      id={id}
      role="alert"
      className={cn(
        "rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400",
        className
      )}
    >
      {children}
    </p>
  );
}
