import type { Metadata } from "next";
import { VerifyEmailStatus } from "@/components/auth/VerifyEmailStatus";

export const metadata: Metadata = { title: "E-Mail bestätigen" };

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold text-earth">E-Mail-Bestätigung</h1>

      <div className="mt-8">
        <VerifyEmailStatus token={token ?? null} />
      </div>
    </div>
  );
}