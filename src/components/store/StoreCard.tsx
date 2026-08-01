import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "./RatingStars";
import { FairBadges } from "./FairBadges";
import { DistanceBadge } from "./DistanceBadge";
import { getOpenStatusLabel, isOpenNow, type StoreHourRow } from "@/lib/hours";
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
}

interface StoreCardProps {
  store: StoreCardData;
  className?: string;
}

export function StoreCard({ store, className }: StoreCardProps) {
  const open = store.hours ? isOpenNow(store.hours) : false;
  const statusLabel = store.hours ? getOpenStatusLabel(store.hours) : null;

  return (
    <Link href={`/stores/${store.slug}`}>
      <Card className={cn("overflow-hidden transition-shadow hover:shadow-md", className)}>
        <div className="relative aspect-[16/10] bg-sage-100">
          {store.coverImage ? (
            <Image
              src={store.coverImage}
              alt={store.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sage-400">
              No image
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
        </div>
        <CardContent className="p-4">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="font-semibold text-earth line-clamp-1">{store.name}</h3>
            <DistanceBadge distanceM={store.distanceM} city={store.city} />
          </div>
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
              {store.categories.slice(0, 2).join(" · ")}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
