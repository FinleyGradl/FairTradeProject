// path: src/app/api/v1/stores/[slug]/product-suggestions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  createProductSuggestion,
  listPendingProductSuggestionsForStore,
  parseProductSuggestionChanges,
} from "@/lib/products";
import { getStoreForEdit, canEditStore, canModerate } from "@/lib/stores";
import { productSuggestionSchema } from "@/lib/validators/product";
import { notifyModerators } from "@/lib/notify";
import { moderationAlertTemplate } from "@/lib/email/templates";

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
  const parsed = productSuggestionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const result = await createProductSuggestion(slug, session.user, parsed.data);

  if ("error" in result) {
    const messages = {
      NOT_FOUND: "Laden nicht gefunden.",
      PRODUCT_NOT_FOUND: "Produkt nicht gefunden.",
      NO_CHANGES: "Das entspricht bereits den aktuellen Angaben — bitte ändere mindestens ein Feld.",
      CAN_EDIT_DIRECTLY: "Du kannst Produkte in diesem Laden direkt bearbeiten, ganz ohne Vorschlag.",
    } as const;
    const status = result.error === "NOT_FOUND" || result.error === "PRODUCT_NOT_FOUND" ? 404 : 409;
    return NextResponse.json({ error: messages[result.error] }, { status });
  }

  await notifyModerators(
    "notifyNewSuggestion",
    moderationAlertTemplate({
      headline: `Neuer Produktvorschlag für „${slug}“`,
      detailHtml: `${session.user.name ?? session.user.email} hat einen Produktvorschlag für <strong>„${slug}“</strong> eingereicht, der auf Prüfung wartet.`,
      detailText: `${session.user.name ?? session.user.email} hat einen Produktvorschlag für „${slug}“ eingereicht.`,
      dashboardUrl: `${process.env.NEXTAUTH_URL ?? ""}/admin/moderation`,
    })
  );

  return NextResponse.json({ success: true, suggestion: result.suggestion }, { status: 201 });
}

/** Pending product suggestions for this store's review queue — owner or
 * admin/moderator only. */
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

  const suggestions = await listPendingProductSuggestionsForStore(store.id);
  return NextResponse.json({
    suggestions: suggestions.map((s) => ({
      id: s.id,
      type: s.type,
      changes: parseProductSuggestionChanges(s.changes),
      note: s.note,
      createdAt: s.createdAt.toISOString(),
      suggestedBy: s.suggestedBy,
      product: s.product,
    })),
  });
}
