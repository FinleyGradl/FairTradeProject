import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getStoreBySlug,
  getStoreForEdit,
  updateStore,
  deleteStore,
  canEditStore,
  canDeleteStore,
  canModerate,
  serializeStore,
} from "@/lib/stores";
import { storeUpdateSchema } from "@/lib/validators/store";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const store = await getStoreBySlug(slug);
    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }
    return NextResponse.json(store);
  } catch (error) {
    console.error("GET /api/v1/stores/[slug]:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { slug } = await params;
  const existing = await getStoreForEdit(slug);
  if (!existing) {
    return NextResponse.json({ error: "Laden nicht gefunden." }, { status: 404 });
  }
  if (!canEditStore(existing, session.user)) {
    return NextResponse.json(
      { error: "Du darfst diesen Laden nicht bearbeiten." },
      { status: 403 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = storeUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const isTrustedEditor = canModerate(session.user);
    const updated = await updateStore(slug, parsed.data, { resetVerification: !isTrustedEditor });
    if (!updated) {
      return NextResponse.json({ error: "Laden nicht gefunden." }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      store: serializeStore({ ...updated, avgRating: null, reviewCount: 0 }),
    });
  } catch (error) {
    console.error("PATCH /api/v1/stores/[slug]:", error);
    return NextResponse.json({ error: "Speichern fehlgeschlagen." }, { status: 500 });
  }
}

/**
 * Permanently deletes a store — the confirmed owner may delete their own
 * listing, admins/moderators may delete any. See canDeleteStore() and
 * deleteStore() in lib/stores.ts for the authorization rule and the
 * cleanup (Mollie subscription, uploaded files) this triggers.
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { slug } = await params;
  const existing = await getStoreForEdit(slug);
  if (!existing) {
    return NextResponse.json({ error: "Laden nicht gefunden." }, { status: 404 });
  }
  if (!canDeleteStore(existing, session.user)) {
    return NextResponse.json(
      { error: "Du darfst diesen Laden nicht löschen." },
      { status: 403 }
    );
  }

  try {
    const result = await deleteStore(slug);
    if ("error" in result) {
      return NextResponse.json({ error: "Laden nicht gefunden." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/v1/stores/[slug]:", error);
    return NextResponse.json({ error: "Löschen fehlgeschlagen." }, { status: 500 });
  }
}