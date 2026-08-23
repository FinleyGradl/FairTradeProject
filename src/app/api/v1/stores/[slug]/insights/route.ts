// path: src/app/api/v1/stores/[slug]/insights/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { canEditStore } from "@/lib/stores";
import { getStoreInsights } from "@/lib/analytics";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { slug } = await params;
  const store = await prisma.store.findUnique({ where: { slug } });
  if (!store) return NextResponse.json({ error: "Laden nicht gefunden." }, { status: 404 });

  // Same authorization as editing the listing — insights are for whoever
  // manages the store, not limited to sponsors.
  if (!canEditStore(store, session.user)) {
    return NextResponse.json({ error: "Nicht berechtigt." }, { status: 403 });
  }

  const rangeParam = Number(request.nextUrl.searchParams.get("days"));
  const rangeDays = [7, 30, 90].includes(rangeParam) ? rangeParam : 30;

  const insights = await getStoreInsights(store.id, rangeDays);
  return NextResponse.json(insights);
}