// src/app/stores/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, Phone, Globe, Mail, ExternalLink, Pencil, BarChart3, Megaphone } from "lucide-react";
import { auth } from "@/auth";
import { getStoreBySlug, canEditStore, isStoreSaved } from "@/lib/stores";
import { listPublicSuggestionsForStore } from "@/lib/edit-suggestions";
import { listPublicProductSuggestionsForStore } from "@/lib/products";
import { canManageSponsorship } from "@/lib/sponsorship";
import { RatingStars } from "@/components/store/RatingStars";
import { SocialLinkIcon } from "@/components/store/SocialLinkIcon";
import { SOCIAL_PLATFORM_LABELS } from "@/lib/constants";
import { FairBadges } from "@/components/store/FairBadges";
import { OpeningHoursTable } from "@/components/store/OpeningHoursTable";
import { SaveButton, ShareButton } from "@/components/store/SaveShareButtons";
import { ProductCard } from "@/components/store/ProductCard";
import { StoreHeroGallery } from "@/components/store/StoreHeroGallery";
import { VerifiedBadge } from "@/components/store/VerifiedBadge";
import { AttestationWidget } from "@/components/store/AttestationWidget";
import { SuggestionVoteWidget } from "@/components/store/SuggestionVoteWidget";
import { ProductSuggestionVoteWidget } from "@/components/store/ProductSuggestionVoteWidget";
import { ProductSuggestForm } from "@/components/store/ProductSuggestForm";
import { ReviewForm } from "@/components/store/ReviewForm";
import { ReviewsList } from "@/components/store/ReviewsList";
import { DistanceFromYou } from "@/components/store/DistanceFromYou";
import { SponsoredBadge } from "@/components/store/SponsoredBadge";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getOpenStatusLabel, isOpenNow } from "@/lib/hours";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = await getStoreBySlug(slug);
  if (!store) return { title: "Store not found" };

  const description =
    store.description?.slice(0, 160) ||
    `${store.name} — fair-trade store in ${store.city}. Find opening hours, products, and reviews on FairFind.`;
  const ogImages = store.coverImage
    ? [{ url: store.coverImage, width: 1200, height: 630, alt: store.name }]
    : undefined; // falls back to the site-wide /opengraph-image

  return {
    title: store.name,
    description,
    alternates: { canonical: `/stores/${slug}` },
    openGraph: {
      title: store.name,
      description,
      url: `/stores/${slug}`,
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: store.name,
      description,
      images: store.coverImage ? [store.coverImage] : undefined,
    },
  };
}

