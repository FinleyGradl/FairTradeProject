import crypto from "crypto";
import { prisma } from "@/lib/db";

const EMAIL_VERIFY_TTL_HOURS = 24;
const PASSWORD_RESET_TTL_MINUTES = 60;

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function createEmailVerificationToken(userId: string) {
  // Invalidate any previous unused tokens for this user first.
  await prisma.emailVerificationToken.updateMany({
    where: { userId, usedAt: null },
    data: { usedAt: new Date() },
  });

  const token = generateToken();
  const expiresAt = new Date(Date.now() + EMAIL_VERIFY_TTL_HOURS * 60 * 60 * 1000);

  await prisma.emailVerificationToken.create({
    data: { token, userId, expiresAt },
  });

  return token;
}

export async function consumeEmailVerificationToken(token: string) {
  const record = await prisma.emailVerificationToken.findUnique({ where: { token } });

  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return null;
  }

  const user = await prisma.user.findUnique({ where: { id: record.userId } });
  if (!user) return null;

  // If this token was issued for an email *change* (pendingEmail is set),
  // completing it swaps the address instead of just flagging it verified.
  const userUpdateData = user.pendingEmail
    ? { email: user.pendingEmail, pendingEmail: null, emailVerified: new Date() }
    : { emailVerified: new Date() };

  await prisma.$transaction([
    prisma.emailVerificationToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    }),
    prisma.user.update({
      where: { id: record.userId },
      data: userUpdateData,
    }),
  ]);

  return record.userId;
}

export async function createPasswordResetToken(userId: string) {
  await prisma.passwordResetToken.updateMany({
    where: { userId, usedAt: null },
    data: { usedAt: new Date() },
  });

  const token = generateToken();
  const expiresAt = new Date(Date.now() + PASSWORD_RESET_TTL_MINUTES * 60 * 1000);

  await prisma.passwordResetToken.create({
    data: { token, userId, expiresAt },
  });

  return token;
}

export async function getValidPasswordResetToken(token: string) {
  const record = await prisma.passwordResetToken.findUnique({ where: { token } });

  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return null;
  }

  return record;
}

export async function consumePasswordResetToken(token: string) {
  await prisma.passwordResetToken.update({
    where: { token },
    data: { usedAt: new Date() },
  });
}