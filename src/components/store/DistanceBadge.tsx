import { MapPin } from "lucide-react";
import { formatDistance } from "@/lib/geo";
import { cn } from "@/lib/utils";

interface DistanceBadgeProps {
  distanceM?: number;
  city?: string;
  className?: string;
}

export function DistanceBadge({ distanceM, city, className }: DistanceBadgeProps) {
  if (distanceM == null && !city) return null;

  return (
    <span className={cn("inline-flex items-center gap-1 text-sm text-earth/70", className)}>
      <MapPin className="h-3.5 w-3.5" />
      {distanceM != null ? formatDistance(distanceM) : city}
    </span>
  );
}
