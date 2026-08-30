// path: src/app/api/v1/stores/[slug]/photos/[photoId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { canDeletePhoto, deleteStorePhoto, canModerate } from "@/lib/stores";
import { deleteStorePhotoFileIfLocal } from "@/lib/uploads";
import { logAudit } from "@/lib/audit";
import { notifyUser } from "@/lib/notify";
import { contentModeratedTemplate } from "@/lib/email/templates";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; photoId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { slug, photoId } = await params;
  const store = await prisma.store.findUnique({
    where: { slug },
    select: { id: true, name: true, ownerUserId: true, createdById: true },
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

  const isModeratorDeletingOthers = canModerate(session.user) && photo.uploadedByUserId !== session.user.id;

  await logAudit({
    actor: session.user,
    action: "photo.delete",
    entityType: "StorePhoto",
    entityId: photo.id,
    entityLabel: `Foto von ${store.name}`,
    metadata: { storeSlug: slug, byModerator: isModeratorDeletingOthers },
    request,
  });

  if (isModeratorDeletingOthers && photo.uploadedByUserId) {
    const uploader = await prisma.user.findUnique({
      where: { id: photo.uploadedByUserId },
      select: { email: true },
    });
    if (uploader) {
      await notifyUser(
        uploader.email,
        contentModeratedTemplate({
          headline: `Dein Foto bei „${store.name}“ wurde entfernt`,
          detailHtml: `Ein:e Moderator:in hat ein von dir hochgeladenes Foto bei <strong>„${store.name}“</strong> entfernt, da es gegen unsere Richtlinien verstößt oder mehrfach gemeldet wurde.`,
          detailText: `Dein Foto bei „${store.name}“ wurde von der Moderation entfernt.`,
        })
      );
    }
  }

  return NextResponse.json({ success: true });
}