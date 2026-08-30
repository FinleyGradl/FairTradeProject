// path: src/app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { forgotPasswordSchema } from "@/lib/validators/auth";
import { createPasswordResetToken } from "@/lib/auth/tokens";
import { sendMail } from "@/lib/email/mailer";
import { resetPasswordTemplate } from "@/lib/email/templates";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  // Per-IP cap first (cheap, blunt) so we don't even parse the body under
  // a flood.
  const ip = getClientIp(req);
  const ipLimit = rateLimit(`forgot-password:ip:${ip}`, 8, 15 * 60 * 1000);
  if (!ipLimit.success) return rateLimitResponse(ipLimit);

  const body = await req.json().catch(() => null);
  const parsed = forgotPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe." }, { status: 400 });
  }

  const { email } = parsed.data;

  // Per-email cap too — stops someone spamming a single victim's inbox
  // with reset emails from many different IPs.
  const emailLimit = rateLimit(`forgot-password:email:${email}`, 5, 15 * 60 * 1000);
  if (!emailLimit.success) return rateLimitResponse(emailLimit);
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