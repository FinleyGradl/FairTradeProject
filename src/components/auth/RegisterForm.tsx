"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/FormError";
import { registerSchema } from "@/lib/validators/auth";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setErrors({});

    const parsed = registerSchema.safeParse({ name, email, password });
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setFormError(data.error ?? "Registrierung fehlgeschlagen.");
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <div role="status" aria-live="polite" className="rounded-xl border border-sage/10 bg-surface p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-sage dark:text-sage-300" aria-hidden="true" />
        <h2 className="mt-3 font-semibold text-earth">Fast geschafft!</h2>
        <p className="mt-1 text-sm text-earth/70">
          Wir haben dir eine Bestätigungs-E-Mail an <strong>{email}</strong> geschickt. Klicke
          auf den Link darin, um dein Konto zu aktivieren.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-earth">
            Name
          </label>
          <Input
            id="name"
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-earth">
            E-Mail
          </label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-earth">
            Passwort
          </label>
          <Input
            id="password"
            type="password"
            required
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : "password-hint"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password ? (
            <p id="password-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
              {errors.password[0]}
            </p>
          ) : (
            <p id="password-hint" className="mt-1 text-xs text-earth/50">
              Mind. 8 Zeichen, Groß- &amp; Kleinbuchstaben und eine Zahl.
            </p>
          )}
        </div>

        <FormError>{formError}</FormError>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Konto wird erstellt…" : "Konto erstellen"}
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
        onClick={() => signIn("google", { callbackUrl: "/explore" })}
      >
        Mit Google registrieren
      </Button>

      <p className="text-center text-sm text-earth/70">
        Schon ein Konto?{" "}
        <Link href="/login" className="font-medium text-sage dark:text-sage-300 hover:underline">
          Anmelden
        </Link>
      </p>
    </div>
  );
}