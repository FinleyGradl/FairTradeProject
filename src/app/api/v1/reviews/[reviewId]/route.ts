// src/app/api/v1/reviews/[reviewId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { hideReview, canModerate } from "@/lib/stores";

// Moderator/admin-only: hides a reported review (status -> "hidden"). The
// review drops out of the store page, average rating, and profile — but
// the record and its reports stay around, unlike a hard delete.
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  const session = await auth();
  if (!canModerate(session?.user)) {
    return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });
  }

  const { reviewId } = await params;
  const ok = await hideReview(reviewId);
  if (!ok) {
    return NextResponse.json({ error: "Bewertung nicht gefunden." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}