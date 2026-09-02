// path: src/app/api/v1/product-reviews/[reviewId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { hideProductReview } from "@/lib/product-reviews";
import { canModerate } from "@/lib/stores";
import { logAudit } from "@/lib/audit";
import { prisma } from "@/lib/db";
import { notifyUser } from "@/lib/notify";
import { contentModeratedTemplate } from "@/lib/email/templates";

// Same two-meanings-of-DELETE shape as /api/v1/reviews/[reviewId]: the
// author deletes their own review outright, a moderator hides someone
// else's instead (status -> "hidden").
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { reviewId } = await params;
  const review = await prisma.productReview.findUnique({
    where: { id: reviewId },
    include: { product: { select: { name: true, store: { select: { name: true } } } }, user: { select: { email: true } } },
  });
  if (!review) {
    return NextResponse.json({ error: "Bewertung nicht gefunden." }, { status: 404 });
  }

  if (review.userId === session.user.id) {
    await prisma.productReview.delete({ where: { id: reviewId } });
    await logAudit({
      actor: session.user,
      action: "review.delete",
      entityType: "ProductReview",
      entityId: reviewId,
      entityLabel: `ProductReview ${reviewId} (eigene)`,
      request,
    });
    return NextResponse.json({ success: true });
  }

  if (!canModerate(session.user)) {
    return NextResponse.json({ error: "Du darfst diese Bewertung nicht entfernen." }, { status: 403 });
  }

  const ok = await hideProductReview(reviewId);
  if (!ok) {
    return NextResponse.json({ error: "Bewertung nicht gefunden." }, { status: 404 });
  }

  await logAudit({
    actor: session.user,
    action: "product_review.hide",
    entityType: "ProductReview",
    entityId: reviewId,
    entityLabel: `ProductReview ${reviewId}`,
    request,
  });

  await notifyUser(
    review.user.email,
    contentModeratedTemplate({
      headline: `Deine Bewertung zu „${review.product.name}“ wurde ausgeblendet`,
      detailHtml: `Ein:e Moderator:in hat deine Bewertung zu <strong>„${review.product.name}“</strong> (${review.product.store.name}) ausgeblendet, da sie gegen unsere Richtlinien verstößt oder mehrfach gemeldet wurde.`,
      detailText: `Deine Bewertung zu „${review.product.name}“ wurde von der Moderation ausgeblendet.`,
    })
  );

  return NextResponse.json({ success: true });
}
