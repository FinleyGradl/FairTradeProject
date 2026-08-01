import { NextRequest, NextResponse } from "next/server";
import { getStores } from "@/lib/stores";
import { storesQuerySchema } from "@/lib/validators/store";

export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams);
    const query = storesQuerySchema.parse(params);
    const result = await getStores(query);
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/v1/stores:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
