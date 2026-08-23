// src/app/api/v1/reviews/[reviewId]/report/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { reportReview, dismissReviewReports, canModerate } from "@/lib/stores";

// Any signed-in user can report a review once (not their own). Reports
// accumulate silently — nothing is hidden automatically. Once a review
// collects REVIEW_REPORT_THRESHOLD distinct reports it shows up for
// admins/moderators at /admin/moderation, who can decide to hide it.
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

  const result = await reportReview(reviewId, session.user.id, reason);

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

  return NextResponse.json({ success: true, reportCount: result.reportCount });
}

// Moderator/admin-only: dismiss all reports on a review without hiding it.
// Used from /admin/moderation when a report was a false alarm — the review
// stays visible, the queue entry goes away, and fresh reports can still
// accumulate again later.
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  const session = await auth();
  if (!canModerate(session?.user)) {
    return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });
  }

  const { reviewId } = await params;
  const ok = await dismissReviewReports(reviewId);
  if (!ok) {
    return NextResponse.json({ error: "Bewertung nicht gefunden." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}