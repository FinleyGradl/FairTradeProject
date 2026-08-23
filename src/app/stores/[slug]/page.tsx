// path: src/app/stores/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, Phone, Globe, Mail, ExternalLink, Pencil, BarChart3, Megaphone } from "lucide-react";
import { auth } from "@/auth";
import { getStoreBySlug, canEditStore } from "@/lib/stores";
import { RatingStars } from "@/components/store/RatingStars";
import { FairBadges } from "@/components/store/FairBadges";
import { OpeningHoursTable } from "@/components/store/OpeningHoursTable";
import { SaveButton, ShareButton } from "@/components/store/SaveShareButtons";
import { ProductCard } from "@/components/store/ProductCard";
import { VerifiedBadge } from "@/components/store/VerifiedBadge";
import { AttestationWidget } from "@/components/store/AttestationWidget";
import { ReviewForm } from "@/components/store/ReviewForm";
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
  return {
    title: store.name,
    description: store.description,
    openGraph: {
      title: store.name,
      description: store.description,
      images: store.coverImage ? [store.coverImage] : [],
    },
  };
}

export default async function StoreDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const session = await auth();
  const store = await getStoreBySlug(slug, session?.user?.id);
  if (!store) notFound();

  const canEdit = canEditStore(store, session?.user);
  const isSignedIn = Boolean(session?.user);
  const isOwnStore = Boolean(
    session?.user && (store.ownerUserId === session.user.id || store.createdById === session.user.id)
  );

  const open = isOpenNow(store.hours);
  const statusLabel = getOpenStatusLabel(store.hours);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: store.name,
    description: store.description,
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
        {store.coverImage && (
          <Image
            src={store.coverImage}
            alt={store.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
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
          <SaveButton storeId={store.id} />
          <ShareButton title={store.name} />
          {canEdit ? (
            <div className="ml-auto flex gap-2">
              {store.ownerUserId === session?.user?.id && (
                <>
                  <Link href={`/me/stores/${store.slug}/insights`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <BarChart3 className="h-3.5 w-3.5" /> Insights
                    </Button>
                  </Link>
                  <Link href={`/me/stores/${store.slug}/sponsoring`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Megaphone className="h-3.5 w-3.5" /> Sponsoring
                    </Button>
                  </Link>
                </>
              )}
              <Link href={`/stores/${store.slug}/edit`}>
                <Button variant="outline" size="sm" className="gap-1">
                  <Pencil className="h-3.5 w-3.5" /> Bearbeiten
                </Button>
              </Link>
            </div>
          ) : !store.ownerUserId ? (
            <Link href={`/claim/${store.slug}`} className="ml-auto">
              <Button variant="outline" size="sm">
                Claim this store
              </Button>
            </Link>
          ) : null}
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-earth">About</h2>
              <p className="mt-2 text-earth/80 leading-relaxed">{store.description}</p>
            </section>

            {store.products.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-semibold text-earth">Products</h2>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                  {store.products.map((product) => (
                    <div key={product.id} id={`product-${product.slug}`}>
                      <ProductCard
                        product={{
                          ...product,
                          store: { slug: store.slug, name: store.name, city: store.city },
                        }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold text-earth">
                  Reviews {store.reviewCount > 0 ? `(${store.reviewCount})` : ""}
                </h2>
                {!isOwnStore && <ReviewForm storeSlug={store.slug} isSignedIn={isSignedIn} />}
              </div>
              {store.reviews.length > 0 ? (
                <div className="space-y-4">
                  {store.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-lg border border-sage/10 bg-white p-4"
                    >
                      <RatingStars rating={review.rating} size="sm" />
                      {review.title && (
                        <p className="mt-1 font-medium text-earth">{review.title}</p>
                      )}
                      <p className="mt-1 text-sm text-earth/80">{review.body}</p>
                      <p className="mt-2 text-xs text-earth/50">
                        {review.user.name ?? "Anonymous"} ·{" "}
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                      {review.ownerReply && (
                        <div className="mt-3 rounded bg-sage-50 p-3 text-sm">
                          <p className="font-medium text-sage">Owner reply</p>
                          <p className="text-earth/80">{review.ownerReply}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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
                <p className="mt-1 text-sm text-earth/70">{store.owner.name}</p>
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
          </aside>
        </div>
      </div>
    </>
  );
}