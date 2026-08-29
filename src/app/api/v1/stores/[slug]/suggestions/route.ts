// path: src/app/api/v1/stores/[slug]/suggestions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createEditSuggestion, listPendingSuggestionsForStore, parseSuggestionChanges } from "@/lib/edit-suggestions";
import { getStoreForEdit, canEditStore, canModerate } from "@/lib/stores";
import { storeEditSuggestionSchema } from "@/lib/validators/store";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { slug } = await params;
  const body = await request.json().catch(() => null);
  const parsed = storeEditSuggestionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const result = await createEditSuggestion(slug, session.user, parsed.data);

  if ("error" in result) {
    const messages = {
      NOT_FOUND: "Laden nicht gefunden.",
      NO_CHANGES: "Das entspricht bereits den aktuellen Angaben — bitte ändere mindestens ein Feld.",
      CAN_EDIT_DIRECTLY: "Du kannst diesen Laden direkt bearbeiten, ganz ohne Vorschlag.",
    } as const;
    const status = result.error === "NOT_FOUND" ? 404 : 409;
    return NextResponse.json({ error: messages[result.error] }, { status });
  }

  return NextResponse.json({ success: true, suggestion: result.suggestion }, { status: 201 });
}

/**
 * Pending suggestions for this store's review queue — used by the owner's
 * (or an admin/moderator's) edit page. Anyone else gets a 403; the public
 * community-vote view on unmanaged stores is served by
 * /api/v1/stores/[slug]/suggestions/community instead, which doesn't leak
 * suggestions on managed (owned) stores.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { slug } = await params;
  const store = await getStoreForEdit(slug);
  if (!store) {
    return NextResponse.json({ error: "Laden nicht gefunden." }, { status: 404 });
  }
  if (!canEditStore(store, session.user) && !canModerate(session.user)) {
    return NextResponse.json({ error: "Keine Berechtigung." }, { status: 403 });
  }

  const suggestions = await listPendingSuggestionsForStore(store.id);
  return NextResponse.json({
    suggestions: suggestions.map((s) => ({
      id: s.id,
      changes: parseSuggestionChanges(s.changes),
      note: s.note,
      createdAt: s.createdAt.toISOString(),
      suggestedBy: s.suggestedBy,
    })),
  });
}
