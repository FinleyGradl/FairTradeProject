// path: src/lib/ownership-transfer.ts
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { cancelSponsorship } from "@/lib/sponsorship";
import { sendMail } from "@/lib/email/mailer";
import {
  transferInviteTemplate,
  transferAcceptedTemplate,
  transferDeclinedTemplate,
} from "@/lib/email/templates";

// How long an invite stays open before it silently expires. Chosen to give
// a successor enough time to notice the email without leaving a stale
// dangling invite around indefinitely.
export const TRANSFER_TTL_DAYS = 14;

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function appUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_APP_URL ?? ""}${path}`;
}

export type InitiateTransferResult =
  | { ok: true; transferId: string }
  | { ok: false; error: "not_owner" | "store_not_found" | "recipient_not_found" | "self" };

/**
 * Starts (or restarts) a transfer invite. Only the store's current,
 * verified owner may call this — see canInitiateTransfer / the API route
 * for the permission check this assumes has already passed.
 */
export async function initiateOwnershipTransfer(params: {
  storeId: string;
  fromUserId: string;
  toEmail: string;
  message?: string | null;
}): Promise<InitiateTransferResult> {
  const { storeId, fromUserId, toEmail, message } = params;

  const store = await prisma.store.findUnique({
    where: { id: storeId },
    select: { id: true, slug: true, name: true, ownerUserId: true },
  });
  if (!store) return { ok: false, error: "store_not_found" };
  if (store.ownerUserId !== fromUserId) return { ok: false, error: "not_owner" };

  const toUser = await prisma.user.findUnique({
    where: { email: toEmail.trim().toLowerCase() },
    select: { id: true, name: true, email: true },
  });
  if (!toUser) return { ok: false, error: "recipient_not_found" };
  if (toUser.id === fromUserId) return { ok: false, error: "self" };

  const fromUser = await prisma.user.findUnique({
    where: { id: fromUserId },
    select: { name: true, email: true },
  });

  // Only one open invite per store — a new one supersedes any earlier one
  // rather than stacking (avoids two different people both being able to
  // "win" an old link).
  await prisma.ownershipTransfer.updateMany({
    where: { storeId, status: "pending" },
    data: { status: "canceled", respondedAt: new Date() },
  });

  const token = generateToken();
  const expiresAt = new Date(Date.now() + TRANSFER_TTL_DAYS * 24 * 60 * 60 * 1000);

  const transfer = await prisma.ownershipTransfer.create({
    data: {
      storeId,
      fromUserId,
      toUserId: toUser.id,
      token,
      message: message?.trim() || null,
      expiresAt,
    },
  });

  const { html, text } = transferInviteTemplate({
    storeName: store.name,
    fromName: fromUser?.name ?? fromUser?.email ?? "Ein Nutzer",
    message: message?.trim() || null,
    acceptUrl: appUrl(`/transfers/${token}`),
    ttlDays: TRANSFER_TTL_DAYS,
  });

  try {
    await sendMail({
      to: toUser.email,
      subject: `Übertragungsanfrage für „${store.name}“`,
      html,
      text,
    });
  } catch (err) {
    console.error("Failed to send ownership transfer invite email", err);
  }

  return { ok: true, transferId: transfer.id };
}

/**
 * Cancels the currently pending outgoing invite for a store, if any.
 * Called by the sender (current owner) changing their mind.
 */
export async function cancelPendingTransfer(storeId: string, fromUserId: string): Promise<boolean> {
  const result = await prisma.ownershipTransfer.updateMany({
    where: { storeId, fromUserId, status: "pending" },
    data: { status: "canceled", respondedAt: new Date() },
  });
  return result.count > 0;
}

export async function getPendingTransferForStore(storeId: string) {
  return prisma.ownershipTransfer.findFirst({
    where: { storeId, status: "pending" },
    include: { toUser: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
}

/** Pending invites addressed to a user — shown on their /me/stores page. */
export async function getIncomingTransfers(userId: string) {
  return prisma.ownershipTransfer.findMany({
    where: { toUserId: userId, status: "pending" },
    include: {
      store: { select: { slug: true, name: true, city: true, coverImage: true } },
      fromUser: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Fetches a transfer by its (unguessable) token for the accept/decline
 * landing page. Auto-expires stale pending invites on read.
 */
export async function getTransferByToken(token: string) {
  const transfer = await prisma.ownershipTransfer.findUnique({
    where: { token },
    include: {
      store: { select: { slug: true, name: true, city: true, addressLine: true, coverImage: true } },
      fromUser: { select: { name: true, email: true } },
      toUser: { select: { id: true, name: true, email: true } },
    },
  });
  if (!transfer) return null;

  if (transfer.status === "pending" && transfer.expiresAt < new Date()) {
    await prisma.ownershipTransfer.update({
      where: { id: transfer.id },
      data: { status: "expired" },
    });
    transfer.status = "expired";
  }

  return transfer;
}

export type RespondResult =
  | { ok: true; status: "accepted" | "declined" }
  | { ok: false; error: "not_found" | "not_recipient" | "not_pending" | "expired" };

/**
 * Accepts or declines a pending invite. Must be called with the session
 * user's id — only the invited recipient may respond.
 */
export async function respondToTransfer(
  token: string,
  userId: string,
  action: "accept" | "decline"
): Promise<RespondResult> {
  const transfer = await prisma.ownershipTransfer.findUnique({
    where: { token },
    include: {
      store: { select: { id: true, slug: true, name: true } },
      fromUser: { select: { email: true } },
      toUser: { select: { name: true, email: true } },
    },
  });
  if (!transfer) return { ok: false, error: "not_found" };
  if (transfer.toUserId !== userId) return { ok: false, error: "not_recipient" };
  if (transfer.status !== "pending") return { ok: false, error: "not_pending" };
  if (transfer.expiresAt < new Date()) {
    await prisma.ownershipTransfer.update({ where: { id: transfer.id }, data: { status: "expired" } });
    return { ok: false, error: "expired" };
  }

  if (action === "decline") {
    await prisma.ownershipTransfer.update({
      where: { id: transfer.id },
      data: { status: "declined", respondedAt: new Date() },
    });

    try {
      const { html, text } = transferDeclinedTemplate({
        storeName: transfer.store.name,
        toName: transfer.toUser.name ?? transfer.toUser.email,
      });
      await sendMail({
        to: transfer.fromUser.email,
        subject: `Übertragungsanfrage für „${transfer.store.name}“ abgelehnt`,
        html,
        text,
      });
    } catch (err) {
      console.error("Failed to send transfer-declined email", err);
    }

    return { ok: true, status: "declined" };
  }

  // Accept: hand over ownership, cancel any running sponsorship (a new
  // owner starts their own if they want one — see the answer this feature
  // was built against), and mark the invite resolved.
  await prisma.$transaction([
    prisma.store.update({
      where: { id: transfer.store.id },
      data: { ownerUserId: userId },
    }),
    prisma.ownershipTransfer.update({
      where: { id: transfer.id },
      data: { status: "accepted", respondedAt: new Date() },
    }),
  ]);

  await cancelSponsorship(transfer.store.id).catch((err) => {
    console.error("Failed to cancel sponsorship during ownership transfer", err);
  });

  try {
    const { html, text } = transferAcceptedTemplate({
      storeName: transfer.store.name,
      toName: transfer.toUser.name ?? transfer.toUser.email,
      storeUrl: appUrl(`/stores/${transfer.store.slug}`),
    });
    await sendMail({
      to: transfer.fromUser.email,
      subject: `Übertragungsanfrage für „${transfer.store.name}“ angenommen`,
      html,
      text,
    });
  } catch (err) {
    console.error("Failed to send transfer-accepted email", err);
  }

  return { ok: true, status: "accepted" };
}