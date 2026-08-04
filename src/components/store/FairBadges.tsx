import { Badge } from "@/components/ui/badge";
import { FAIR_BADGE_LABELS } from "@/lib/constants";

interface FairBadgesProps {
  badges: string[];
  className?: string;
}

export function FairBadges({ badges, className }: FairBadgesProps) {
  if (badges.length === 0) return null;

  return (
    <div className={className}>
      {badges.map((badge) => (
        <Badge key={badge} variant="secondary" className="mr-1 mb-1">
          {FAIR_BADGE_LABELS[badge] ?? badge}
        </Badge>
      ))}
    </div>
  );
}
