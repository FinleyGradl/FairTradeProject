// path: src/components/store/SponsoredBadge.tsx
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Legally required labeling for paid placement (§ 5a UWG /
 * Medienstaatsvertrag transparency rules) — always shown when a store's
 * ranking was boosted by an active sponsorship, never omitted or hidden.
 */
export function SponsoredBadge({ className }: { className?: string }) {
  return (
    <Badge variant="secondary" className={cn("gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300", className)}>
      <Sparkles className="h-3 w-3" /> Gesponsert
    </Badge>
  );
}