export default async function StoreDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const session = await auth();
  const store = await getStoreBySlug(slug, session?.user?.id);
  if (!store) notFound();

  const canEdit = canEditStore(store, session?.user);
  // Owner (real, confirmed) or admin/moderator — mirrors the access check
  // the /insights page and API route enforce, so we don't show a button
  // that then 403s. Sponsoring itself (billing) stays owner-only below.
  const canViewInsights = await canManageSponsorship(store, session?.user);
  const initialSaved = session?.user ? await isStoreSaved(store.id, session.user.id) : false;
  const isSignedIn = Boolean(session?.user);
  // Unmanaged stores open proposed edits up to community confirm/dispute
  // votes — see SuggestionVoteWidget below. Managed stores route
  // suggestions privately to the owner's edit page instead.
  const communitySuggestions = store.ownerUserId
    ? []
    : await listPublicSuggestionsForStore(store.id, session?.user?.id);
  const communityProductSuggestions = store.ownerUserId
    ? []
    : await listPublicProductSuggestionsForStore(store.id, session?.user?.id);
  // Only the current owner (or the creator, while the store is still
  // unclaimed) counts as "own store" here — once someone else has claimed
  // it, the original creator can review/attest like anyone else.
  const isOwnStore = Boolean(
    session?.user &&
      (store.ownerUserId === session.user.id ||
        (store.createdById === session.user.id && store.ownerUserId === null))
  );

  const open = isOpenNow(store.hours);
  const statusLabel = getOpenStatusLabel(store.hours);

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/stores/${store.slug}`,
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/stores/${store.slug}`,
    name: store.name,
    description: store.description,
    ...(store.coverImage && { image: store.coverImage }),
    ...(store.phone && { telephone: store.phone }),
    ...((store.website || store.socialLinks.length > 0) && {
      sameAs: [
        ...(store.website ? [store.website] : []),
        ...store.socialLinks.map((s) => s.url),
      ],
    }),
    address: {
      "@type": "PostalAddress",
      streetAddress: store.addressLine,
      addressLocality: store.city,
      postalCode: store.postalCode,
      addressCountry: store.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: store.latitude,
      longitude: store.longitude,
    },
    ...(store.hours?.length && {
      openingHoursSpecification: store.hours
        .filter((h) => !h.isClosed)
        .map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: `https://schema.org/${dayNames[h.dayOfWeek]}`,
          opens: h.openTime,
          closes: h.closeTime,
        })),
    }),
    ...(store.avgRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: store.avgRating,
        reviewCount: store.reviewCount,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageViewTracker storeId={store.id} path={`/stores/${store.slug}`} />

      {/* Hero */}
      <div className="relative h-64 bg-sage-100 md:h-80">
        <StoreHeroGallery
          storeSlug={store.slug}
          storeName={store.name}
          coverImage={store.coverImage}
          photos={store.photos}
          isSignedIn={isSignedIn}
          currentUserId={session?.user?.id ?? null}
          canManageStore={canEdit}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="mx-auto max-w-4xl">
            <FairBadges badges={store.fairBadges} className="mb-2" />
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-bold md:text-4xl">{store.name}</h1>
              <VerifiedBadge level={store.verificationLevel} />
              {store.isSponsored && <SponsoredBadge />}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {store.avgRating != null && (
                <RatingStars
                  rating={store.avgRating}
                  showValue
                  reviewCount={store.reviewCount}
                  className="[&_span]:text-white"
                />
              )}
              <DistanceFromYou
                latitude={store.latitude}
                longitude={store.longitude}
                className="text-sm text-white/80"
              />
              <Badge variant={open ? "success" : "secondary"}>{statusLabel}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6 flex gap-2">
          <SaveButton
            storeSlug={store.slug}
            initialSaved={initialSaved}
            isLoggedIn={Boolean(session?.user)}
          />
          <ShareButton title={store.name} />
          {canEdit && (
            <div className="ml-auto flex gap-2">
              {canViewInsights && (
                <Link href={`/me/stores/${store.slug}/insights`}>
                  <Button variant="outline" size="sm" className="gap-1">
                    <BarChart3 className="h-3.5 w-3.5" /> Insights
                  </Button>
                </Link>
              )}
              {store.ownerUserId === session?.user?.id && (
                <Link href={`/me/stores/${store.slug}/sponsoring`}>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Megaphone className="h-3.5 w-3.5" /> Sponsoring
                  </Button>
                </Link>
              )}
              {/* Editable but unclaimed (e.g. its own creator, or an
                  admin/moderator) — still offer claiming so this actually
                  gets a confirmed owner and unlocks Insights/Sponsoring. */}
              {!store.ownerUserId && (
                <Link href={`/claim/${store.slug}`}>
                  <Button variant="outline" size="sm">
                    Laden beanspruchen
                  </Button>
                </Link>
              )}
              <Link href={`/stores/${store.slug}/edit`}>
                <Button variant="outline" size="sm" className="gap-1">
                  <Pencil className="h-3.5 w-3.5" /> Bearbeiten
                </Button>
              </Link>
            </div>
          )}
          {!canEdit && (
            <div className="ml-auto flex gap-2">
              {!store.ownerUserId && (
                <Link href={`/claim/${store.slug}`}>
                  <Button variant="outline" size="sm">
                    Laden beanspruchen
                  </Button>
                </Link>
              )}
              <Link href={`/stores/${store.slug}/suggest-edit`}>
                <Button variant="outline" size="sm" className="gap-1">
                  <Pencil className="h-3.5 w-3.5" /> Änderung vorschlagen
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-earth">About</h2>
              <p className="mt-2 text-earth/80 leading-relaxed">{store.description}</p>
            </section>

            {(store.products.length > 0 || !canEdit) && (
              <section>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-xl font-semibold text-earth">Produkte</h2>
                  {!canEdit && (
                    <ProductSuggestForm
                      storeSlug={store.slug}
                      isSignedIn={isSignedIn}
                      existingProducts={store.products.map((p) => ({ id: p.id, name: p.name }))}
                    />
                  )}
                </div>
                {store.products.length > 0 ? (
                  <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                    {store.products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={{
                          ...product,
                          store: { slug: store.slug, name: store.name, city: store.city },
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-earth/60">Noch keine Produkte gelistet.</p>
                )}

                {!store.ownerUserId && communityProductSuggestions.length > 0 && (
                  <div className="mt-4">
                    <ProductSuggestionVoteWidget
                      storeSlug={store.slug}
                      suggestions={communityProductSuggestions}
                      isSignedIn={isSignedIn}
                    />
                  </div>
                )}
              </section>
            )}

            <section>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold text-earth">
                  Reviews {store.reviewCount > 0 ? `(${store.reviewCount})` : ""}
                </h2>
                {!isOwnStore && (
                  <ReviewForm
                    storeSlug={store.slug}
                    isSignedIn={isSignedIn}
                    existingReview={
                      session?.user
                        ? (store.reviews.find((r) => r.user.id === session.user!.id) ?? null)
                        : null
                    }
                  />
                )}
              </div>
              {store.reviews.length > 0 ? (
                <ReviewsList
                  reviews={store.reviews.map((r) => ({
                    id: r.id,
                    rating: r.rating,
                    title: r.title,
                    body: r.body,
                    createdAt: r.createdAt,
                    ownerReply: r.ownerReply,
                    user: { id: r.user.id, name: r.user.name },
                    reportedByMe: r.reportedByMe,
                  }))}
                  isSignedIn={isSignedIn}
                  currentUserId={session?.user?.id}
                />
              ) : (
                <p className="text-sm text-earth/60">
                  Noch keine Bewertungen. Sei die/der Erste!
                </p>
              )}
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-xl border border-sage/10 bg-white p-4">
              <h3 className="font-semibold text-earth">Contact</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-start gap-2 text-earth/80">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                  <span>
                    {store.addressLine}, {store.postalCode} {store.city}
                  </span>
                </li>
                {store.phone && (
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-sage" />
                    <a href={`tel:${store.phone}`} className="text-sage hover:underline">
                      {store.phone}
                    </a>
                  </li>
                )}
                {store.website && (
                  <li className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-sage" />
                    <a
                      href={store.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sage hover:underline"
                    >
                      Website
                    </a>
                  </li>
                )}
                {store.email && (
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-sage" />
                    <a href={`mailto:${store.email}`} className="text-sage hover:underline">
                      {store.email}
                    </a>
                  </li>
                )}
                {store.socialLinks.map((link, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <SocialLinkIcon platform={link.platform} className="h-4 w-4 text-sage" />
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sage hover:underline"
                    >
                      {SOCIAL_PLATFORM_LABELS[link.platform]}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex"
              >
                <Button variant="outline" size="sm" className="gap-1">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Directions
                </Button>
              </a>
            </section>

            <section className="rounded-xl border border-sage/10 bg-white p-4">
              <h3 className="font-semibold text-earth">Opening hours</h3>
              <OpeningHoursTable hours={store.hours} className="mt-3" />
            </section>

            {store.owner && (
              <section className="rounded-xl border border-sage/10 bg-white p-4">
                <h3 className="font-semibold text-earth">Managed by</h3>
                <Link
                  href={`/profile/${store.owner.id}`}
                  className="mt-1 block text-sm text-sage hover:underline"
                >
                  {store.owner.name}
                </Link>
              </section>
            )}

            <AttestationWidget
              storeSlug={store.slug}
              confirmCount={store.confirmCount}
              disputeCount={store.disputeCount}
              verificationLevel={store.verificationLevel}
              myVote={store.myVote}
              isSignedIn={Boolean(session?.user)}
              isOwnStore={isOwnStore}
            />

            {communitySuggestions.length > 0 && (
              <SuggestionVoteWidget
                storeSlug={store.slug}
                current={{
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
                }}
                suggestions={communitySuggestions}
                isSignedIn={isSignedIn}
              />
            )}
          </aside>
        </div>
      </div>
    </>
  );
}