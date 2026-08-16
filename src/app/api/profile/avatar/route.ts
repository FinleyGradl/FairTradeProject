import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import {
  isAllowedAvatarType,
  isAllowedAvatarSize,
  saveAvatarFile,
  deleteAvatarFileIfLocal,
} from "@/lib/uploads";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const formData = await req.formData().catch(() => null);
  const file = formData?.get("avatar");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Keine Bilddatei erhalten." }, { status: 400 });
  }

  if (!isAllowedAvatarType(file.type)) {
    return NextResponse.json(
      { error: "Nur JPG, PNG oder WebP erlaubt." },
      { status: 400 }
    );
  }

  if (!isAllowedAvatarSize(file.size)) {
    return NextResponse.json({ error: "Bild darf maximal 5 MB groß sein." }, { status: 400 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { avatarUrl: true },
  });

  const avatarUrl = await saveAvatarFile(session.user.id, file);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { avatarUrl },
  });

  // Best-effort cleanup of the previous local file — don't fail the
  // request over it.
  await deleteAvatarFileIfLocal(currentUser?.avatarUrl ?? null).catch(() => {});

  return NextResponse.json({ success: true, avatarUrl });
}

export async function DELETE() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { avatarUrl: true },
  });

  await prisma.user.update({
    where: { id: session.user.id },
    data: { avatarUrl: null },
  });

  await deleteAvatarFileIfLocal(currentUser?.avatarUrl ?? null).catch(() => {});

  return NextResponse.json({ success: true });
}