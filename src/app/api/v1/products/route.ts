import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/stores";
import { z } from "zod";

const querySchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  store_id: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(20),
});

export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams);
    const query = querySchema.parse(params);
    const result = await searchProducts({
      q: query.q,
      category: query.category,
      storeId: query.store_id,
      page: query.page,
      limit: query.limit,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/v1/products:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
