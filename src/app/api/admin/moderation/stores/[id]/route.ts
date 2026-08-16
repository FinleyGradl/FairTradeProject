import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { reviewFlaggedStore, canModerate } from "@/lib/stores";
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

  const updated = await reviewFlaggedStore(id, parsed.data.action, session.user.id);
  if (!updated) {
    return NextResponse.json({ error: "Laden nicht gefunden." }, { status: 404 });
  }

  return NextResponse.json({ success: true, store: updated });
}