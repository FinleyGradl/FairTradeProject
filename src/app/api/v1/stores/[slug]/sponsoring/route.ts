import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getActiveSponsorship, canManageSponsorship, startSponsorship, cancelSponsorship } from "@/lib/sponsorship";
import { SPONSORSHIP_TIERS } from "@/lib/constants";
import { logAudit } from "@/lib/audit";
import { notifyModerators, notifyUser } from "@/lib/notify";
import { moderationAlertTemplate, sponsorshipCanceledOwnerTemplate } from "@/lib/email/templates";

const startSchema = z.object({
  tier: z.enum(["basic", "plus", "top"]),
  promoCode: z.string().trim().max(40).optional(),
});

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { slug } = await params;
  const store = await prisma.store.findUnique({ where: { slug } });
  if (!store) return NextResponse.json({ error: "Laden nicht gefunden." }, { status: 404 });

  if (!(await canManageSponsorship(store, session.user))) {
    return NextResponse.json({ error: "Nicht berechtigt." }, { status: 403 });
  }

  const sponsorship = await getActiveSponsorship(store.id);
  return NextResponse.json({ sponsorship, tiers: SPONSORSHIP_TIERS });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { slug } = await params;
  const store = await prisma.store.findUnique({ where: { slug } });
  if (!store) return NextResponse.json({ error: "Laden nicht gefunden." }, { status: 404 });

  if (!(await canManageSponsorship(store, session.user))) {
    return NextResponse.json(
      { error: "Nur bestätigte Inhaber:innen können ein Sponsoring abschließen." },
      { status: 403 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = startSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe." }, { status: 400 });
  }

  try {
    const result = await startSponsorship({
      storeId: store.id,
      ownerUserId: session.user.id,
      ownerEmail: session.user.email!,
      ownerName: session.user.name,
      tier: parsed.data.tier,
      promoCode: parsed.data.promoCode,
    });

    await logAudit({
      actor: session.user,
      action: "subscription.start",
      entityType: "SponsorshipSubscription",
      entityId: result.subscriptionId,
      entityLabel: `${store.name} (${parsed.data.tier})`,
      metadata: {
        storeSlug: slug,
        tier: parsed.data.tier,
        promoCode: parsed.data.promoCode ?? null,
        redeemedPromo: result.redeemedPromo,
      },
      request,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("POST sponsoring:", error);
    const message = error instanceof Error ? error.message : "Sponsoring konnte nicht gestartet werden.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { slug } = await params;
  const store = await prisma.store.findUnique({ where: { slug } });
  if (!store) return NextResponse.json({ error: "Laden nicht gefunden." }, { status: 404 });

  if (!(await canManageSponsorship(store, session.user))) {
    return NextResponse.json({ error: "Nicht berechtigt." }, { status: 403 });
  }

  const canceled = await cancelSponsorship(store.id);
  if (!canceled) {
    return NextResponse.json({ error: "Kein aktives Sponsoring gefunden." }, { status: 404 });
  }

  await logAudit({
    actor: session.user,
    action: "subscription.cancel",
    entityType: "SponsorshipSubscription",
    entityId: canceled.id,
    entityLabel: `${store.name} (${canceled.tier})`,
    metadata: { storeSlug: slug, tier: canceled.tier, initiatedByRole: session.user.role },
    request,
  });

  const tierLabel = SPONSORSHIP_TIERS[canceled.tier as keyof typeof SPONSORSHIP_TIERS]?.label ?? canceled.tier;
  const owner = await prisma.user.findUnique({
    where: { id: canceled.ownerUserId },
    select: { email: true },
  });
  if (owner) {
    await notifyUser(
      owner.email,
      sponsorshipCanceledOwnerTemplate({
        storeName: store.name,
        tierLabel,
        activeUntil: canceled.currentPeriodEnd
          ? canceled.currentPeriodEnd.toLocaleDateString("de-DE")
          : null,
      })
    );
  }
  await notifyModerators(
    "notifySponsorshipCanceled",
    moderationAlertTemplate({
      headline: `Sponsoring gekündigt: „${store.name}“`,
      detailHtml: `Das <strong>${tierLabel}</strong>-Sponsoring von <strong>„${store.name}“</strong> wurde gekündigt${
        session.user.role === "admin" || session.user.role === "moderator"
          ? ` (von ${session.user.name ?? session.user.email})`
          : " (vom Inhaber)"
      }.`,
      detailText: `Das ${tierLabel}-Sponsoring von „${store.name}“ wurde gekündigt.`,
      dashboardUrl: `${process.env.NEXTAUTH_URL ?? ""}/admin/sponsoring`,
    })
  );

  return NextResponse.json({ success: true, sponsorship: canceled });
}