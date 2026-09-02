// path: src/app/api/v1/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/stores";
import { productsQuerySchema } from "@/lib/validators/product";

export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams);
    const query = productsQuerySchema.parse(params);
    const result = await searchProducts({
      q: query.q,
      category: query.category,
      storeId: query.store_id,
      lat: query.lat,
      lng: query.lng,
      radius: query.radius,
      page: query.page,
      limit: query.limit,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/v1/products:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
