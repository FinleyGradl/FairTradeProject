// path: src/app/me/stores/page.tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Store as StoreIcon, Pencil, Clock, BarChart3, Megaphone, ArrowRightLeft } from "lucide-react";
import { auth } from "@/auth";
import { getUserStoreOverview } from "@/lib/stores";
import { getIncomingTransfers } from "@/lib/ownership-transfer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/EmptyState";
import { IncomingTransfersList } from "@/components/store/IncomingTransfersList";

const SPONSORSHIP_STATUS_LABEL: Record<string, string> = {
  incomplete: "Zahlung ausstehend",
  active: "Gesponsert",
  past_due: "Zahlung fehlgeschlagen",
};

export const metadata: Metadata = { title: "Meine Läden" };

const STATUS_LABEL: Record<string, string> = {
  pending: "Wartet auf Prüfung",
  active: "Veröffentlicht",
  rejected: "Abgelehnt",
  closed: "Geschlossen",
};

const CLAIM_STATUS_LABEL: Record<string, string> = {
  pending: "In Prüfung",
  approved: "Angenommen",
  rejected: "Abgelehnt",
};

export default async function MyStoresPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/me/stores");
  }

  const { stores, claims } = await getUserStoreOverview(session.user.id);
  const incomingTransfers = await getIncomingTransfers(session.user.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-earth">Meine Läden</h1>
        <Link href="/add-store">
          <Button size="sm">Laden hinzufügen</Button>
        </Link>
      </div>
      <p className="mt-1 text-sm text-earth/70">
        Läden, die du eingereicht hast oder als Inhaber:in verwaltest, sowie deine offenen
        Beanspruchungen.
      </p>

      {incomingTransfers.length > 0 && (
        <>
          <h2 className="mt-8 flex items-center gap-2 text-lg font-semibold text-earth">
            <ArrowRightLeft className="h-5 w-5 text-sage" /> Übertragungsanfragen an dich
          </h2>
          <div className="mt-4">
            <IncomingTransfersList
              transfers={incomingTransfers.map((t) => ({
                token: t.token,
                store: { slug: t.store.slug, name: t.store.name, city: t.store.city },
                fromName: t.fromUser.name ?? t.fromUser.email,
                message: t.message,
                expiresAt: t.expiresAt.toISOString(),
              }))}
            />
          </div>
        </>
      )}

      {stores.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Noch keine Läden"
            description="Füge einen Fair-Handels-Laden hinzu oder beanspruche einen bestehenden Eintrag."
          />
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {stores.map((store) => (
            <div
              key={store.id}
              className="flex items-center gap-3 rounded-xl border border-sage/10 bg-white p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sage-100">
                <StoreIcon className="h-5 w-5 text-sage" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/stores/${store.slug}`} className="font-medium text-earth hover:underline">
                    {store.name}
                  </Link>
                  <Badge variant={store.status === "active" ? "success" : "secondary"}>
                    {STATUS_LABEL[store.status] ?? store.status}
                  </Badge>
                  {store.ownerUserId === session.user.id && (
                    <Badge variant="outline">Inhaber:in</Badge>
                  )}
                  {store.sponsorship && (
                    <Badge variant={store.sponsorship.status === "active" ? "success" : "secondary"}>
                      {SPONSORSHIP_STATUS_LABEL[store.sponsorship.status] ?? store.sponsorship.status}
                    </Badge>
                  )}
                  {store.pendingTransfer && (
                    <Badge variant="outline" className="border-amber-400 text-amber-700">
                      Übertragung ausstehend an{" "}
                      {store.pendingTransfer.toUser.name ?? store.pendingTransfer.toUser.email}
                    </Badge>
                  )}
                </div>
                <p className="truncate text-sm text-earth/60">
                  {store.addressLine}, {store.city}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Link href={`/me/stores/${store.slug}/insights`}>
                  <Button variant="outline" size="sm" className="gap-1">
                    <BarChart3 className="h-3.5 w-3.5" /> Insights
                  </Button>
                </Link>
                {store.ownerUserId === session.user.id && (
                  <Link href={`/me/stores/${store.slug}/sponsoring`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Megaphone className="h-3.5 w-3.5" /> Sponsoring
                    </Button>
                  </Link>
                )}
                <Link href={`/stores/${store.slug}/edit`}>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Pencil className="h-3.5 w-3.5" /> Bearbeiten
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {claims.length > 0 && (
        <>
          <h2 className="mt-10 flex items-center gap-2 text-lg font-semibold text-earth">
            <Clock className="h-5 w-5 text-sage" /> Meine Beanspruchungen
          </h2>
          <div className="mt-4 space-y-3">
            {claims.map((claim) => (
              <div
                key={claim.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-sage/10 bg-white p-4"
              >
                <Link href={`/stores/${claim.store.slug}`} className="font-medium text-earth hover:underline">
                  {claim.store.name}
                </Link>
                <Badge variant={claim.status === "approved" ? "success" : "secondary"}>
                  {CLAIM_STATUS_LABEL[claim.status] ?? claim.status}
                </Badge>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}