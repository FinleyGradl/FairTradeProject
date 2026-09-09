// path: src/app/api/me/review-notification-preference/route.ts
// Separate from /api/me/notification-preferences on purpose: that route is
// gated to canModerate() since it only covers admin/moderator categories.
// Whether a user wants an email when someone reviews their store is a plain
// account setting available to anyone — a store owner is very often not a
// moderator.
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { shouldNotifyNewReview, setNotifyNewReview } from "@/lib/notification-preferences";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const enabled = await shouldNotifyNewReview(session.user.id);
  return NextResponse.json({ enabled });
}

const patchSchema = z.object({ enabled: z.boolean() });

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe." }, { status: 400 });
  }

  try {
    await setNotifyNewReview(session.user.id, parsed.data.enabled);
  } catch (error) {
    console.error("setNotifyNewReview failed:", error);
    return NextResponse.json({ error: "Speichern fehlgeschlagen." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}