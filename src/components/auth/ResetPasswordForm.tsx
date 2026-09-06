"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/FormError";
import { passwordSchema } from "@/lib/validators/auth";

export function ResetPasswordForm({ token }: { token: string | null }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Der Link ist ungültig. Bitte fordere einen neuen an.");
      return;
    }

    const parsed = passwordSchema.safeParse(password);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Ungültiges Passwort.");
      return;
    }
    if (password !== confirm) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Zurücksetzen fehlgeschlagen.");
      return;
    }

    setDone(true);
    setTimeout(() => router.push("/login"), 2000);
  }

  if (done) {
    return (
      <div role="status" aria-live="polite" className="rounded-xl border border-sage/10 bg-surface p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-sage dark:text-sage-300" aria-hidden="true" />
        <h2 className="mt-3 font-semibold text-earth">Passwort geändert</h2>
        <p className="mt-1 text-sm text-earth/70">Du wirst zum Login weitergeleitet…</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div role="alert" className="rounded-xl border border-red-100 bg-red-50 p-6 text-center text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400">
        Der Link ist ungültig oder unvollständig. Bitte fordere einen neuen Link an.
        <div className="mt-3">
          <Link href="/forgot-password" className="font-medium text-sage dark:text-sage-300 hover:underline">
            Neuen Link anfordern
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-earth">
          Neues Passwort
        </label>
        <Input
          id="password"
          type="password"
          required
          autoComplete="new-password"
          aria-invalid={!!error}
          aria-describedby={error ? "reset-error" : undefined}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="confirm" className="mb-1 block text-sm font-medium text-earth">
          Passwort bestätigen
        </label>
        <Input
          id="confirm"
          type="password"
          required
          autoComplete="new-password"
          aria-invalid={!!error}
          aria-describedby={error ? "reset-error" : undefined}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>

      <FormError id="reset-error">{error}</FormError>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Wird gespeichert…" : "Passwort speichern"}
      </Button>
    </form>
  );
}