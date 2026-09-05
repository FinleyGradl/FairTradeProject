// path: src/app/stores/[slug]/suggest-edit/page.tsx
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { getStoreForEdit, canEditStore } from "@/lib/stores";
import { SuggestEditForm } from "@/components/store/SuggestEditForm";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = { title: "Änderung vorschlagen" };

export default async function SuggestEditPage({ params }: PageProps) {
  const { slug } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect(`/login?callbackUrl=/stores/${slug}/suggest-edit`);
  }

  const store = await getStoreForEdit(slug);
  if (!store) notFound();

  // People who can already edit the store directly use the real edit form
  // instead — suggestions exist for everyone else.
  if (canEditStore(store, session.user)) {
    redirect(`/stores/${slug}/edit`);
  }

  const hours =
    store.hours.length > 0
      ? store.hours
          .slice()
          .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
          .map((h) => ({
            dayOfWeek: h.dayOfWeek,
            openTime: h.openTime,
            closeTime: h.closeTime,
            isClosed: h.isClosed,
          }))
      : Array.from({ length: 7 }, (_, i) => ({
          dayOfWeek: i,
          openTime: "09:00",
          closeTime: "18:00",
          isClosed: i >= 5,
        }));

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-earth">Änderung an {store.name} vorschlagen</h1>
        <Link href={`/stores/${slug}`} className="text-sm text-sage dark:text-sage-300 hover:underline">
          Zum Laden →
        </Link>
      </div>
      <p className="mt-2 text-earth/70">
        Hat sich etwas geändert — Öffnungszeiten, Adresse, Kontaktdaten? Schlag es vor, wir
        kümmern uns um den Rest.
      </p>

      <div className="mt-8">
        <SuggestEditForm
          storeSlug={slug}
          initialValues={{
            name: store.name,
            description: store.description,
            addressLine: store.addressLine,
            city: store.city,
            postalCode: store.postalCode,
            phone: store.phone ?? "",
            website: store.website ?? "",
            email: store.email ?? "",
            hours,
          }}
        />
      </div>

      <div className="mt-6 text-center">
        <Link href={`/stores/${slug}`}>
          <Button variant="outline">← Zurück zum Laden</Button>
        </Link>
      </div>
    </div>
  );
}
