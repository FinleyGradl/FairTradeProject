"use client";

import { useState, FormEvent } from "react";
import { signOut } from "next-auth/react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { deleteAccountSchema } from "@/lib/validators/profile";

interface DeleteAccountSectionProps {
  userEmail: string;
  hasPassword: boolean;
}

export function DeleteAccountSection({ userEmail, hasPassword }: DeleteAccountSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const emailMatches = confirmEmail.trim().toLowerCase() === userEmail.toLowerCase();
  const canSubmit = emailMatches && (!hasPassword || password.length > 0) && !loading;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = deleteAccountSchema.safeParse({
      confirmEmail,
      password: password || undefined,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Ungültige Eingabe.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/profile", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setLoading(false);
      setError(data.error ?? "Löschen fehlgeschlagen.");
      return;
    }

    // Account is gone — end the session locally and leave.
    await signOut({ callbackUrl: "/" });
  }

  return (
    <div className="rounded-xl border border-red-200 bg-red-50/50">
      <div className="p-4">
        <div className="flex items-center gap-2 text-red-700">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <h3 className="text-lg font-semibold">Danger Zone</h3>
        </div>
        <p className="mt-1 text-sm text-earth/70">
          Konto endgültig löschen. Dein Profil, deine Bewertungen, gespeicherten Läden/Produkte
          und dein Profilbild werden unwiderruflich entfernt. Diese Aktion kann nicht rückgängig
          gemacht werden.
        </p>

        {!expanded ? (
          <Button
            type="button"
            variant="destructiveOutline"
            size="sm"
            className="mt-3"
            onClick={() => setExpanded(true)}
          >
            Konto löschen
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3 border-t border-red-200 pt-4">
            {hasPassword && (
              <div>
                <label htmlFor="deletePassword" className="mb-1 block text-sm font-medium text-earth">
                  Passwort
                </label>
                <Input
                  id="deletePassword"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            )}

            <div>
              <label htmlFor="confirmEmail" className="mb-1 block text-sm font-medium text-earth">
                Gib zur Bestätigung <strong>{userEmail}</strong> ein
              </label>
              <Input
                id="confirmEmail"
                type="email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                placeholder={userEmail}
                autoComplete="off"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex gap-2">
              <Button type="submit" variant="destructive" size="sm" disabled={!canSubmit}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Wird gelöscht…
                  </>
                ) : (
                  "Ja, Konto endgültig löschen"
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setExpanded(false);
                  setError(null);
                  setPassword("");
                  setConfirmEmail("");
                }}
                disabled={loading}
              >
                Abbrechen
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}