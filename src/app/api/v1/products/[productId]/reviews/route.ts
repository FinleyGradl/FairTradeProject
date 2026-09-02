// path: src/app/api/v1/products/[productId]/reviews/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { upsertProductReview, listProductReviews } from "@/lib/product-reviews";
import { productReviewSchema } from "@/lib/validators/product";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const session = await auth();
  const { productId } = await params;
  const reviews = await listProductReviews(productId, session?.user?.id);
  return NextResponse.json({ reviews });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const { productId } = await params;
  const body = await request.json().catch(() => null);
  const parsed = productReviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const result = await upsertProductReview(productId, session.user.id, parsed.data);

  if ("error" in result) {
    const messages = {
      NOT_FOUND: "Produkt nicht gefunden.",
      OWN_STORE: "Du kannst Produkte deines eigenen Ladens nicht bewerten.",
    } as const;
    const status = result.error === "NOT_FOUND" ? 404 : 409;
    return NextResponse.json({ error: messages[result.error] }, { status });
  }

  return NextResponse.json({ success: true, review: result.review }, { status: 201 });
}
