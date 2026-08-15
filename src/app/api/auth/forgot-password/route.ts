import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { forgotPasswordSchema } from "@/lib/validators/auth";
import { createPasswordResetToken } from "@/lib/auth/tokens";
import { sendMail } from "@/lib/email/mailer";
import { resetPasswordTemplate } from "@/lib/email/templates";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = forgotPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe." }, { status: 400 });
  }

  const { email } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });

  // Always return success — never reveal whether an account exists for
  // this email (prevents account enumeration).
  if (user && user.password) {
    const token = await createPasswordResetToken(user.id);
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
    const { html, text } = resetPasswordTemplate(resetUrl);

    await sendMail({ to: email, subject: "Passwort zurücksetzen", html, text }).catch((err) =>
      console.error("Failed to send password reset email", err)
    );
  }

  return NextResponse.json({ success: true });
}