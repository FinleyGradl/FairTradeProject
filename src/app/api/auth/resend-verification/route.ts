// path: src/app/api/auth/resend-verification/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { createEmailVerificationToken } from "@/lib/auth/tokens";
import { sendMail } from "@/lib/email/mailer";
import { verifyEmailTemplate } from "@/lib/email/templates";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const ipLimit = rateLimit(`resend-verification:ip:${ip}`, 8, 15 * 60 * 1000);
  if (!ipLimit.success) return rateLimitResponse(ipLimit);

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe." }, { status: 400 });
  }

  const { email } = parsed.data;

  const emailLimit = rateLimit(`resend-verification:email:${email}`, 5, 15 * 60 * 1000);
  if (!emailLimit.success) return rateLimitResponse(emailLimit);
  const user = await prisma.user.findUnique({ where: { email } });

  // Always respond with success to avoid leaking whether an account exists.
  if (!user || user.emailVerified) {
    return NextResponse.json({ success: true });
  }

  const token = await createEmailVerificationToken(user.id);
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
  const { html, text } = verifyEmailTemplate(verifyUrl);

  await sendMail({ to: email, subject: "Bestätige deine E-Mail-Adresse", html, text });

  return NextResponse.json({ success: true });
}