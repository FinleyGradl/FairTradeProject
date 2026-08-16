"use client";

import { useState, FormEvent } from "react";
import { MailCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { changeEmailSchema } from "@/lib/validators/profile";

export function ChangeEmailForm({ hasPassword, currentEmail }: { hasPassword: boolean; currentEmail: string }) {
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = changeEmailSchema.safeParse({
      newEmail,
      currentPassword: currentPassword || undefined,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Ungültige Eingabe.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/profile/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Fehlgeschlagen.");
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex items-start gap-3 rounded-lg bg-sage-50 p-4 text-sm text-earth">
        <MailCheck className="mt-0.5 h-5 w-5 shrink-0 text-sage" />
        <p>
          Bestätigungslink an <strong>{newEmail}</strong> gesendet. Deine E-Mail-Adresse ändert
          sich erst, sobald du den Link angeklickt hast.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm text-earth/60">Aktuell: {currentEmail}</p>

      <div>
        <label htmlFor="newEmail" className="mb-1 block text-sm font-medium text-earth">
          Neue E-Mail-Adresse
        </label>
        <Input
          id="newEmail"
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </div>

      {hasPassword && (
        <div>
          <label htmlFor="currentPasswordEmail" className="mb-1 block text-sm font-medium text-earth">
            Aktuelles Passwort
          </label>
          <Input
            id="currentPasswordEmail"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" size="sm" disabled={loading}>
        {loading ? "Wird gesendet…" : "Bestätigungslink senden"}
      </Button>
    </form>
  );
}