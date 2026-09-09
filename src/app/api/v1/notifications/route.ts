// path: src/app/api/v1/notifications/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { listNotifications, getRecentNotifications } from "@/lib/notifications";

// Two shapes from one endpoint:
// - ?recent=1 → small payload for NotificationBell's dropdown/poll (a few
//   items + unreadCount), fetched frequently.
// - default → cursor-paginated full list for /me/notifications.
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  if (searchParams.get("recent") === "1") {
    const { notifications, unreadCount } = await getRecentNotifications(session.user.id);
    return NextResponse.json({ notifications, unreadCount });
  }

  const cursor = searchParams.get("cursor");
  const { notifications, nextCursor } = await listNotifications(session.user.id, cursor);
  return NextResponse.json({ notifications, nextCursor });
}