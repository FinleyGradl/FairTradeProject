"use client";
// path: src/components/store/ProductCard.tsx

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/store/RatingStars";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    price?: number | null;
    currency: string;
    category?: string | null;
    imageUrl?: string | null;
    inStock: boolean;
    avgRating?: number | null;
    reviewCount?: number;
    store?: { slug: string; name: string; city: string };
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const cardBody = (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative aspect-square bg-sage-50">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="200px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sage-300 text-sm">
            Kein Bild
          </div>
        )}
        {!product.inStock && (
          <Badge className="absolute right-2 top-2" variant="secondary">
            Ausverkauft
          </Badge>
        )}
      </div>
      <CardContent className="p-3">
        <h4 className="font-medium text-earth line-clamp-1">{product.name}</h4>
        {product.store && (
          <p className="text-xs text-earth/60">{product.store.name}</p>
        )}
        {product.avgRating != null && (
          <RatingStars
            rating={product.avgRating}
            size="sm"
            showValue
            reviewCount={product.reviewCount}
            className="mt-1"
          />
        )}
        {product.price != null && (
          <p className="mt-1 font-semibold text-sage dark:text-sage-300">
            €{product.price.toFixed(2)}
          </p>
        )}
      </CardContent>
    </Card>
  );

  // Without a store there's nowhere to link to — render the card as a
  // plain (non-interactive) block instead of a dead `href="#"` link,
  // which would otherwise trap keyboard/screen-reader users on a
  // control that does nothing.
  if (!product.store) return cardBody;

  return (
    <Link href={`/stores/${product.store.slug}/products/${product.slug}`}>
      {cardBody}
    </Link>
  );
}
