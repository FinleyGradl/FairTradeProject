"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Status = "checking" | "success" | "error";

export function VerifyEmailStatus({ token }: { token: string | null }) {
  const [status, setStatus] = useState<Status>(token ? "checking" : "error");
  const [resendEmail, setResendEmail] = useState("");
  const [resendSent, setResendSent] = useState(false);

  useEffect(() => {
    if (!token) return;

    fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => setStatus(res.ok ? "success" : "error"))
      .catch(() => setStatus("error"));
  }, [token]);

  async function handleResend() {
    await fetch("/api/auth/resend-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: resendEmail }),
    });
    setResendSent(true);
  }

  if (status === "checking") {
    return (
      <div className="rounded-xl border border-sage/10 bg-white p-6 text-center">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-sage" />
        <p className="mt-3 text-sm text-earth/70">E-Mail wird bestätigt…</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-sage/10 bg-white p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-sage" />
        <h2 className="mt-3 font-semibold text-earth">E-Mail bestätigt!</h2>
        <p className="mt-1 text-sm text-earth/70">Du kannst dich jetzt anmelden.</p>
        <Link href="/login">
          <Button className="mt-4">Zum Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-sage/10 bg-white p-6 text-center">
      <XCircle className="mx-auto h-10 w-10 text-red-500" />
      <h2 className="mt-3 font-semibold text-earth">Link ungültig oder abgelaufen</h2>
      <p className="mt-1 text-sm text-earth/70">
        Fordere einfach eine neue Bestätigungs-E-Mail an.
      </p>

      {resendSent ? (
        <p className="mt-4 text-sm text-sage">
          Falls das Konto existiert, ist eine neue E-Mail unterwegs.
        </p>
      ) : (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Input
            type="email"
            placeholder="deine@email.de"
            value={resendEmail}
            onChange={(e) => setResendEmail(e.target.value)}
          />
          <Button onClick={handleResend} disabled={!resendEmail}>
            Erneut senden
          </Button>
        </div>
      )}
    </div>
  );
}