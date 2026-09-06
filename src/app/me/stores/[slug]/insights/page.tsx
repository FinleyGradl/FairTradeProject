// path: src/app/me/stores/[slug]/insights/page.tsx
import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { canManageSponsorship, canAccessInsights } from "@/lib/sponsorship";
import { InsightsCharts } from "@/components/insights/InsightsCharts";
import { buttonVariants } from "@/components/ui/button"; 
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Insights" };

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function StoreInsightsPage({ params }: PageProps) {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user) {
    redirect(`/login?callbackUrl=/me/stores/${slug}/insights`);
  }

  const store = await prisma.store.findUnique({ where: { slug } });
  if (!store) notFound();

  // Insights (and sponsoring) are for the *confirmed* owner only — unlike
  // basic editing, which the original submitter can still do up until
  // someone else's claim on the store is approved. A pending, unclaimed
  // listing has no owner to subscribe on its behalf.
  if (!(await canManageSponsorship(store, session.user))) {
    redirect(`/stores/${slug}`);
  }

  if (!(await canAccessInsights(store, session.user))) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <Lock className="mx-auto h-10 w-10 text-amber-500 dark:text-amber-400" />
        <h1 className="mt-4 text-xl font-bold text-earth">Insights sind Teil des Sponsorings</h1>
        <p className="mt-2 text-earth/70">
          Aufrufe, Herkunft und Suchanfragen zu {store.name} siehst du ab dem Plan &bdquo;Basis&ldquo;
          — schon ohne Sponsoring-Badge oder Bevorzugung in den Ergebnissen.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href={`/me/stores/${slug}/sponsoring`} className={buttonVariants()}>Plan ansehen</Link>
          <Link href={`/stores/${slug}`} className={buttonVariants({ variant: "outline" })}>Zurück zum Laden</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href={`/stores/${slug}`} className="mb-4 inline-flex items-center gap-1 text-sm text-sage dark:text-sage-300 hover:underline">
        <ArrowLeft className="h-3.5 w-3.5" /> Zurück zu {store.name}
      </Link>
      <h1 className="text-2xl font-bold text-earth">Insights für {store.name}</h1>
      <p className="mt-1 text-sm text-earth/70">
        Aufrufe, Herkunft und Suchanfragen zu deinem Laden. Wir erfassen keine vollständigen
        IP-Adressen und keine über Tage hinweg wiedererkennbaren Besucher-IDs — Details dazu in
        der{" "}
        <Link href="/datenschutz" className="underline">
          Datenschutzerklärung
        </Link>
        .
      </p>

      <div className="mt-8">
        <InsightsCharts storeSlug={slug} />
      </div>
    </div>
  );
}