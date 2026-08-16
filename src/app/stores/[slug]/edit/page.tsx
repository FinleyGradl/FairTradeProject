import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { auth } from "@/auth";
import { getStoreForEdit, canEditStore } from "@/lib/stores";
import { StoreForm, type StoreFormValues } from "@/components/store/StoreForm";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = { title: "Laden bearbeiten" };

export default async function EditStorePage({ params }: PageProps) {
  const { slug } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect(`/login?callbackUrl=/stores/${slug}/edit`);
  }

  const store = await getStoreForEdit(slug);
  if (!store) notFound();

  if (!canEditStore(store, session.user)) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <ShieldAlert className="mx-auto h-10 w-10 text-amber-500" />
        <h1 className="mt-4 text-xl font-bold text-earth">Keine Berechtigung</h1>
        <p className="mt-2 text-earth/70">
          Du kannst diesen Laden nicht bearbeiten. Falls dir dieser Laden gehört, kannst du ihn
          beanspruchen.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href={`/claim/${slug}`}>
            <Button>Laden beanspruchen</Button>
          </Link>
          <Link href={`/stores/${slug}`}>
            <Button variant="outline">Zurück zum Laden</Button>
          </Link>
        </div>
      </div>
    );
  }

  const initialValues: StoreFormValues = {
    name: store.name,
    description: store.description,
    addressLine: store.addressLine,
    city: store.city,
    postalCode: store.postalCode,
    country: store.country,
    latitude: store.latitude,
    longitude: store.longitude,
    phone: store.phone ?? "",
    website: store.website ?? "",
    email: store.email ?? "",
    coverImage: store.coverImage ?? "",
    fairBadges: store.fairBadges,
    categories: store.categories,
    hours:
      store.hours.length > 0
        ? store.hours.map((h) => ({
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
          })),
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-earth">{store.name} bearbeiten</h1>
        <Link href={`/stores/${slug}`} className="text-sm text-sage hover:underline">
          Zum Laden →
        </Link>
      </div>
      {store.status === "pending" && (
        <p className="mt-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
          Dieser Laden wurde von der Community gemeldet und ist aktuell nicht öffentlich
          sichtbar, bis ein Moderations-Team ihn geprüft hat.
        </p>
      )}

      <div className="mt-8">
        <StoreForm mode="edit" initialValues={initialValues} storeSlug={slug} />
      </div>
    </div>
  );
}