import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validators/auth";
import { hashPassword } from "@/lib/auth/password";
import { createEmailVerificationToken } from "@/lib/auth/tokens";
import { sendMail } from "@/lib/email/mailer";
import { verifyEmailTemplate } from "@/lib/email/templates";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // Don't reveal whether the account has a password or is Google-only —
    // just a generic conflict message.
    return NextResponse.json(
      { error: "Für diese E-Mail-Adresse existiert bereits ein Konto." },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: { name, email, password: passwordHash },
  });

  const token = await createEmailVerificationToken(user.id);
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
  const { html, text } = verifyEmailTemplate(verifyUrl);

  try {
    await sendMail({ to: email, subject: "Bestätige deine E-Mail-Adresse", html, text });
  } catch (err) {
    // Account is created either way — surface a clear message so the user
    // knows to request a new verification email instead of losing the account.
    console.error("Failed to send verification email", err);
    return NextResponse.json(
      {
        warning:
          "Konto wurde erstellt, aber die Bestätigungs-E-Mail konnte nicht gesendet werden. Bitte fordere sie erneut an.",
      },
      { status: 201 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}