// path: src/components/store/StoreCard.tsx
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "./RatingStars";
import { FairBadges } from "./FairBadges";
import { DistanceBadge } from "./DistanceBadge";
import { VerifiedBadge } from "./VerifiedBadge";
import { SponsoredBadge } from "./SponsoredBadge";
import { getOpenStatusLabel, isOpenNow, type StoreHourRow } from "@/lib/hours";
import { categoryTranslationKey } from "@/lib/category-labels";
import { cn } from "@/lib/utils";

export interface StoreCardData {
  id: string;
  slug: string;
  name: string;
  description: string;
  city: string;
  latitude: number;
  longitude: number;
  coverImage?: string | null;
  fairBadges: string[];
  categories: string[];
  avgRating: number | null;
  reviewCount: number;
  distanceM?: number;
  hours?: StoreHourRow[];
  verificationLevel?: "unverified" | "community" | "admin";
  isSponsored?: boolean;
}

interface StoreCardProps {
  store: StoreCardData;
  className?: string;
}

export async function StoreCard({ store, className }: StoreCardProps) {
  const open = store.hours ? isOpenNow(store.hours) : false;
  const statusLabel = store.hours ? getOpenStatusLabel(store.hours) : null;
  const tCategories = await getTranslations("categories");

  return (
    <Link href={`/stores/${store.slug}`}>
      <Card className={cn("overflow-hidden transition-shadow hover:shadow-md", className)}>
        <div className="relative aspect-[16/10] bg-sage-100">
          {store.coverImage ? (
            <Image
              src={store.coverImage}
              alt={`Fairtrade Laden ${store.name} in ${store.city}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sage-400">
              Kein Bild
            </div>
          )}
          {statusLabel && (
            <Badge
              variant={open ? "success" : "secondary"}
              className="absolute left-3 top-3"
            >
              {statusLabel}
            </Badge>
          )}
          {store.isSponsored && (
            <SponsoredBadge className="absolute right-3 top-3" />
          )}
        </div>
        <CardContent className="p-4">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="font-semibold text-earth line-clamp-1">{store.name}</h3>
            <DistanceBadge distanceM={store.distanceM} city={store.city} />
          </div>
          {store.verificationLevel && store.verificationLevel !== "unverified" && (
            <VerifiedBadge level={store.verificationLevel} className="mb-2" />
          )}
          {store.avgRating != null && (
            <RatingStars
              rating={store.avgRating}
              size="sm"
              showValue
              reviewCount={store.reviewCount}
              className="mb-2"
            />
          )}
          <p className="mb-3 line-clamp-2 text-sm text-earth/70">{store.description}</p>
          <FairBadges badges={store.fairBadges} />
          {store.categories.length > 0 && (
            <p className="mt-2 text-xs text-earth/50">
              {store.categories
                .slice(0, 2)
                .map((c) => tCategories(categoryTranslationKey(c)))
                .join(" · ")}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}