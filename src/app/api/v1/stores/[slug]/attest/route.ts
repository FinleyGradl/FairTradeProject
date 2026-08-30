import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { castAttestation } from "@/lib/stores";
import { storeAttestationSchema } from "@/lib/validators/store";
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
  const parsed = storeAttestationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const result = await castAttestation(
    slug,
    session.user.id,
    parsed.data.vote,
    parsed.data.reason
  );

  if ("error" in result) {
    const messages = {
      NOT_FOUND: "Laden nicht gefunden.",
      OWN_STORE: "Du kannst deinen eigenen Laden nicht bestätigen oder melden.",
    } as const;
    const status = result.error === "NOT_FOUND" ? 404 : 409;
    return NextResponse.json({ error: messages[result.error] }, { status });
  }

  if (result.justFlagged) {
    await notifyModerators(
      "notifyNewStoreReport",
      moderationAlertTemplate({
        headline: `„${result.store.name}“ zur Prüfung gemeldet`,
        detailHtml: `<strong>„${result.store.name}“</strong> hat genug Community-Disputes gesammelt und wurde aus der öffentlichen Liste genommen, bis ein:e Moderator:in entscheidet.`,
        detailText: `„${result.store.name}“ wurde per Community-Dispute zur Prüfung markiert.`,
        dashboardUrl: `${process.env.NEXTAUTH_URL ?? ""}/admin/moderation`,
      })
    );
  }

  return NextResponse.json({ success: true, store: result.store }, { status: 200 });
}