// path: src/app/me/stores/[slug]/sponsoring/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getActiveSponsorship, canManageSponsorship } from "@/lib/sponsorship";
import { SponsoringPlans } from "@/components/sponsoring/SponsoringPlans";
import { listInvoicesForStore, formatInvoiceNumber, formatCents } from "@/lib/invoices";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = { title: "Sponsoring" };

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function StoreSponsoringPage({ params }: PageProps) {
  const locale = await getLocale();
  const { slug } = await params;
  const session = await auth();
  if (!session?.user) {
    return redirect({ href: `/login?callbackUrl=/me/stores/${slug}/sponsoring`, locale });
  }

  const store = await prisma.store.findUnique({ where: { slug } });
  if (!store) notFound();

  if (!(await canManageSponsorship(store, session.user))) {
    return redirect({ href: `/stores/${slug}`, locale });
  }

  const sponsorship = await getActiveSponsorship(store.id);
  const invoices = await listInvoicesForStore(store.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href={`/stores/${slug}`} className="mb-4 inline-flex items-center gap-1 text-sm text-sage dark:text-sage-300 hover:underline">
        <ArrowLeft className="h-3.5 w-3.5" /> Zurück zu {store.name}
      </Link>
      <h1 className="text-2xl font-bold text-earth">Sponsoring für {store.name}</h1>
      <p className="mt-1 text-sm text-earth/70">
        Jeder Plan gibt dir Zugriff auf die Insights-Übersicht (Aufrufe, Herkunft,
        Suchanfragen). Ab Plan &bdquo;Plus&ldquo; kommen zusätzlich das &bdquo;Gesponsert&ldquo;-Badge
        und eine bessere Platzierung in Suche, Kategorien und auf der Startseite dazu. Gesponserte
        Läden werden für alle Besucher:innen transparent gekennzeichnet. Die Zahlung läuft
        monatlich über Mollie und ist jederzeit kündbar.
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

      {invoices.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-earth">Rechnungen</h2>
          <p className="mt-1 text-sm text-earth/60">
            Alle Rechnungen wurden dir zusätzlich per E-Mail zugestellt.
          </p>
          <div className="mt-3 divide-y divide-sage/10 rounded-lg border border-sage/10 bg-surface">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <div>
                  <p className="text-earth">{formatInvoiceNumber(invoice)}</p>
                  <p className="text-xs text-earth/50">
                    {invoice.createdAt.toLocaleDateString("de-DE")} · {invoice.tier}
                  </p>
                </div>
                <p className="font-medium text-earth">{formatCents(invoice.amountGrossCents)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}