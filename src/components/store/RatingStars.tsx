import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

const sizeMap = { sm: "h-3 w-3", md: "h-4 w-4", lg: "h-5 w-5" };

export function RatingStars({
  rating,
  max = 5,
  size = "md",
  showValue = false,
  reviewCount,
  className,
}: RatingStarsProps) {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="img"
      aria-label={`Bewertung: ${rating.toFixed(1)} von ${max} Sternen${
        reviewCount != null ? `, ${reviewCount} Bewertungen` : ""
      }`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            sizeMap[size],
            i < Math.round(rating)
              ? "fill-amber-400 text-amber-400 dark:text-amber-300"
              : "fill-none text-gray-300 dark:text-gray-600"
          )}
        />
      ))}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-earth" aria-hidden="true">
          {rating.toFixed(1)}
          {reviewCount != null && (
            <span className="font-normal text-earth/60"> ({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
}
