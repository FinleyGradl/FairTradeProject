// path: src/app/api/v1/stores/[slug]/product-suggestions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { reviewProductSuggestion } from "@/lib/products";
import { moderationActionSchema } from "@/lib/validators/store";
import { logAudit } from "@/lib/audit";
import { prisma } from "@/lib/db";
import { notifyUser } from "@/lib/notify";
import { contentModeratedTemplate } from "@/lib/email/templates";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { slug, id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = moderationActionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe." }, { status: 400 });
  }

  const result = await reviewProductSuggestion(id, parsed.data.action, session.user);

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

  await logAudit({
    actor: session.user,
    action: "product_suggestion.review",
    entityType: "ProductSuggestion",
    entityId: id,
    entityLabel: `Produktvorschlag für ${slug}`,
    metadata: { decision: parsed.data.action, storeSlug: slug },
    request,
  });

  const suggestion = await prisma.productSuggestion.findUnique({
    where: { id },
    include: { store: { select: { name: true, ownerUserId: true } }, suggestedBy: { select: { email: true } } },
  });
  if (suggestion && suggestion.store.ownerUserId !== session.user.id && suggestion.suggestedBy) {
    const approved = parsed.data.action === "approve";
    await notifyUser(
      suggestion.suggestedBy.email,
      contentModeratedTemplate({
        headline: approved
          ? `Dein Produktvorschlag für „${suggestion.store.name}“ wurde übernommen`
          : `Dein Produktvorschlag für „${suggestion.store.name}“ wurde abgelehnt`,
        detailHtml: approved
          ? `Dein Produktvorschlag für <strong>„${suggestion.store.name}“</strong> wurde geprüft und übernommen.`
          : `Dein Produktvorschlag für <strong>„${suggestion.store.name}“</strong> wurde geprüft und abgelehnt.`,
        detailText: approved
          ? `Dein Produktvorschlag für „${suggestion.store.name}“ wurde übernommen.`
          : `Dein Produktvorschlag für „${suggestion.store.name}“ wurde abgelehnt.`,
      })
    );
  }

  return NextResponse.json({ success: true });
}
