import { NextResponse } from "next/server";
import { consumeEmailVerificationToken } from "@/lib/auth/tokens";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const token = body?.token;

  if (typeof token !== "string" || !token) {
    return NextResponse.json({ error: "Kein Token angegeben." }, { status: 400 });
  }

  const userId = await consumeEmailVerificationToken(token);

  if (!userId) {
    return NextResponse.json(
      { error: "Der Link ist ungültig oder abgelaufen." },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}