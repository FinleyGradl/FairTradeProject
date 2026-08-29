// path: src/app/api/v1/stores/[slug]/suggestions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { reviewEditSuggestion } from "@/lib/edit-suggestions";
import { moderationActionSchema } from "@/lib/validators/store";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = moderationActionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe." }, { status: 400 });
  }

  const result = await reviewEditSuggestion(id, parsed.data.action, session.user);

  if ("error" in result) {
    const messages = {
      NOT_FOUND: "Vorschlag nicht gefunden.",
      FORBIDDEN: "Du darfst diesen Vorschlag nicht bearbeiten.",
      ALREADY_REVIEWED: "Dieser Vorschlag wurde bereits bearbeitet.",
    } as const;
    const status =
      result.error === "NOT_FOUND" ? 404 : result.error === "FORBIDDEN" ? 403 : 409;
    return NextResponse.json({ error: messages[result.error] }, { status });
  }

  return NextResponse.json({ success: true });
}
