// path: src/app/admin/promo-codes/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/auth";
import { listPromoCodes } from "@/lib/promo-codes";
import { PromoCodeManager } from "@/components/admin/PromoCodeManager";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = { title: "Promo-Codes" };

export default async function AdminPromoCodesPage() {
  const locale = await getLocale();
  const session = await auth();
  if (!session?.user) {
    return redirect({ href: "/login?callbackUrl=/admin/promo-codes", locale });
  }
  if (session.user.role !== "admin") {
    notFound();
  }

  const codes = await listPromoCodes();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-bold text-earth">Promo-Codes</h1>
      <p className="mt-1 text-sm text-earth/70">
        Rabattcodes für Sponsoring-Abos. Ein Code mit 100% Rabatt aktiviert ein Sponsoring sofort,
        ohne Mollie-Zahlung — für Testzwecke sinnvoll, im Livebetrieb bitte nur zurückhaltend
        einsetzen.
      </p>

      <div className="mt-8">
        <PromoCodeManager
          initialCodes={codes.map((c) => ({
            ...c,
            expiresAt: c.expiresAt?.toISOString() ?? null,
            createdAt: c.createdAt.toISOString(),
          }))}
        />
      </div>
    </div>
  );
}