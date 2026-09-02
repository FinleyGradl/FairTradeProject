"use client";
// path: src/components/moderation/ModerationDashboard.tsx

import { useState } from "react";
import { Store, Camera, MessageSquareWarning, UserCheck, PenLine, Package, Star } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { FlaggedStoresQueue } from "@/components/moderation/FlaggedStoresQueue";
import { PendingClaimsQueue } from "@/components/moderation/PendingClaimsQueue";
import { ReportedPhotosQueue } from "@/components/moderation/ReportedPhotosQueue";
import { ReportedReviewsQueue } from "@/components/moderation/ReportedReviewsQueue";
import { SuggestedEditsQueue } from "@/components/moderation/SuggestedEditsQueue";
import { SuggestedProductsQueue } from "@/components/moderation/SuggestedProductsQueue";
import { ReportedProductReviewsQueue } from "@/components/moderation/ReportedProductReviewsQueue";
import type { ComponentProps } from "react";

type Props = {
  flaggedStores: ComponentProps<typeof FlaggedStoresQueue>["stores"];
  reportedPhotos: ComponentProps<typeof ReportedPhotosQueue>["photos"];
  reportedReviews: ComponentProps<typeof ReportedReviewsQueue>["reviews"];
  pendingClaims: ComponentProps<typeof PendingClaimsQueue>["claims"];
  suggestedEdits: ComponentProps<typeof SuggestedEditsQueue>["suggestions"];
  suggestedProducts: ComponentProps<typeof SuggestedProductsQueue>["suggestions"];
  reportedProductReviews: ComponentProps<typeof ReportedProductReviewsQueue>["reviews"];
};

/** Tabbed moderation dashboard — each tab carries its own open-item count
 * as a badge, so the queue that actually needs attention stands out
 * instead of everything being stacked into one long scroll. */
export function ModerationDashboard({
  flaggedStores,
  reportedPhotos,
  reportedReviews,
  pendingClaims,
  suggestedEdits,
  suggestedProducts,
  reportedProductReviews,
}: Props) {
  const tabs = [
    { id: "stores", label: "Läden", icon: Store, count: flaggedStores.length },
    { id: "photos", label: "Fotos", icon: Camera, count: reportedPhotos.length },
    { id: "reviews", label: "Bewertungen", icon: MessageSquareWarning, count: reportedReviews.length },
    { id: "claims", label: "Beanspruchungen", icon: UserCheck, count: pendingClaims.length },
    { id: "suggestions", label: "Änderungsvorschläge", icon: PenLine, count: suggestedEdits.length },
    { id: "products", label: "Produktvorschläge", icon: Package, count: suggestedProducts.length },
    { id: "productReviews", label: "Produktbewertungen", icon: Star, count: reportedProductReviews.length },
  ] as const;

  const [active, setActive] = useState<(typeof tabs)[number]["id"]>(
    tabs.find((t) => t.count > 0)?.id ?? "stores"
  );

  const totalOpen = tabs.reduce((sum, t) => sum + t.count, 0);

  return (
    <div>
      <p className="mt-1 text-sm text-earth/70">
        {totalOpen === 0
          ? "Aktuell liegt nichts zur Prüfung an."
          : `${totalOpen} offene ${totalOpen === 1 ? "Sache wartet" : "Sachen warten"} auf eine Entscheidung.`}
      </p>

      <Tabs
        className="mt-6"
        active={active}
        onChange={(id) => setActive(id as (typeof tabs)[number]["id"])}
        tabs={tabs.map((t) => ({ id: t.id, label: t.label, count: t.count, icon: t.icon }))}
      />

      <div className="mt-6">
        {active === "stores" && <FlaggedStoresQueue stores={flaggedStores} />}
        {active === "photos" && <ReportedPhotosQueue photos={reportedPhotos} />}
        {active === "reviews" && <ReportedReviewsQueue reviews={reportedReviews} />}
        {active === "claims" && <PendingClaimsQueue claims={pendingClaims} />}
        {active === "suggestions" && <SuggestedEditsQueue suggestions={suggestedEdits} />}
        {active === "products" && <SuggestedProductsQueue suggestions={suggestedProducts} />}
        {active === "productReviews" && <ReportedProductReviewsQueue reviews={reportedProductReviews} />}
      </div>
    </div>
  );
}
