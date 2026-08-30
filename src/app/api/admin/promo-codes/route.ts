// path: src/app/api/admin/promo-codes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { listPromoCodes, createPromoCode } from "@/lib/promo-codes";
import { logAudit } from "@/lib/audit";

function requireAdmin(role: string | undefined) {
  return role === "admin";
}

export async function GET() {
  const session = await auth();
  if (!session?.user || !requireAdmin(session.user.role)) {
    return NextResponse.json({ error: "Nicht berechtigt." }, { status: 403 });
  }
  const codes = await listPromoCodes();
  return NextResponse.json({ codes });
}

const createSchema = z.object({
  code: z.string().trim().max(40).optional(),
  discountPercent: z.number().int().min(1).max(100),
  label: z.string().trim().max(200).optional(),
  maxRedemptions: z.number().int().min(1).optional(),
  expiresAt: z.string().datetime().optional(),
});

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user || !requireAdmin(session.user.role)) {
    return NextResponse.json({ error: "Nicht berechtigt." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe." }, { status: 400 });
  }

  try {
    const code = await createPromoCode({
      code: parsed.data.code,
      discountPercent: parsed.data.discountPercent,
      label: parsed.data.label,
      maxRedemptions: parsed.data.maxRedemptions ?? null,
      expiresAt: parsed.data.expiresAt ? new Date(parsed.data.expiresAt) : null,
      createdByUserId: session.user.id,
    });

    await logAudit({
      actor: session.user,
      action: "promo_code.create",
      entityType: "PromoCode",
      entityId: code.id,
      entityLabel: code.code,
      metadata: { discountPercent: code.discountPercent, maxRedemptions: code.maxRedemptions },
      request,
    });

    return NextResponse.json({ code }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Code konnte nicht erstellt werden.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}