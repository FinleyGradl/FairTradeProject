// path: src/components/analytics/PageViewTracker.tsx
"use client";

import { useEffect } from "react";

/**
 * Fires once when a store detail page mounts. Uses sendBeacon where
 * available so the request survives the user navigating away immediately.
 * See app/api/v1/track/route.ts + lib/analytics.ts for how this is recorded
 * (no cookies, no persistent visitor id — see Datenschutzerklärung).
 */
export function PageViewTracker({ storeId, path }: { storeId: string; path: string }) {
  useEffect(() => {
    const payload = JSON.stringify({ storeId, path });

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/v1/track", blob);
    } else {
      fetch("/api/v1/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
    // Intentionally only on mount — one view per page load, not per re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}