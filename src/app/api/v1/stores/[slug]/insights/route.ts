// path: src/app/api/v1/stores/[slug]/insights/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { canManageSponsorship, canAccessInsights } from "@/lib/sponsorship";
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

  // Confirmed owner (or admin/mod) only — not just whoever originally
  // submitted an as-yet-unclaimed listing.
  if (!(await canManageSponsorship(store, session.user))) {
    return NextResponse.json({ error: "Nicht berechtigt." }, { status: 403 });
  }

  // Insights are part of every paid sponsoring plan (including Basis) —
  // owners without an active subscription get a 402, not the data.
  if (!(await canAccessInsights(store, session.user))) {
    return NextResponse.json(
      { error: "Insights sind Teil des Sponsorings. Schließe einen Plan ab, um sie zu sehen." },
      { status: 402 }
    );
  }

  const rangeParam = Number(request.nextUrl.searchParams.get("days"));
  const rangeDays = [7, 30, 90].includes(rangeParam) ? rangeParam : 30;

  const insights = await getStoreInsights(store.id, rangeDays);
  return NextResponse.json(insights);
}