// path: src/app/api/admin/promo-codes/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { setPromoCodeActive, deletePromoCode } from "@/lib/promo-codes";

function requireAdmin(role: string | undefined) {
  return role === "admin";
}

const patchSchema = z.object({ active: z.boolean() });

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || !requireAdmin(session.user.role)) {
    return NextResponse.json({ error: "Nicht berechtigt." }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe." }, { status: 400 });
  }

  const code = await setPromoCodeActive(id, parsed.data.active);
  return NextResponse.json({ code });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || !requireAdmin(session.user.role)) {
    return NextResponse.json({ error: "Nicht berechtigt." }, { status: 403 });
  }

  const { id } = await params;
  await deletePromoCode(id);
  return NextResponse.json({ success: true });
}