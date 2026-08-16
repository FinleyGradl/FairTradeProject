import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getStores, createStore, serializeStore } from "@/lib/stores";
import { storesQuerySchema, storeCreateSchema } from "@/lib/validators/store";

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

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = storeCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const store = await createStore(session.user.id, parsed.data);
    return NextResponse.json(
      { success: true, store: serializeStore({ ...store, avgRating: null, reviewCount: 0 }) },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/v1/stores:", error);
    return NextResponse.json({ error: "Der Laden konnte nicht angelegt werden." }, { status: 500 });
  }
}