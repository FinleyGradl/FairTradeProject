// path: src/app/api/admin/audit-log/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { searchAuditLogs } from "@/lib/audit";

// Full audit-log search is admin/superuser-only — moderators see their own
// queue at /admin/moderation, but the append-only trail across the whole
// platform (including billing/subscription events) is reserved for a
// higher trust tier.
function canViewAuditLog(user: { role?: string; isSuperuser?: boolean } | null | undefined) {
  return user?.role === "admin" || user?.isSuperuser === true;
}

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!canViewAuditLog(session?.user)) {
    return NextResponse.json({ error: "Nicht berechtigt." }, { status: 403 });
  }

  const params = request.nextUrl.searchParams;
  const result = await searchAuditLogs({
    page: Number(params.get("page") ?? "1"),
    limit: Number(params.get("limit") ?? "25"),
    action: params.get("action") ?? undefined,
    entityType: params.get("entityType") ?? undefined,
    actorId: params.get("actorId") ?? undefined,
    q: params.get("q") ?? undefined,
    from: params.get("from") ?? undefined,
    to: params.get("to") ?? undefined,
  });

  return NextResponse.json(result);
}
