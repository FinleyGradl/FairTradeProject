"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    store?: { slug: string; name: string; city: string };
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const href = product.store
    ? `/stores/${product.store.slug}#product-${product.slug}`
    : "#";

  return (
    <Link href={href}>
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
              No image
            </div>
          )}
          {!product.inStock && (
            <Badge className="absolute right-2 top-2" variant="secondary">
              Out of stock
            </Badge>
          )}
        </div>
        <CardContent className="p-3">
          <h4 className="font-medium text-earth line-clamp-1">{product.name}</h4>
          {product.store && (
            <p className="text-xs text-earth/60">{product.store.name}</p>
          )}
          {product.price != null && (
            <p className="mt-1 font-semibold text-sage">
              €{product.price.toFixed(2)}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
