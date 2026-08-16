import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { listFlaggedStores, canModerate } from "@/lib/stores";
import { parseJsonArray } from "@/lib/utils";

export async function GET() {
  const session = await auth();
  if (!canModerate(session?.user)) {
    return NextResponse.json({ error: "Keine Berechtigung." }, { status: 403 });
  }

  const stores = await listFlaggedStores();
  return NextResponse.json({
    stores: stores.map((s) => ({
      id: s.id,
      slug: s.slug,
      name: s.name,
      city: s.city,
      confirmCount: s.confirmCount,
      disputeCount: s.disputeCount,
      categories: parseJsonArray(s.categories),
      createdBy: s.createdBy,
      disputes: s.attestations.map((a) => ({
        userName: a.user.name,
        reason: a.reason,
        createdAt: a.createdAt,
      })),
    })),
  });
}