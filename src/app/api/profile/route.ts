import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { updateProfileSchema, deleteAccountSchema } from "@/lib/validators/profile";
import { verifyPassword } from "@/lib/auth/password";
import { deleteAvatarFileIfLocal } from "@/lib/uploads";

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = updateProfileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { name: parsed.data.name },
    select: { id: true, name: true },
  });

  return NextResponse.json({ success: true, user });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = deleteAccountSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { confirmEmail, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return NextResponse.json({ error: "Nutzer nicht gefunden." }, { status: 404 });
  }

  if (confirmEmail.trim().toLowerCase() !== user.email.toLowerCase()) {
    return NextResponse.json(
      { error: "Die eingegebene E-Mail-Adresse stimmt nicht mit deinem Konto überein." },
      { status: 400 }
    );
  }

  if (user.password) {
    if (!password) {
      return NextResponse.json(
        { error: "Bitte gib dein Passwort ein." },
        { status: 400 }
      );
    }
    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Passwort ist falsch." }, { status: 403 });
    }
  }

  // Stores are public directory listings, not private user content — we
  // don't want to silently delete them (and their reviews/products) just
  // because the creator's account goes away. createdById is a required
  // field on Store, so we can't null it out either. Ask the user to
  // transfer or remove those stores first.
  const createdStoreCount = await prisma.store.count({ where: { createdById: user.id } });
  if (createdStoreCount > 0) {
    return NextResponse.json(
      {
        error:
          "Du hast noch Läden angelegt, die mit deinem Konto verknüpft sind. Bitte übertrage die Inhaberschaft oder wende dich an den Support, bevor du dein Konto löschst.",
      },
      { status: 409 }
    );
  }

  await prisma.$transaction([
    // Stores the user owns (but didn't create) — just detach, don't delete.
    prisma.store.updateMany({ where: { ownerUserId: user.id }, data: { ownerUserId: null } }),
    // Claims the user reviewed as a moderator — detach, keep the claim record.
    prisma.storeClaim.updateMany({ where: { reviewedBy: user.id }, data: { reviewedBy: null } }),
    // Everything else (reviews, saved stores/products, own claims, sessions,
    // accounts, verification/reset tokens) cascades via the schema.
    prisma.user.delete({ where: { id: user.id } }),
  ]);

  await deleteAvatarFileIfLocal(user.avatarUrl).catch(() => {});

  return NextResponse.json({ success: true });
}