// path: src/app/api/v1/stores/[slug]/suggestions/[id]/vote/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { castSuggestionVote } from "@/lib/edit-suggestions";
import { editSuggestionVoteSchema } from "@/lib/validators/store";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = editSuggestionVoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe." }, { status: 400 });
  }

  const result = await castSuggestionVote(id, session.user.id, parsed.data.vote);

  if ("error" in result) {
    const messages = {
      NOT_FOUND: "Vorschlag nicht gefunden.",
      NOT_COMMUNITY_REVIEWABLE: "Dieser Laden hat eine:n Inhaber:in — nur er/sie kann den Vorschlag bearbeiten.",
      OWN_SUGGESTION: "Du kannst nicht über deinen eigenen Vorschlag abstimmen.",
      ALREADY_REVIEWED: "Dieser Vorschlag wurde bereits entschieden.",
    } as const;
    const status = result.error === "NOT_FOUND" ? 404 : 409;
    return NextResponse.json({ error: messages[result.error] }, { status });
  }

  return NextResponse.json({ success: true, ...result });
}
