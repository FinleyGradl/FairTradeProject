"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { MailCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-sage/10 bg-white p-6 text-center">
        <MailCheck className="mx-auto h-10 w-10 text-sage" />
        <h2 className="mt-3 font-semibold text-earth">E-Mail unterwegs</h2>
        <p className="mt-1 text-sm text-earth/70">
          Falls für <strong>{email}</strong> ein Konto existiert, erhältst du in Kürze einen
          Link zum Zurücksetzen deines Passworts.
        </p>
      </div>
    );
  }

  return (
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Wird gesendet…" : "Link zum Zurücksetzen senden"}
      </Button>

      <p className="text-center text-sm text-earth/70">
        <Link href="/login" className="font-medium text-sage hover:underline">
          Zurück zum Login
        </Link>
      </p>
    </form>
  );
}