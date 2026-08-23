// path: src/app/api/v1/stores/[slug]/transfer/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import {
  initiateOwnershipTransfer,
  cancelPendingTransfer,
  getPendingTransferForStore,
} from "@/lib/ownership-transfer";

const ERROR_MESSAGES: Record<string, string> = {
  not_owner: "Nur die aktuelle Inhaber:in kann diesen Laden übertragen.",
  store_not_found: "Laden nicht gefunden.",
  recipient_not_found:
    "Für diese E-Mail-Adresse existiert kein FairFind-Konto. Die Person muss sich zuerst registrieren.",
  self: "Du kannst einen Laden nicht an dich selbst übertragen.",
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { slug } = await params;
  const store = await prisma.store.findUnique({ where: { slug }, select: { id: true, ownerUserId: true } });
  if (!store) {
    return NextResponse.json({ error: "Laden nicht gefunden." }, { status: 404 });
  }
  if (store.ownerUserId !== session.user.id) {
    return NextResponse.json({ error: ERROR_MESSAGES.not_owner }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const toEmail = typeof body?.toEmail === "string" ? body.toEmail.trim() : "";
  const message = typeof body?.message === "string" ? body.message.slice(0, 500) : null;

  if (!toEmail || !toEmail.includes("@")) {
    return NextResponse.json({ error: "Bitte eine gültige E-Mail-Adresse angeben." }, { status: 400 });
  }

  const result = await initiateOwnershipTransfer({
    storeId: store.id,
    fromUserId: session.user.id,
    toEmail,
    message,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: ERROR_MESSAGES[result.error] ?? "Übertragung fehlgeschlagen." },
      { status: result.error === "recipient_not_found" || result.error === "self" ? 400 : 403 }
    );
  }

  return NextResponse.json({ success: true });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { slug } = await params;
  const store = await prisma.store.findUnique({ where: { slug }, select: { id: true, ownerUserId: true } });
  if (!store) {
    return NextResponse.json({ error: "Laden nicht gefunden." }, { status: 404 });
  }
  if (store.ownerUserId !== session.user.id) {
    return NextResponse.json({ error: ERROR_MESSAGES.not_owner }, { status: 403 });
  }

  const pending = await getPendingTransferForStore(store.id);
  return NextResponse.json({
    pending: pending
      ? {
          id: pending.id,
          toUser: pending.toUser,
          message: pending.message,
          expiresAt: pending.expiresAt,
          createdAt: pending.createdAt,
        }
      : null,
  });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { slug } = await params;
  const store = await prisma.store.findUnique({ where: { slug }, select: { id: true, ownerUserId: true } });
  if (!store) {
    return NextResponse.json({ error: "Laden nicht gefunden." }, { status: 404 });
  }
  if (store.ownerUserId !== session.user.id) {
    return NextResponse.json({ error: ERROR_MESSAGES.not_owner }, { status: 403 });
  }

  const canceled = await cancelPendingTransfer(store.id, session.user.id);
  return NextResponse.json({ success: canceled });
}