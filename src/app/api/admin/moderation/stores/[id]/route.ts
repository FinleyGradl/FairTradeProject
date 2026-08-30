import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { reviewFlaggedStore, canModerate } from "@/lib/stores";
import { moderationActionSchema } from "@/lib/validators/store";
import { logAudit } from "@/lib/audit";
import { prisma } from "@/lib/db";
import { notifyUser } from "@/lib/notify";
import { contentModeratedTemplate } from "@/lib/email/templates";

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

  await logAudit({
    actor: session.user,
    action: "store.moderate",
    entityType: "Store",
    entityId: updated.id,
    entityLabel: updated.name,
    metadata: { decision: parsed.data.action },
    request,
  });

  const responsibleUserId = updated.ownerUserId ?? updated.createdById;
  if (responsibleUserId) {
    const responsible = await prisma.user.findUnique({
      where: { id: responsibleUserId },
      select: { email: true },
    });
    if (responsible) {
      const approved = parsed.data.action === "approve";
      await notifyUser(
        responsible.email,
        contentModeratedTemplate({
          headline: approved
            ? `„${updated.name}“ ist wieder öffentlich gelistet`
            : `„${updated.name}“ wurde abgelehnt`,
          detailHtml: approved
            ? `Nach Prüfung durch ein:e Moderator:in ist <strong>„${updated.name}“</strong> wieder öffentlich in der Suche gelistet.`
            : `Nach Prüfung durch ein:e Moderator:in wurde <strong>„${updated.name}“</strong> abgelehnt und bleibt aus der öffentlichen Liste entfernt.`,
          detailText: approved
            ? `„${updated.name}“ ist wieder öffentlich gelistet.`
            : `„${updated.name}“ wurde abgelehnt.`,
        })
      );
    }
  }

  return NextResponse.json({ success: true, store: updated });
}