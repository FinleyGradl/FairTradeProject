// path: src/app/api/me/notification-preferences/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { canModerate } from "@/lib/stores";
import {
  getOrCreatePreferences,
  updatePreferences,
  NOTIFICATION_CATEGORIES,
} from "@/lib/notification-preferences";

const patchSchema = z.object(
  Object.fromEntries(NOTIFICATION_CATEGORIES.map((c) => [c, z.boolean().optional()]))
);

export async function GET() {
  const session = await auth();
  if (!session?.user || !canModerate(session.user)) {
    return NextResponse.json({ error: "Nicht berechtigt." }, { status: 403 });
  }

  const prefs = await getOrCreatePreferences(session.user.id);
  return NextResponse.json({ preferences: prefs });
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user || !canModerate(session.user)) {
    return NextResponse.json({ error: "Nicht berechtigt." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe." }, { status: 400 });
  }

  const prefs = await updatePreferences(session.user.id, parsed.data);
  return NextResponse.json({ preferences: prefs });
}
