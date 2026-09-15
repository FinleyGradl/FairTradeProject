// path: src/components/store/RemoveVerificationButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { ShieldOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RemoveVerificationButton({ storeId }: { storeId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (!window.confirm("Admin-Verifizierung für diesen Laden wirklich entfernen?")) {
      return;
    }
    setError(null);
    setLoading(true);
    const res = await fetch(`/api/admin/moderation/stores/${storeId}/unverify`, {
      method: "POST",
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Das hat nicht geklappt.");
      return;
    }

    router.refresh();
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        type="button"
        variant="destructiveOutline"
        size="sm"
        onClick={handleClick}
        disabled={loading}
        className="gap-1"
      >
        {loading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <ShieldOff className="h-3.5 w-3.5" />
        )}
        Verifizierung entfernen
      </Button>
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}