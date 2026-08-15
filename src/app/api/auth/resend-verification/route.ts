import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { createEmailVerificationToken } from "@/lib/auth/tokens";
import { sendMail } from "@/lib/email/mailer";
import { verifyEmailTemplate } from "@/lib/email/templates";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe." }, { status: 400 });
  }

  const { email } = parsed.data;
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