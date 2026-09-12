import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { FAIR_BADGE_LABELS } from "@/lib/constants";

interface FairBadgesProps {
  badges: string[];
  className?: string;
}

export function FairBadges({ badges, className }: FairBadgesProps) {
  const t = useTranslations("fairBadges");
  if (badges.length === 0) return null;

  return (
    <div className={className}>
      {badges.map((badge) => (
        <Badge key={badge} variant="secondary" className="mr-1 mb-1">
          {badge in FAIR_BADGE_LABELS ? t(badge) : badge}
        </Badge>
      ))}
    </div>
  );
}