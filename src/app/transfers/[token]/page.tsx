// path: src/app/transfers/[token]/page.tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShieldAlert, Store as StoreIcon } from "lucide-react";
import { auth } from "@/auth";
import { getTransferByToken } from "@/lib/ownership-transfer";
import { TransferResponseCard } from "@/components/store/TransferResponseCard";

export const metadata: Metadata = { title: "Übertragungsanfrage" };

const STATUS_MESSAGE: Record<string, string> = {
  accepted: "Diese Einladung wurde bereits angenommen.",
  declined: "Diese Einladung wurde bereits abgelehnt.",
  canceled: "Diese Einladung wurde storniert.",
  expired: "Diese Einladung ist abgelaufen.",
};

export default async function TransferPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect(`/login?callbackUrl=/transfers/${token}`);
  }

  const transfer = await getTransferByToken(token);

  if (!transfer) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <ShieldAlert className="mx-auto h-10 w-10 text-amber-500" />
        <h1 className="mt-4 text-xl font-bold text-earth">Einladung nicht gefunden</h1>
        <p className="mt-2 text-earth/70">
          Dieser Link ist ungültig oder die Einladung existiert nicht mehr.
        </p>
      </div>
    );
  }

  if (transfer.toUserId !== session.user.id) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <ShieldAlert className="mx-auto h-10 w-10 text-amber-500" />
        <h1 className="mt-4 text-xl font-bold text-earth">Nicht für dich bestimmt</h1>
        <p className="mt-2 text-earth/70">
          Diese Übertragungsanfrage ist an eine andere E-Mail-Adresse gerichtet. Melde dich mit
          dem passenden Konto an, um sie zu beantworten.
        </p>
      </div>
    );
  }

  if (transfer.status !== "pending") {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <StoreIcon className="mx-auto h-10 w-10 text-sage" />
        <h1 className="mt-4 text-xl font-bold text-earth">{transfer.store.name}</h1>
        <p className="mt-2 text-earth/70">
          {STATUS_MESSAGE[transfer.status] ?? "Diese Einladung ist nicht mehr aktiv."}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <TransferResponseCard
        token={token}
        store={transfer.store}
        fromName={transfer.fromUser.name ?? transfer.fromUser.email}
        message={transfer.message}
        expiresAt={transfer.expiresAt.toISOString()}
      />
    </div>
  );
}