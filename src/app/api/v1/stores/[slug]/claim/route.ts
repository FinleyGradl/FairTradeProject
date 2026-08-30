import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createStoreClaim } from "@/lib/stores";
import { storeClaimSchema } from "@/lib/validators/store";
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
  const parsed = storeClaimSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const result = await createStoreClaim(slug, session.user.id, parsed.data);

  if ("error" in result) {
    const messages = {
      NOT_FOUND: "Laden nicht gefunden.",
      ALREADY_OWNER: "Du bist bereits als Inhaber:in dieses Ladens eingetragen.",
      ALREADY_PENDING: "Du hast für diesen Laden bereits eine offene Anfrage.",
    } as const;
    const status = result.error === "NOT_FOUND" ? 404 : 409;
    return NextResponse.json({ error: messages[result.error] }, { status });
  }

  await notifyModerators(
    "notifyNewClaim",
    moderationAlertTemplate({
      headline: `Neue Inhaberschafts-Anfrage für „${slug}“`,
      detailHtml: `${session.user.name ?? session.user.email} möchte Inhaber:in von <strong>„${slug}“</strong> werden und wartet auf Prüfung.`,
      detailText: `${session.user.name ?? session.user.email} möchte Inhaber:in von „${slug}“ werden.`,
      dashboardUrl: `${process.env.NEXTAUTH_URL ?? ""}/admin/moderation`,
    })
  );

  return NextResponse.json({ success: true, claim: result.claim }, { status: 201 });
}