import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { removeAdminVerification, canModerate } from "@/lib/stores";
import { logAudit } from "@/lib/audit";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!canModerate(session?.user) || !session?.user) {
    return NextResponse.json({ error: "Keine Berechtigung." }, { status: 403 });
  }

  const { id } = await params;
  const updated = await removeAdminVerification(id);
  if (!updated) {
    return NextResponse.json({ error: "Laden nicht gefunden." }, { status: 404 });
  }

  await logAudit({
    actor: session.user,
    action: "store.unverify",
    entityType: "Store",
    entityId: updated.id,
    entityLabel: updated.name,
    metadata: { newVerificationLevel: updated.verificationLevel },
    request,
  });

  return NextResponse.json({ success: true, store: updated });
}