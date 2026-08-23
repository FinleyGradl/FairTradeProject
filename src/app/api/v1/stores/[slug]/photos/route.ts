// path: src/app/api/v1/stores/[slug]/photos/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { addStorePhoto } from "@/lib/stores";
import {
  isAllowedStoreImageType,
  isAllowedStoreImageSize,
  saveStorePhotoFile,
} from "@/lib/uploads";

// Any signed-in user can add a photo to a store's gallery — unlike the
// cover image (owner/admin only), this is a community gallery. Moderation
// happens after the fact via reports; see /api/v1/photos/[photoId]/report
// and lib/stores.ts#listReportedPhotos.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { slug } = await params;
  const store = await prisma.store.findUnique({ where: { slug }, select: { id: true } });
  if (!store) {
    return NextResponse.json({ error: "Laden nicht gefunden." }, { status: 404 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("photo");
  const captionRaw = formData?.get("caption");
  const caption = typeof captionRaw === "string" ? captionRaw.slice(0, 200) : null;

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Keine Bilddatei erhalten." }, { status: 400 });
  }
  if (!isAllowedStoreImageType(file.type)) {
    return NextResponse.json({ error: "Nur JPG, PNG oder WebP erlaubt." }, { status: 400 });
  }
  if (!isAllowedStoreImageSize(file.size)) {
    return NextResponse.json({ error: "Bild darf maximal 5 MB groß sein." }, { status: 400 });
  }

  const url = await saveStorePhotoFile(store.id, file);
  const photo = await addStorePhoto(store.id, session.user.id, url, caption);

  return NextResponse.json({
    success: true,
    photo: {
      id: photo.id,
      url: photo.url,
      caption: photo.caption,
      createdAt: photo.createdAt,
      uploadedBy: { id: session.user.id, name: session.user.name ?? null },
      reportCount: 0,
      reportedByMe: false,
    },
  });
}