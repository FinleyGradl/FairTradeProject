// path: src/lib/invoices.ts
// Creates the immutable Invoice record for a paid sponsorship payment (see
// Invoice in prisma/schema.prisma). Called from the Mollie webhook right
// after a "first" or "recurring" payment is marked paid.
import { prisma } from "@/lib/db";
import { getPlatformSettings } from "@/lib/platform-settings";

interface CreateInvoiceInput {
  subscriptionId: string;
  storeId: string;
  storeName: string;
  recipientUserId: string;
  recipientName: string | null;
  recipientEmail: string;
  tier: string;
  periodStart: Date;
  periodEnd: Date;
  // What was actually charged (after any promo-code discount), in cents.
  amountGrossCents: number;
  molliePaymentId?: string | null;
}

export async function createInvoice(input: CreateInvoiceInput) {
  const settings = await getPlatformSettings();
  const isKleinunternehmer = settings.isKleinunternehmer;
  // §19 UStG: no VAT is broken out at all while Kleinunternehmer — the
  // gross amount IS the net amount, full stop, regardless of vatRatePercent.
  const vatRatePercent = isKleinunternehmer ? 0 : settings.vatRatePercent;

  const amountGrossCents = input.amountGrossCents;
  const amountNetCents = isKleinunternehmer
    ? amountGrossCents
    : Math.round(amountGrossCents / (1 + vatRatePercent / 100));
  const vatAmountCents = amountGrossCents - amountNetCents;

  return prisma.invoice.create({
    data: {
      subscriptionId: input.subscriptionId,
      storeId: input.storeId,
      storeName: input.storeName,
      recipientUserId: input.recipientUserId,
      recipientName: input.recipientName,
      recipientEmail: input.recipientEmail,
      tier: input.tier,
      periodStart: input.periodStart,
      periodEnd: input.periodEnd,
      amountNetCents,
      vatRatePercent,
      vatAmountCents,
      amountGrossCents,
      isKleinunternehmer,
      issuerSnapshot: JSON.stringify({
        name: settings.invoiceIssuerName,
        street: settings.invoiceIssuerStreet,
        zipCity: settings.invoiceIssuerZipCity,
        country: settings.invoiceIssuerCountry,
        email: settings.invoiceIssuerEmail,
        taxNumber: settings.invoiceIssuerTaxNumber,
        vatId: settings.invoiceIssuerVatId,
        iban: settings.invoiceIssuerIban,
        bankName: settings.invoiceIssuerBankName,
        footerNote: settings.invoiceFooterNote,
      }),
      molliePaymentId: input.molliePaymentId ?? null,
    },
  });
}

export function formatInvoiceNumber(invoice: { sequenceNumber: number; createdAt: Date }): string {
  return `FTP-${invoice.createdAt.getFullYear()}-${String(invoice.sequenceNumber).padStart(5, "0")}`;
}

export function formatCents(cents: number): string {
  return (cents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

export interface IssuerSnapshot {
  name: string;
  street: string;
  zipCity: string;
  country: string;
  email: string;
  taxNumber: string | null;
  vatId: string | null;
  iban: string | null;
  bankName: string | null;
  footerNote: string | null;
}

export function parseIssuerSnapshot(raw: string): IssuerSnapshot {
  return JSON.parse(raw) as IssuerSnapshot;
}

export async function listInvoicesForStore(storeId: string) {
  return prisma.invoice.findMany({ where: { storeId }, orderBy: { createdAt: "desc" } });
}
