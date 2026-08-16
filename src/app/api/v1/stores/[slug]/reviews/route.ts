import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { upsertReview } from "@/lib/stores";
import { reviewSchema } from "@/lib/validators/store";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { slug } = await params;
  const body = await request.json().catch(() => null);
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const result = await upsertReview(slug, session.user.id, parsed.data);

  if ("error" in result) {
    const messages = {
      NOT_FOUND: "Laden nicht gefunden.",
      OWN_STORE: "Du kannst deinen eigenen Laden nicht bewerten.",
    } as const;
    const status = result.error === "NOT_FOUND" ? 404 : 409;
    return NextResponse.json({ error: messages[result.error] }, { status });
  }

  return NextResponse.json({ success: true, review: result.review }, { status: 201 });
}
