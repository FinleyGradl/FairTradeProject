import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getStoreForEdit, canEditStore } from "@/lib/stores";
import {
  isAllowedStoreImageType,
  isAllowedStoreImageSize,
  saveStoreCoverFile,
  deleteStoreCoverFileIfLocal,
} from "@/lib/uploads";

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
    return NextResponse.json(
      { error: "Du darfst diesen Laden nicht bearbeiten." },
      { status: 403 }
    );
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("cover");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Keine Bilddatei erhalten." }, { status: 400 });
  }

  if (!isAllowedStoreImageType(file.type)) {
    return NextResponse.json(
      { error: "Nur JPG, PNG oder WebP erlaubt." },
      { status: 400 }
    );
  }

  if (!isAllowedStoreImageSize(file.size)) {
    return NextResponse.json({ error: "Bild darf maximal 5 MB groß sein." }, { status: 400 });
  }

  const coverImage = await saveStoreCoverFile(store.id, file);

  await prisma.store.update({
    where: { id: store.id },
    data: { coverImage },
  });

  // Best-effort cleanup of the previous local file — don't fail the
  // request over it.
  await deleteStoreCoverFileIfLocal(store.coverImage).catch(() => {});

  return NextResponse.json({ success: true, coverImage });
}

export async function DELETE(
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
  if (!canEditStore(store, session.user)) {
    return NextResponse.json(
      { error: "Du darfst diesen Laden nicht bearbeiten." },
      { status: 403 }
    );
  }

  await prisma.store.update({
    where: { id: store.id },
    data: { coverImage: null },
  });

  await deleteStoreCoverFileIfLocal(store.coverImage).catch(() => {});

  return NextResponse.json({ success: true });
}
