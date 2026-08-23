// path: src/app/api/v1/photos/[photoId]/report/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { reportStorePhoto, dismissPhotoReports, canModerate } from "@/lib/stores";

// Any signed-in user can report a gallery photo once. Reports accumulate
// silently — nothing is hidden automatically. Once a photo collects
// PHOTO_REPORT_THRESHOLD distinct reports it shows up for admins/moderators
// at /admin/moderation, who can decide to remove it.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ photoId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { photoId } = await params;
  const body = await request.json().catch(() => ({}));
  const reason = typeof body?.reason === "string" ? body.reason.slice(0, 300) : null;

  const result = await reportStorePhoto(photoId, session.user.id, reason);
  if (!result) {
    return NextResponse.json({ error: "Foto nicht gefunden." }, { status: 404 });
  }

  if (result.alreadyReported) {
    return NextResponse.json(
      { error: "Du hast dieses Bild bereits gemeldet.", reportCount: result.reportCount },
      { status: 409 }
    );
  }

  return NextResponse.json({ success: true, reportCount: result.reportCount });
}

// Moderator/admin-only: dismiss all reports on a photo without deleting it.
// Used from /admin/moderation when a report was a false alarm — the photo
// stays live, the queue entry goes away, and fresh reports can still
// accumulate again later.
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ photoId: string }> }
) {
  const session = await auth();
  if (!canModerate(session?.user)) {
    return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });
  }

  const { photoId } = await params;
  const ok = await dismissPhotoReports(photoId);
  if (!ok) {
    return NextResponse.json({ error: "Foto nicht gefunden." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}