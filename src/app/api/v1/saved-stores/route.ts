// path: src/app/api/v1/saved-stores/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getSavedStores } from "@/lib/stores";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const stores = await getSavedStores(session.user.id);
  return NextResponse.json({ stores });
}