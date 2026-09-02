// path: src/app/api/v1/products/[productId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { canEditProduct } from "@/lib/products";
import { updateProduct, deleteProduct } from "@/lib/products";
import { productUpdateSchema } from "@/lib/validators/product";
import { logAudit } from "@/lib/audit";

async function loadProductWithStore(productId: string) {
  return prisma.product.findUnique({ where: { id: productId }, include: { store: true } });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { store: { select: { slug: true, name: true, city: true } } },
  });
  if (!product) {
    return NextResponse.json({ error: "Produkt nicht gefunden." }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { productId } = await params;
  const existing = await loadProductWithStore(productId);
  if (!existing) {
    return NextResponse.json({ error: "Produkt nicht gefunden." }, { status: 404 });
  }
  if (!canEditProduct(existing.store, session.user)) {
    return NextResponse.json({ error: "Keine Berechtigung." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = productUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const product = await updateProduct(productId, parsed.data);

  await logAudit({
    actor: session.user,
    action: "product.update",
    entityType: "Product",
    entityId: product.id,
    entityLabel: `${product.name} (${existing.store.slug})`,
    request,
  });

  return NextResponse.json({ success: true, product });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { productId } = await params;
  const existing = await loadProductWithStore(productId);
  if (!existing) {
    return NextResponse.json({ error: "Produkt nicht gefunden." }, { status: 404 });
  }
  if (!canEditProduct(existing.store, session.user)) {
    return NextResponse.json({ error: "Keine Berechtigung." }, { status: 403 });
  }

  await deleteProduct(productId);

  await logAudit({
    actor: session.user,
    action: "product.delete",
    entityType: "Product",
    entityId: productId,
    entityLabel: `${existing.name} (${existing.store.slug})`,
    request,
  });

  return NextResponse.json({ success: true });
}
