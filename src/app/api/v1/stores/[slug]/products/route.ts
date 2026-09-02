// path: src/app/api/v1/stores/[slug]/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getStoreForEdit, canEditStore } from "@/lib/stores";
import { createProduct, listProductsForStore, canEditProduct } from "@/lib/products";
import { productCreateSchema } from "@/lib/validators/product";
import { logAudit } from "@/lib/audit";

/** Owner/admin management list — includes each product's review count.
 * Public browsing goes through GET /api/v1/products?store_id=... instead. */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { slug } = await params;
  const store = await getStoreForEdit(slug);
  if (!store) {
    return NextResponse.json({ error: "Laden nicht gefunden." }, { status: 404 });
  }
  if (!canEditProduct(store, session.user)) {
    return NextResponse.json({ error: "Keine Berechtigung." }, { status: 403 });
  }

  const products = await listProductsForStore(store.id);
  return NextResponse.json({ products });
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
  const store = await getStoreForEdit(slug);
  if (!store) {
    return NextResponse.json({ error: "Laden nicht gefunden." }, { status: 404 });
  }
  if (!canEditStore(store, session.user)) {
    return NextResponse.json({ error: "Keine Berechtigung." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = productCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const product = await createProduct(store.id, parsed.data);

  await logAudit({
    actor: session.user,
    action: "product.create",
    entityType: "Product",
    entityId: product.id,
    entityLabel: `${product.name} (${slug})`,
    request,
  });

  return NextResponse.json({ success: true, product }, { status: 201 });
}
