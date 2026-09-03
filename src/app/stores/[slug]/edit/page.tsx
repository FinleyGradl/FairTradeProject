// path: src/app/stores/[slug]/edit/page.tsx
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { auth } from "@/auth";
import { getStoreForEdit, canEditStore, canDeleteStore, canModerate } from "@/lib/stores";
import { listPendingSuggestionsForStore, parseSuggestionChanges } from "@/lib/edit-suggestions";
import {
  listProductsForStore,
  listPendingProductSuggestionsForStore,
  parseProductSuggestionChanges,
} from "@/lib/products";
import { StoreForm, type StoreFormValues } from "@/components/store/StoreForm";
import { SuggestionReviewQueue } from "@/components/store/SuggestionReviewQueue";
import { ProductManagePanel } from "@/components/store/ProductManagePanel";
import { ProductSuggestionReviewQueue } from "@/components/store/ProductSuggestionReviewQueue";
import { TransferStoreCard } from "@/components/store/TransferStoreCard";
import { DeleteStoreCard } from "@/components/store/DeleteStoreCard";
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
    socialLinks: store.socialLinks,
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

  const suggestionCurrent = {
    name: store.name,
    description: store.description,
    addressLine: store.addressLine,
    city: store.city,
    postalCode: store.postalCode,
    phone: store.phone,
    website: store.website,
    email: store.email,
    hours: store.hours.map((h) => ({
      dayOfWeek: h.dayOfWeek,
      openTime: h.openTime,
      closeTime: h.closeTime,
      isClosed: h.isClosed,
    })),
  };
  const pendingSuggestions = await listPendingSuggestionsForStore(store.id);
  const products = await listProductsForStore(store.id);
  const pendingProductSuggestions = await listPendingProductSuggestionsForStore(store.id);

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

      {pendingSuggestions.length > 0 && (
        <div className="mt-8">
          <SuggestionReviewQueue
            storeSlug={slug}
            current={suggestionCurrent}
            suggestions={pendingSuggestions.map((s) => ({
              id: s.id,
              changes: parseSuggestionChanges(s.changes),
              note: s.note,
              createdAt: s.createdAt.toISOString(),
              suggestedBy: s.suggestedBy,
            }))}
          />
        </div>
      )}

      <div className="mt-8">
        <StoreForm mode="edit" initialValues={initialValues} storeSlug={slug} />
      </div>

      <div id="produkte" className="mt-8 scroll-mt-4">
        <ProductManagePanel storeSlug={slug} products={products} />
      </div>

      {pendingProductSuggestions.length > 0 && (
        <div className="mt-8">
          <ProductSuggestionReviewQueue
            storeSlug={slug}
            suggestions={pendingProductSuggestions.map((s) => ({
              id: s.id,
              type: s.type,
              changes: parseProductSuggestionChanges(s.changes),
              note: s.note,
              createdAt: s.createdAt.toISOString(),
              suggestedBy: s.suggestedBy,
              product: s.product,
            }))}
          />
        </div>
      )}

      {store.ownerUserId === session.user.id && (
        <div className="mt-8">
          <TransferStoreCard storeSlug={slug} />
        </div>
      )}

      {canDeleteStore(store, session.user) && (
        <div className="mt-8">
          <DeleteStoreCard
            storeSlug={slug}
            storeName={store.name}
            isModerator={canModerate(session.user) && store.ownerUserId !== session.user.id}
          />
        </div>
      )}
    </div>
  );
}