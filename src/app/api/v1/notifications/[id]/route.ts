// path: src/app/api/v1/notifications/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { markNotificationRead } from "@/lib/notifications";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { id } = await params;
  const result = await markNotificationRead(session.user.id, id);
  if ("error" in result) {
    return NextResponse.json({ error: "Benachrichtigung nicht gefunden." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}