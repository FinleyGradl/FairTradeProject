import { NextRequest, NextResponse } from "next/server";
import { getStoreBySlug } from "@/lib/stores";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const store = await getStoreBySlug(slug);
    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }
    return NextResponse.json(store);
  } catch (error) {
    console.error("GET /api/v1/stores/[slug]:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
