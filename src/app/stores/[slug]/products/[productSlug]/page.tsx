// path: src/app/stores/[slug]/products/[productSlug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { getProductBySlug, canEditProduct } from "@/lib/products";
import { RatingStars } from "@/components/store/RatingStars";
import { Badge } from "@/components/ui/badge";
import { ProductReviewForm } from "@/components/store/ProductReviewForm";
import { ProductReviewsList } from "@/components/store/ProductReviewsList";

interface PageProps {
  params: Promise<{ slug: string; productSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, productSlug } = await params;
  const product = await getProductBySlug(slug, productSlug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} — ${product.store.name}`,
    description: product.description?.slice(0, 160) || `${product.name} bei ${product.store.name}`,
    alternates: { canonical: `/stores/${slug}/products/${productSlug}` },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug, productSlug } = await params;
  const session = await auth();
  const product = await getProductBySlug(slug, productSlug, session?.user?.id);
  if (!product) notFound();

  const isSignedIn = Boolean(session?.user);
  const canEdit = canEditProduct(product.store, session?.user);
  const isOwnStore = Boolean(
    session?.user &&
      (product.store.ownerUserId === session.user.id ||
        (product.store.createdById === session.user.id && product.store.ownerUserId === null))
  );
  const myReview = session?.user
    ? product.reviews.find((r) => r.user.id === session.user!.id) ?? null
    : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href={`/stores/${slug}`}
        className="inline-flex items-center gap-1 text-sm text-sage hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Zurück zu {product.store.name}
      </Link>

      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-sage-50">
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="400px" />
          ) : (
            <div className="flex h-full items-center justify-center text-sage-300 text-sm">Kein Bild</div>
          )}
          {!product.inStock && (
            <Badge className="absolute right-2 top-2" variant="secondary">
              Ausverkauft
            </Badge>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-earth">{product.name}</h1>
          {product.category && <p className="mt-1 text-sm text-earth/60">{product.category}</p>}
          {product.avgRating != null && (
            <RatingStars
              rating={product.avgRating}
              showValue
              reviewCount={product.reviewCount}
              className="mt-2"
            />
          )}
          {product.price != null && (
            <p className="mt-3 text-2xl font-semibold text-sage">
              {product.price.toFixed(2)} {product.currency}
            </p>
          )}
          {product.description && <p className="mt-4 text-earth/80 leading-relaxed">{product.description}</p>}

          {canEdit && (
            <Link
              href={`/stores/${slug}/edit#produkte`}
              className="mt-4 inline-block text-sm text-sage hover:underline"
            >
              Im Laden-Editor verwalten →
            </Link>
          )}
        </div>
      </div>

      <section className="mt-10">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold text-earth">
            Bewertungen {product.reviewCount > 0 ? `(${product.reviewCount})` : ""}
          </h2>
          {!isOwnStore && (
            <ProductReviewForm
              productId={product.id}
              storeSlug={slug}
              isSignedIn={isSignedIn}
              existingReview={myReview}
            />
          )}
        </div>
        <ProductReviewsList
          reviews={product.reviews}
          isSignedIn={isSignedIn}
          currentUserId={session?.user?.id}
        />
      </section>
    </div>
  );
}
