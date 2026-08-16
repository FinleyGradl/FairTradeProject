import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { changeEmailSchema } from "@/lib/validators/profile";
import { verifyPassword } from "@/lib/auth/password";
import { createEmailVerificationToken } from "@/lib/auth/tokens";
import { sendMail } from "@/lib/email/mailer";
import { changeEmailTemplate } from "@/lib/email/templates";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = changeEmailSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { newEmail, currentPassword } = parsed.data;

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return NextResponse.json({ error: "Nutzer nicht gefunden." }, { status: 404 });
  }

  // If the account has a password, require it to confirm this sensitive
  // change (Google-only accounts have no password to check).
  if (user.password) {
    if (!currentPassword) {
      return NextResponse.json(
        { error: "Bitte gib dein aktuelles Passwort ein." },
        { status: 400 }
      );
    }
    const valid = await verifyPassword(currentPassword, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Passwort ist falsch." }, { status: 403 });
    }
  }

  if (newEmail === user.email) {
    return NextResponse.json(
      { error: "Das ist bereits deine aktuelle E-Mail-Adresse." },
      { status: 400 }
    );
  }

  const conflict = await prisma.user.findFirst({
    where: {
      OR: [{ email: newEmail }, { pendingEmail: newEmail }],
      NOT: { id: user.id },
    },
  });
  if (conflict) {
    return NextResponse.json(
      { error: "Diese E-Mail-Adresse wird bereits verwendet." },
      { status: 409 }
    );
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { pendingEmail: newEmail },
  });

  const token = await createEmailVerificationToken(user.id);
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
  const { html, text } = changeEmailTemplate(verifyUrl);

  await sendMail({ to: newEmail, subject: "Bestätige deine neue E-Mail-Adresse", html, text });

  return NextResponse.json({ success: true });
}