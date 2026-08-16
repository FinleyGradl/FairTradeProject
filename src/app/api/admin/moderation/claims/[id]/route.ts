import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { reviewClaim, canModerate } from "@/lib/stores";
import { moderationActionSchema } from "@/lib/validators/store";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!canModerate(session?.user) || !session?.user) {
    return NextResponse.json({ error: "Keine Berechtigung." }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = moderationActionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe." }, { status: 400 });
  }

  const updated = await reviewClaim(id, parsed.data.action, session.user.id);
  if (!updated) {
    return NextResponse.json({ error: "Anfrage nicht gefunden." }, { status: 404 });
  }

  return NextResponse.json({ success: true, claim: updated });
}