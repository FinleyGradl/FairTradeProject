// path: src/app/me/stores/[slug]/sponsoring/page.tsx
import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getActiveSponsorship, canManageSponsorship } from "@/lib/sponsorship";
import { SponsoringPlans } from "@/components/sponsoring/SponsoringPlans";

export const metadata: Metadata = { title: "Sponsoring" };

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function StoreSponsoringPage({ params }: PageProps) {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user) {
    redirect(`/login?callbackUrl=/me/stores/${slug}/sponsoring`);
  }

  const store = await prisma.store.findUnique({ where: { slug } });
  if (!store) notFound();

  if (!(await canManageSponsorship(store, session.user))) {
    redirect(`/stores/${slug}`);
  }

  const sponsorship = await getActiveSponsorship(store.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href={`/stores/${slug}`} className="mb-4 inline-flex items-center gap-1 text-sm text-sage hover:underline">
        <ArrowLeft className="h-3.5 w-3.5" /> Zurück zu {store.name}
      </Link>
      <h1 className="text-2xl font-bold text-earth">Sponsoring für {store.name}</h1>
      <p className="mt-1 text-sm text-earth/70">
        Sponsoring erhöht deine Platzierung in Suche, Kategorien und (ab Plan &bdquo;Plus&ldquo;)
        auf der Startseite. Gesponserte Läden werden für alle Besucher:innen transparent als
        &bdquo;Gesponsert&ldquo; gekennzeichnet. Die Zahlung läuft monatlich über Mollie und ist
        jederzeit kündbar.
      </p>

      <div className="mt-8">
        <SponsoringPlans
          storeSlug={slug}
          initialSponsorship={
            sponsorship
              ? {
                  tier: sponsorship.tier as "basic" | "plus" | "top",
                  status: sponsorship.status as "incomplete" | "active" | "past_due" | "canceled",
                  currentPeriodEnd: sponsorship.currentPeriodEnd?.toISOString() ?? null,
                }
              : null
          }
        />
      </div>
    </div>
  );
}