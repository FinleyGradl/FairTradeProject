"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProfileSchema } from "@/lib/validators/profile";

export function ProfileNameForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const parsed = updateProfileSchema.safeParse({ name });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Ungültige Eingabe.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Speichern fehlgeschlagen.");
      return;
    }

    setSuccess(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-earth">
          Name
        </label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      {success && <p className="text-sm text-sage dark:text-sage-300">Gespeichert.</p>}

      <Button type="submit" size="sm" disabled={loading}>
        {loading ? "Wird gespeichert…" : "Speichern"}
      </Button>
    </form>
  );
}