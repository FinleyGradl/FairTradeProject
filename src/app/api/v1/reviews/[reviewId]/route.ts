// src/app/api/v1/reviews/[reviewId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { hideReview, deleteReview, canModerate } from "@/lib/stores";
import { logAudit } from "@/lib/audit";
import { prisma } from "@/lib/db";
import { notifyUser } from "@/lib/notify";
import { contentModeratedTemplate } from "@/lib/email/templates";

// DELETE means two different things depending on who's asking:
// - The review's author permanently deletes their own review.
// - A moderator/admin hides it instead (status -> "hidden"), keeping the
//   record and its reports around as a moderation trail.
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { reviewId } = await params;

  const deleteResult = await deleteReview(reviewId, session.user.id);
  if ("success" in deleteResult) {
    await logAudit({
      actor: session.user,
      action: "review.delete",
      entityType: "Review",
      entityId: reviewId,
      entityLabel: `Review ${reviewId} (eigene)`,
      request,
    });
    return NextResponse.json({ success: true });
  }
  if (deleteResult.error === "NOT_FOUND") {
    return NextResponse.json({ error: "Bewertung nicht gefunden." }, { status: 404 });
  }

  // Not the author (FORBIDDEN) — fall through to the moderator path.
  if (!canModerate(session.user)) {
    return NextResponse.json(
      { error: "Du darfst diese Bewertung nicht entfernen." },
      { status: 403 }
    );
  }

  const ok = await hideReview(reviewId);
  if (!ok) {
    return NextResponse.json({ error: "Bewertung nicht gefunden." }, { status: 404 });
  }

  await logAudit({
    actor: session.user,
    action: "review.hide",
    entityType: "Review",
    entityId: reviewId,
    entityLabel: `Review ${reviewId}`,
    request,
  });

  const reviewAuthor = await prisma.review.findUnique({
    where: { id: reviewId },
    include: { store: { select: { name: true } }, user: { select: { email: true } } },
  });
  if (reviewAuthor) {
    await notifyUser(
      reviewAuthor.user.email,
      contentModeratedTemplate({
        headline: `Deine Bewertung zu „${reviewAuthor.store.name}“ wurde ausgeblendet`,
        detailHtml: `Ein:e Moderator:in hat deine Bewertung zu <strong>„${reviewAuthor.store.name}“</strong> ausgeblendet, da sie gegen unsere Richtlinien verstößt oder mehrfach gemeldet wurde.`,
        detailText: `Deine Bewertung zu „${reviewAuthor.store.name}“ wurde von der Moderation ausgeblendet.`,
      })
    );
  }

  return NextResponse.json({ success: true });
}