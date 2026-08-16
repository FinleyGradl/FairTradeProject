import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { changePasswordSchema } from "@/lib/validators/profile";
import { verifyPassword, hashPassword } from "@/lib/auth/password";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = changePasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { currentPassword, newPassword } = parsed.data;

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return NextResponse.json({ error: "Nutzer nicht gefunden." }, { status: 404 });
  }

  // Accounts that signed up via Google may not have a password yet — in
  // that case this call *sets* the first one instead of *changing* it.
  if (user.password) {
    if (!currentPassword) {
      return NextResponse.json(
        { error: "Bitte gib dein aktuelles Passwort ein." },
        { status: 400 }
      );
    }
    const valid = await verifyPassword(currentPassword, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Aktuelles Passwort ist falsch." }, { status: 403 });
    }
  }

  const passwordHash = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: passwordHash },
  });

  return NextResponse.json({ success: true, hadPassword: Boolean(user.password) });
}