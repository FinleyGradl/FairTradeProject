import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { listPendingClaims, canModerate } from "@/lib/stores";

export async function GET() {
  const session = await auth();
  if (!canModerate(session?.user)) {
    return NextResponse.json({ error: "Keine Berechtigung." }, { status: 403 });
  }

  const claims = await listPendingClaims();
  return NextResponse.json({ claims });
}