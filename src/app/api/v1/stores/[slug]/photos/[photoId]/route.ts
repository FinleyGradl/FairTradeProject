// path: src/app/api/v1/stores/[slug]/photos/[photoId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { canDeletePhoto, deleteStorePhoto } from "@/lib/stores";
import { deleteStorePhotoFileIfLocal } from "@/lib/uploads";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string; photoId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { slug, photoId } = await params;
  const store = await prisma.store.findUnique({
    where: { slug },
    select: { id: true, ownerUserId: true, createdById: true },
  });
  if (!store) {
    return NextResponse.json({ error: "Laden nicht gefunden." }, { status: 404 });
  }

  const photo = await prisma.storePhoto.findUnique({ where: { id: photoId } });
  if (!photo || photo.storeId !== store.id) {
    return NextResponse.json({ error: "Foto nicht gefunden." }, { status: 404 });
  }

  if (!canDeletePhoto(photo, store, session.user)) {
    return NextResponse.json(
      { error: "Du darfst dieses Foto nicht entfernen." },
      { status: 403 }
    );
  }

  await deleteStorePhoto(photo.id);
  await deleteStorePhotoFileIfLocal(photo.url).catch(() => {});

  return NextResponse.json({ success: true });
}