// path: src/app/api/v1/product-reviews/[reviewId]/report/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { reportProductReview } from "@/lib/product-reviews";
import { canModerate } from "@/lib/stores";
import { logAudit } from "@/lib/audit";
import { PRODUCT_REVIEW_REPORT_THRESHOLD } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { notifyModerators } from "@/lib/notify";
import { moderationAlertTemplate } from "@/lib/email/templates";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { reviewId } = await params;
  const body = await request.json().catch(() => ({}));
  const reason = typeof body?.reason === "string" ? body.reason.slice(0, 300) : null;

  const result = await reportProductReview(reviewId, session.user.id, reason);

  if ("error" in result) {
    const messages = {
      NOT_FOUND: "Bewertung nicht gefunden.",
      OWN_REVIEW: "Du kannst deine eigene Bewertung nicht melden.",
    } as const;
    const status = result.error === "NOT_FOUND" ? 404 : 409;
    return NextResponse.json({ error: messages[result.error] }, { status });
  }

  if (result.alreadyReported) {
    return NextResponse.json(
      { error: "Du hast diese Bewertung bereits gemeldet.", reportCount: result.reportCount },
      { status: 409 }
    );
  }

  if (result.reportCount === PRODUCT_REVIEW_REPORT_THRESHOLD) {
    const review = await prisma.productReview.findUnique({
      where: { id: reviewId },
      include: { product: { select: { name: true, store: { select: { name: true } } } } },
    });
    if (review) {
      await notifyModerators(
        "notifyNewReviewReport",
        moderationAlertTemplate({
          headline: `Produktbewertung bei „${review.product.store.name}“ mehrfach gemeldet`,
          detailHtml: `Eine Bewertung zu <strong>„${review.product.name}“</strong> (${review.product.store.name}) hat die Melde-Schwelle (${PRODUCT_REVIEW_REPORT_THRESHOLD} Meldungen) erreicht und wartet auf Prüfung.`,
          detailText: `Eine Bewertung zu „${review.product.name}“ (${review.product.store.name}) hat die Melde-Schwelle erreicht.`,
          dashboardUrl: `${process.env.NEXTAUTH_URL ?? ""}/admin/moderation`,
        })
      );
    }
  }

  return NextResponse.json({ success: true, reportCount: result.reportCount });
}

// Moderator/admin-only: dismiss all reports on a product review without
// hiding it — mirrors DELETE /api/v1/reviews/[reviewId]/report.
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  const session = await auth();
  if (!canModerate(session?.user)) {
    return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });
  }

  const { reviewId } = await params;
  const existing = await prisma.productReview.findUnique({ where: { id: reviewId }, select: { id: true } });
  if (!existing) {
    return NextResponse.json({ error: "Bewertung nicht gefunden." }, { status: 404 });
  }
  await prisma.productReviewReport.deleteMany({ where: { productReviewId: reviewId } });

  await logAudit({
    actor: session!.user,
    action: "product_review.report_dismiss",
    entityType: "ProductReview",
    entityId: reviewId,
    entityLabel: `ProductReview ${reviewId}`,
    request,
  });

  return NextResponse.json({ success: true });
}
