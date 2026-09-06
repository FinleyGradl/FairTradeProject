import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = { title: "Passwort zurücksetzen" };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold text-earth">Neues Passwort vergeben</h1>
      <p className="mt-2 text-earth/70">Wähle ein sicheres, neues Passwort für dein Konto.</p>

      <div className="mt-8">
        <Suspense>
          <ResetPasswordForm token={token ?? null} />
        </Suspense>
      </div>
    </div>
  );
}