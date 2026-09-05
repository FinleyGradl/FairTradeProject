// path: src/app/stores/[slug]/error.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StoreDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error loading store detail page:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <AlertTriangle className="mb-4 h-10 w-10 text-red-500 dark:text-red-400" />
      <h1 className="text-2xl font-bold text-earth">Laden konnte nicht geladen werden</h1>
      <p className="mt-2 max-w-sm text-earth/70">
        Beim Laden dieses Ladens ist ein Fehler aufgetreten. Versuch es noch
        einmal oder schau dich in der Zwischenzeit bei anderen Läden um.
      </p>
      <div className="mt-6 flex gap-2">
        <Button onClick={reset}>Erneut versuchen</Button>
        <Link href="/explore">
          <Button variant="outline">Alle Läden ansehen</Button>
        </Link>
      </div>
    </div>
  );
}