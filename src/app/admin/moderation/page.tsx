// path: src/app/admin/moderation/page.tsx
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  listFlaggedStores,
  listPendingClaims,
  listReportedPhotos,
  listReportedReviews,
  canModerate,
} from "@/lib/stores";
import { listCommunitySuggestions, parseSuggestionChanges } from "@/lib/edit-suggestions";
import { parseJsonArray } from "@/lib/utils";
import { ModerationDashboard } from "@/components/moderation/ModerationDashboard";

export const metadata: Metadata = { title: "Moderation" };

export default async function ModerationPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/moderation");
  }
  if (!canModerate(session.user)) {
    notFound();
  }

  const [flaggedStores, pendingClaims, reportedPhotos, reportedReviews, suggestedEdits] =
    await Promise.all([
      listFlaggedStores(),
      listPendingClaims(),
      listReportedPhotos(),
      listReportedReviews(),
      listCommunitySuggestions(),
    ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-earth">Moderation</h1>

      <ModerationDashboard
        flaggedStores={flaggedStores.map((s) => ({
          id: s.id,
          slug: s.slug,
          name: s.name,
          city: s.city,
          confirmCount: s.confirmCount,
          disputeCount: s.disputeCount,
          categories: parseJsonArray(s.categories),
          createdBy: s.createdBy,
          disputes: s.attestations.map((a) => ({
            userName: a.user.name,
            reason: a.reason,
            createdAt: a.createdAt.toISOString(),
          })),
        }))}
        reportedPhotos={reportedPhotos.map((p) => ({
          id: p.id,
          url: p.url,
          caption: p.caption,
          reportCount: p._count.reports,
          store: p.store,
          uploadedBy: p.uploadedBy,
          reports: p.reports.map((r) => ({
            userName: r.user.name,
            reason: r.reason,
            createdAt: r.createdAt.toISOString(),
          })),
        }))}
        reportedReviews={reportedReviews.map((r) => ({
          id: r.id,
          rating: r.rating,
          title: r.title,
          body: r.body,
          reportCount: r._count.reports,
          store: r.store,
          user: r.user,
          reports: r.reports.map((rep) => ({
            userName: rep.user.name,
            reason: rep.reason,
            createdAt: rep.createdAt.toISOString(),
          })),
        }))}
        pendingClaims={pendingClaims.map((c) => ({
          id: c.id,
          proofText: c.proofText,
          createdAt: c.createdAt.toISOString(),
          store: c.store,
          user: c.user,
        }))}
        suggestedEdits={suggestedEdits.map((s) => ({
          id: s.id,
          changes: parseSuggestionChanges(s.changes),
          note: s.note,
          createdAt: s.createdAt.toISOString(),
          confirmCount: s.confirmCount,
          disputeCount: s.disputeCount,
          store: s.store,
          suggestedBy: s.suggestedBy,
        }))}
      />
    </div>
  );
}
