// path: src/app/api/admin/settings/billing/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { canManageUsers } from "@/lib/users";
import { getPlatformSettings, updatePlatformSettings } from "@/lib/platform-settings";

// Reuses the superuser tier (see lib/users.ts) rather than plain "admin" —
// billing/tax details are at least as sensitive as user-role management,
// so the same higher trust tier gates both.

const patchSchema = z.object({
  invoiceIssuerName: z.string().trim().min(1).max(200),
  invoiceIssuerStreet: z.string().trim().max(200),
  invoiceIssuerZipCity: z.string().trim().max(200),
  invoiceIssuerCountry: z.string().trim().max(100),
  invoiceIssuerEmail: z.string().trim().email().or(z.literal("")),
  invoiceIssuerTaxNumber: z.string().trim().max(50).nullable().optional(),
  invoiceIssuerVatId: z.string().trim().max(50).nullable().optional(),
  isKleinunternehmer: z.boolean(),
  vatRatePercent: z.number().int().min(0).max(100),
  invoiceIssuerIban: z.string().trim().max(50).nullable().optional(),
  invoiceIssuerBankName: z.string().trim().max(100).nullable().optional(),
  invoiceFooterNote: z.string().trim().max(500).nullable().optional(),
});

export async function GET() {
  const session = await auth();
  if (!canManageUsers(session?.user)) {
    return NextResponse.json({ error: "Nicht berechtigt." }, { status: 403 });
  }
  const settings = await getPlatformSettings();
  return NextResponse.json({ settings });
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user || !canManageUsers(session.user)) {
    return NextResponse.json({ error: "Nicht berechtigt." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const settings = await updatePlatformSettings(
    {
      ...parsed.data,
      invoiceIssuerTaxNumber: parsed.data.invoiceIssuerTaxNumber || null,
      invoiceIssuerVatId: parsed.data.invoiceIssuerVatId || null,
      invoiceIssuerIban: parsed.data.invoiceIssuerIban || null,
      invoiceIssuerBankName: parsed.data.invoiceIssuerBankName || null,
      invoiceFooterNote: parsed.data.invoiceFooterNote || null,
    },
    session.user.id
  );

  return NextResponse.json({ settings });
}
