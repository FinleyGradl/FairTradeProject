// path: src/app/api/v1/track/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { recordPageViewSafe } from "@/lib/analytics";

const trackSchema = z.object({
  storeId: z.string().min(1),
  path: z.string().min(1).max(300),
});

/**
 * Called client-side (see components/analytics/PageViewTracker.tsx) once per
 * store-page visit. Deliberately public/unauthenticated — this is passive
 * traffic measurement, not a privileged action. Rate limiting / bot
 * filtering is left as a future improvement; a wrong/inflated count here
 * only affects the owner's own insights, not the public directory.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = trackSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const store = await prisma.store.findUnique({
    where: { id: parsed.data.storeId },
    select: { id: true },
  });
  if (!store) {
    return NextResponse.json({ error: "Store not found" }, { status: 404 });
  }

  recordPageViewSafe({
    storeId: store.id,
    path: parsed.data.path,
    referrerUrl: request.headers.get("referer"),
    request,
  });

  return NextResponse.json({ ok: true });
}