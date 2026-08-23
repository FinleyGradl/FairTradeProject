// path: src/app/me/stores/[slug]/insights/page.tsx
import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { canEditStore } from "@/lib/stores";
import { InsightsCharts } from "@/components/insights/InsightsCharts";

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

  if (!canEditStore(store, session.user)) {
    redirect(`/stores/${slug}`);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href={`/stores/${slug}`} className="mb-4 inline-flex items-center gap-1 text-sm text-sage hover:underline">
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