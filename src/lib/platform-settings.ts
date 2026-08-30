// path: src/lib/platform-settings.ts
// Superuser-managed billing/invoice settings — a single row keyed by the
// fixed id "default". See PlatformSettings in prisma/schema.prisma for why
// this exists and lib/invoices.ts for how it gets snapshotted per invoice.
import { prisma } from "@/lib/db";

const SETTINGS_ID = "default";

export async function getPlatformSettings() {
  const existing = await prisma.platformSettings.findUnique({ where: { id: SETTINGS_ID } });
  if (existing) return existing;
  // First read ever — create the row with schema defaults (Kleinunternehmer,
  // placeholder issuer name) so callers never have to null-check this.
  return prisma.platformSettings.create({ data: { id: SETTINGS_ID } });
}

export interface PlatformSettingsInput {
  invoiceIssuerName: string;
  invoiceIssuerStreet: string;
  invoiceIssuerZipCity: string;
  invoiceIssuerCountry: string;
  invoiceIssuerEmail: string;
  invoiceIssuerTaxNumber: string | null;
  invoiceIssuerVatId: string | null;
  isKleinunternehmer: boolean;
  vatRatePercent: number;
  invoiceIssuerIban: string | null;
  invoiceIssuerBankName: string | null;
  invoiceFooterNote: string | null;
}

export async function updatePlatformSettings(input: PlatformSettingsInput, updatedByUserId: string) {
  return prisma.platformSettings.upsert({
    where: { id: SETTINGS_ID },
    create: { id: SETTINGS_ID, ...input, updatedByUserId },
    update: { ...input, updatedByUserId },
  });
}
