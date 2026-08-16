"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { changePasswordSchema } from "@/lib/validators/profile";

export function ChangePasswordForm({ hasPassword }: { hasPassword: boolean }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword !== confirm) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }

    const parsed = changePasswordSchema.safeParse({
      currentPassword: currentPassword || undefined,
      newPassword,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Ungültige Eingabe.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/profile/password", {
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

    setSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirm("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {!hasPassword && (
        <p className="text-sm text-earth/60">
          Dein Konto hat noch kein Passwort (du hast dich mit Google angemeldet). Hier kannst du
          eines vergeben, um dich künftig auch mit E-Mail &amp; Passwort einzuloggen.
        </p>
      )}

      {hasPassword && (
        <div>
          <label htmlFor="currentPassword" className="mb-1 block text-sm font-medium text-earth">
            Aktuelles Passwort
          </label>
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
      )}

      <div>
        <label htmlFor="newPassword" className="mb-1 block text-sm font-medium text-earth">
          Neues Passwort
        </label>
        <Input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-earth">
          Neues Passwort bestätigen
        </label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && (
        <p className="flex items-center gap-1 text-sm text-sage">
          <CheckCircle2 className="h-4 w-4" /> Passwort gespeichert.
        </p>
      )}

      <Button type="submit" size="sm" disabled={loading}>
        {loading ? "Wird gespeichert…" : hasPassword ? "Passwort ändern" : "Passwort festlegen"}
      </Button>
    </form>
  );
}