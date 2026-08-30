import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { reviewClaim, canModerate } from "@/lib/stores";
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

  const updated = await reviewClaim(id, parsed.data.action, session.user.id);
  if (!updated) {
    return NextResponse.json({ error: "Anfrage nicht gefunden." }, { status: 404 });
  }

  await logAudit({
    actor: session.user,
    action: "claim.review",
    entityType: "StoreClaim",
    entityId: updated.id,
    entityLabel: `Store ${updated.storeId}`,
    metadata: { decision: parsed.data.action },
    request,
  });

  const [store, claimant] = await Promise.all([
    prisma.store.findUnique({ where: { id: updated.storeId }, select: { name: true } }),
    prisma.user.findUnique({ where: { id: updated.userId }, select: { email: true } }),
  ]);
  if (store && claimant) {
    const approved = parsed.data.action === "approve";
    await notifyUser(
      claimant.email,
      contentModeratedTemplate({
        headline: approved
          ? `Du bist jetzt Inhaber:in von „${store.name}“`
          : `Deine Inhaberschafts-Anfrage für „${store.name}“ wurde abgelehnt`,
        detailHtml: approved
          ? `Deine Anfrage, Inhaber:in von <strong>„${store.name}“</strong> zu werden, wurde bestätigt. Du kannst den Eintrag jetzt bearbeiten.`
          : `Deine Anfrage, Inhaber:in von <strong>„${store.name}“</strong> zu werden, wurde abgelehnt.`,
        detailText: approved
          ? `Deine Anfrage für „${store.name}“ wurde bestätigt.`
          : `Deine Anfrage für „${store.name}“ wurde abgelehnt.`,
      })
    );
  }

  return NextResponse.json({ success: true, claim: updated });
}