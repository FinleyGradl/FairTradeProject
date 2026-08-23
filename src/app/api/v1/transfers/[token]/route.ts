// path: src/app/api/v1/transfers/[token]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getTransferByToken, respondToTransfer } from "@/lib/ownership-transfer";

const ERROR_MESSAGES: Record<string, string> = {
  not_found: "Diese Einladung existiert nicht (mehr).",
  not_recipient: "Diese Einladung ist nicht für dein Konto bestimmt.",
  not_pending: "Diese Einladung wurde bereits beantwortet oder storniert.",
  expired: "Diese Einladung ist abgelaufen.",
};

// Token is a 32-byte random capability string (same pattern as email
// verification / password reset tokens) — safe to read without further
// auth, the accept/decline action below still requires the invited user's
// session.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const transfer = await getTransferByToken(token);
  if (!transfer) {
    return NextResponse.json({ error: ERROR_MESSAGES.not_found }, { status: 404 });
  }

  return NextResponse.json({
    status: transfer.status,
    message: transfer.message,
    expiresAt: transfer.expiresAt,
    store: transfer.store,
    fromUser: { name: transfer.fromUser.name },
    toUser: { name: transfer.toUser.name, email: transfer.toUser.email },
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { token } = await params;
  const body = await request.json().catch(() => null);
  const action = body?.action;
  if (action !== "accept" && action !== "decline") {
    return NextResponse.json({ error: "Ungültige Aktion." }, { status: 400 });
  }

  const result = await respondToTransfer(token, session.user.id, action);
  if (!result.ok) {
    return NextResponse.json(
      { error: ERROR_MESSAGES[result.error] ?? "Aktion fehlgeschlagen." },
      { status: result.error === "not_recipient" ? 403 : 400 }
    );
  }

  return NextResponse.json({ success: true, status: result.status });
}