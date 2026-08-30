// path: src/app/admin/settings/billing/page.tsx
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { canManageUsers } from "@/lib/users";
import { getPlatformSettings } from "@/lib/platform-settings";
import { BillingSettingsForm } from "@/components/admin/BillingSettingsForm";

export const metadata: Metadata = { title: "Rechnungs-Einstellungen" };

export default async function BillingSettingsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/settings/billing");
  }
  if (!canManageUsers(session.user)) {
    notFound();
  }

  const settings = await getPlatformSettings();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-earth">Rechnungs-Einstellungen</h1>
      <p className="mt-1 text-sm text-earth/70">
        Diese Angaben erscheinen auf jeder Sponsoring-Rechnung. Nur für Superuser sichtbar. Eine
        Änderung wirkt sich nur auf künftige Rechnungen aus — bereits ausgestellte Rechnungen
        bleiben unverändert.
      </p>

      <div className="mt-8">
        <BillingSettingsForm
          initial={{
            invoiceIssuerName: settings.invoiceIssuerName,
            invoiceIssuerStreet: settings.invoiceIssuerStreet,
            invoiceIssuerZipCity: settings.invoiceIssuerZipCity,
            invoiceIssuerCountry: settings.invoiceIssuerCountry,
            invoiceIssuerEmail: settings.invoiceIssuerEmail,
            invoiceIssuerTaxNumber: settings.invoiceIssuerTaxNumber,
            invoiceIssuerVatId: settings.invoiceIssuerVatId,
            isKleinunternehmer: settings.isKleinunternehmer,
            vatRatePercent: settings.vatRatePercent,
            invoiceIssuerIban: settings.invoiceIssuerIban,
            invoiceIssuerBankName: settings.invoiceIssuerBankName,
            invoiceFooterNote: settings.invoiceFooterNote,
          }}
        />
      </div>
    </div>
  );
}
