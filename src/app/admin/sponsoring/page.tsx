// path: src/app/admin/sponsoring/page.tsx
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { getAdminSponsorshipOverview } from "@/lib/sponsorship";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SPONSORSHIP_TIERS } from "@/lib/constants";

export const metadata: Metadata = { title: "Sponsoring-Übersicht" };

const STATUS_LABEL: Record<string, string> = {
  active: "Aktiv",
  incomplete: "Zahlung ausstehend",
  past_due: "Zahlung fehlgeschlagen",
  canceled: "Gekündigt",
};

const STATUS_VARIANT: Record<string, "success" | "secondary" | "outline"> = {
  active: "success",
  incomplete: "secondary",
  past_due: "secondary",
  canceled: "outline",
};

export default async function AdminSponsoringPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/sponsoring");
  }
  if (session.user.role !== "admin") {
    notFound();
  }

  const { rows, stats } = await getAdminSponsorshipOverview();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl font-bold text-earth">Sponsoring-Übersicht</h1>
      <p className="mt-1 text-sm text-earth/70">
        Wer aktuell für welchen Laden ein Sponsoring-Abo hat, plus eine grobe
        Umsatzeinschätzung. Detailzahlungen/Rechnungen verwaltet Mollie.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-earth">{stats.activeCount}</p>
            <p className="text-xs text-earth/60">Aktive Sponsorings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-earth">
              {stats.estimatedMonthlyRevenueEuros.toFixed(2).replace(".", ",")} €
            </p>
            <p className="text-xs text-earth/60">Geschätzter MRR</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-earth">{stats.pastDueCount}</p>
            <p className="text-xs text-earth/60">Zahlung fehlgeschlagen</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-earth">{stats.canceledCount}</p>
            <p className="text-xs text-earth/60">Gekündigt (gesamt)</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm text-earth/70">
        {(Object.keys(SPONSORSHIP_TIERS) as (keyof typeof SPONSORSHIP_TIERS)[]).map((tier) => (
          <span key={tier} className="rounded-full bg-sage-100 px-3 py-1">
            {SPONSORSHIP_TIERS[tier].label}: {stats.activeByTier[tier]} aktiv
          </span>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-xs uppercase text-earth/50">
            <tr>
              <th scope="col" className="pb-2 pr-4">Laden</th>
              <th scope="col" className="pb-2 pr-4">Inhaber:in</th>
              <th scope="col" className="pb-2 pr-4">Plan</th>
              <th scope="col" className="pb-2 pr-4">Status</th>
              <th scope="col" className="pb-2 pr-4">Betrag/Monat</th>
              <th scope="col" className="pb-2 pr-4">Code</th>
              <th scope="col" className="pb-2 pr-4">Seit</th>
              <th scope="col" className="pb-2">Nächste Abbuchung</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-100">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="py-2 pr-4">
                  <Link href={`/stores/${row.storeSlug}`} className="text-sage dark:text-sage-300 hover:underline">
                    {row.storeName}
                  </Link>
                </td>
                <td className="py-2 pr-4 text-earth/80">
                  {row.ownerName ?? "—"}
                  <br />
                  <span className="text-xs text-earth/50">{row.ownerEmail}</span>
                </td>
                <td className="py-2 pr-4">{SPONSORSHIP_TIERS[row.tier].label}</td>
                <td className="py-2 pr-4">
                  <Badge variant={STATUS_VARIANT[row.status] ?? "outline"}>
                    {STATUS_LABEL[row.status] ?? row.status}
                  </Badge>
                </td>
                <td className="py-2 pr-4 tabular-nums">
                  {row.monthlyAmountEuros.toFixed(2).replace(".", ",")} €
                  {row.discountPercent > 0 && (
                    <span className="ml-1 text-xs text-earth/50">(-{row.discountPercent}%)</span>
                  )}
                </td>
                <td className="py-2 pr-4 font-mono text-xs">{row.promoCode ?? "—"}</td>
                <td className="py-2 pr-4 text-earth/70">
                  {row.createdAt.toLocaleDateString("de-DE")}
                </td>
                <td className="py-2 text-earth/70">
                  {row.currentPeriodEnd ? row.currentPeriodEnd.toLocaleDateString("de-DE") : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="py-8 text-center text-sm text-earth/50">Noch keine Sponsorings.</p>
        )}
      </div>
    </div>
  );
}