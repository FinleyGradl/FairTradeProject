// path: src/app/api/v1/admin/moderation/pending-count/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { canModerate } from "@/lib/stores";

// Force this route to run per-request rather than being statically
// evaluated at build time — without this, Next.js can cache a single
// (unauthenticated) response since the auth() call's use of cookies()
// happens through next-auth's internals and isn't always detected by
// Next's static-analysis as a reason to opt out of caching.
export const dynamic = "force-dynamic";

// Lightweight count used to drive the red notification dot in the nav menu.
// Kept separate from listFlaggedStores/listPendingClaims/listReportedPhotos
// (which fetch full detail) so the menu can poll this cheaply.
export async function GET() {
  const session = await auth();
  if (!canModerate(session?.user)) {
    return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });
  }

  const [flaggedStores, reportedPhotos, pendingClaims, communityProductSuggestions, reportedProductReviews] =
    await Promise.all([
      prisma.store.count({ where: { status: "pending" } }),
      prisma.storePhoto.count({ where: { reports: { some: {} } } }),
      prisma.storeClaim.count({ where: { status: "pending" } }),
      prisma.productSuggestion.count({ where: { status: "pending", store: { ownerUserId: null } } }),
      prisma.productReview.count({ where: { reports: { some: {} } } }),
    ]);

  const count = flaggedStores + reportedPhotos + pendingClaims + communityProductSuggestions + reportedProductReviews;
  return NextResponse.json({ count });
}