// path: src/components/auth/LoginForm.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/FormError";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/explore";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      if (result.error === "EMAIL_NOT_VERIFIED") {
        setError(
          "Bitte bestätige zuerst deine E-Mail-Adresse. Prüfe dein Postfach oder fordere den Link erneut an."
        );
      } else if (result.error === "RATE_LIMITED") {
        setError(
          "Zu viele Anmeldeversuche für dieses Konto. Bitte warte ein paar Minuten und versuch es erneut."
        );
      } else {
        setError("E-Mail oder Passwort ist falsch.");
      }
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-earth">
            E-Mail
          </label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={!!error}
            aria-describedby={error ? "login-error" : undefined}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-earth">
              Passwort
            </label>
            <Link href="/forgot-password" className="text-xs text-sage dark:text-sage-300 hover:underline dark:text-sage-300">
              Passwort vergessen?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            aria-invalid={!!error}
            aria-describedby={error ? "login-error" : undefined}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <FormError id="login-error">{error}</FormError>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Anmelden…" : "Anmelden"}
        </Button>
      </form>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-sage/10" />
        <span className="text-xs text-earth/50">oder</span>
        <div className="h-px flex-1 bg-sage/10" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => signIn("google", { callbackUrl })}
      >
        Mit Google anmelden
      </Button>

      <p className="text-center text-sm text-earth/70">
        Noch kein Konto?{" "}
        <Link href="/register" className="font-medium text-sage dark:text-sage-300 hover:underline">
          Jetzt registrieren
        </Link>
      </p>
    </div>
  );
}