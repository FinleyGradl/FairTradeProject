// path: src/app/api/admin/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { canManageUsers, listUsers } from "@/lib/users";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!canManageUsers(session?.user)) {
    return NextResponse.json({ error: "Nicht berechtigt." }, { status: 403 });
  }

  const params = request.nextUrl.searchParams;
  const result = await listUsers({
    page: Number(params.get("page") ?? "1"),
    limit: Number(params.get("limit") ?? "25"),
    q: params.get("q") ?? undefined,
    role: params.get("role") ?? undefined,
  });

  return NextResponse.json(result);
}
