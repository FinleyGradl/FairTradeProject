import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { listFlaggedStores, listPendingClaims, canModerate } from "@/lib/stores";
import { parseJsonArray } from "@/lib/utils";
import { FlaggedStoresQueue } from "@/components/moderation/FlaggedStoresQueue";
import { PendingClaimsQueue } from "@/components/moderation/PendingClaimsQueue";

export const metadata: Metadata = { title: "Moderation" };

export default async function ModerationPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/moderation");
  }
  if (!canModerate(session.user)) {
    notFound();
  }

  const [flaggedStores, pendingClaims] = await Promise.all([
    listFlaggedStores(),
    listPendingClaims(),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-earth">Moderation</h1>
      <p className="mt-1 text-sm text-earth/70">
        Läden, die durch Community-Meldungen aus dem Verzeichnis genommen wurden, und offene
        Inhaberschafts-Anfragen.
      </p>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-earth">
          Gemeldete Läden ({flaggedStores.length})
        </h2>
        <FlaggedStoresQueue
          stores={flaggedStores.map((s) => ({
            id: s.id,
            slug: s.slug,
            name: s.name,
            city: s.city,
            confirmCount: s.confirmCount,
            disputeCount: s.disputeCount,
            categories: parseJsonArray(s.categories),
            createdBy: s.createdBy,
            disputes: s.attestations.map((a) => ({
              userName: a.user.name,
              reason: a.reason,
              createdAt: a.createdAt.toISOString(),
            })),
          }))}
        />
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold text-earth">
          Offene Beanspruchungen ({pendingClaims.length})
        </h2>
        <PendingClaimsQueue
          claims={pendingClaims.map((c) => ({
            id: c.id,
            proofText: c.proofText,
            createdAt: c.createdAt.toISOString(),
            store: c.store,
            user: c.user,
          }))}
        />
      </section>
    </div>
  );
}