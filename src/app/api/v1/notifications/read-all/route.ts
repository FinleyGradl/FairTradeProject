// path: src/app/api/v1/notifications/read-all/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { markAllNotificationsRead } from "@/lib/notifications";

export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  await markAllNotificationsRead(session.user.id);
  return NextResponse.json({ success: true });
}