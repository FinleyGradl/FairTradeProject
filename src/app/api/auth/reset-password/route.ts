// path: src/app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { resetPasswordSchema } from "@/lib/validators/auth";
import { hashPassword } from "@/lib/auth/password";
import { getValidPasswordResetToken, consumePasswordResetToken } from "@/lib/auth/tokens";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  // Guards against brute-forcing the reset token itself (it's a random
  // string, but defense in depth is cheap here).
  const ip = getClientIp(req);
  const limit = rateLimit(`reset-password:${ip}`, 10, 15 * 60 * 1000);
  if (!limit.success) return rateLimitResponse(limit);

  const body = await req.json().catch(() => null);
  const parsed = resetPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { token, password } = parsed.data;
  const record = await getValidPasswordResetToken(token);

  if (!record) {
    return NextResponse.json(
      { error: "Der Link ist ungültig oder abgelaufen." },
      { status: 400 }
    );
  }

  const passwordHash = await hashPassword(password);

  await prisma.user.update({
    where: { id: record.userId },
    data: { password: passwordHash },
  });
  await consumePasswordResetToken(token);

  return NextResponse.json({ success: true });
}