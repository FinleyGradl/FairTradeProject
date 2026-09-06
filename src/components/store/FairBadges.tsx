import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { FAIR_BADGE_LABELS } from "@/lib/constants";

interface FairBadgesProps {
  badges: string[];
  className?: string;
}

export async function FairBadges({ badges, className }: FairBadgesProps) {
  if (badges.length === 0) return null;
  const t = await getTranslations("fairBadges");

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
