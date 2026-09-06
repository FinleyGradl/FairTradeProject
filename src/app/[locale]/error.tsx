// path: src/app/error.tsx
"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { AlertTriangle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button"; 
import { cn } from "@/lib/utils";

// Global error boundary. Next.js mounts this in place of the page whenever
// a Server or Client Component further down throws during render — without
// it, the whole app would fall back to the default unstyled Next.js error
// screen. More specific error.tsx files (e.g. stores/[slug]/error.tsx) take
// precedence for their own subtree.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Minimal client-side breadcrumb until real error tracking (e.g. Sentry)
    // is wired up — see TODO in README under "Bekannte Lücken".
    console.error("Unhandled error in route tree:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <AlertTriangle className="h-10 w-10 text-red-500 dark:text-red-400" />
      <div>
        <h1 className="text-xl font-bold text-earth">Da ist etwas schiefgelaufen</h1>
        <p className="mt-2 max-w-md text-sm text-earth/70">
          Diese Seite konnte nicht geladen werden. Das kann an einer kurzzeitigen
          Störung liegen — versuch es einfach noch einmal.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-earth/40">Fehler-ID: {error.digest}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button onClick={reset}>Erneut versuchen</Button>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>Zur Startseite</Link>
      </div>
    </div>
  );
}