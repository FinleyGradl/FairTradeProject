// path: src/components/sponsoring/SponsoringPlans.tsx
"use client";

import { useState } from "react";
import { Check, Sparkles, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SPONSORSHIP_TIER_ORDER, SPONSORSHIP_TIERS, type SponsorshipTierId } from "@/lib/constants";

type SponsorshipStatus = "incomplete" | "active" | "past_due" | "canceled";

interface CurrentSponsorship {
  tier: SponsorshipTierId;
  status: SponsorshipStatus;
  currentPeriodEnd: string | null;
}

const STATUS_LABEL: Record<SponsorshipStatus, string> = {
  incomplete: "Zahlung ausstehend",
  active: "Aktiv",
  past_due: "Zahlung fehlgeschlagen – wird erneut versucht",
  canceled: "Gekündigt",
};

export function SponsoringPlans({
  storeSlug,
  initialSponsorship,
}: {
  storeSlug: string;
  initialSponsorship: CurrentSponsorship | null;
}) {
  const [sponsorship, setSponsorship] = useState(initialSponsorship);
  const [loadingTier, setLoadingTier] = useState<SponsorshipTierId | null>(null);
  const [canceling, setCanceling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");

  const hasActiveLike = sponsorship && sponsorship.status !== "canceled";

  async function subscribe(tier: SponsorshipTierId) {
    setError(null);
    setLoadingTier(tier);
    try {
      const res = await fetch(`/api/v1/stores/${storeSlug}/sponsoring`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, promoCode: promoCode.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Fehler beim Starten des Sponsorings.");
      if (data.redeemedPromo) {
        // 100%-off code: activated immediately, no Mollie checkout to redirect to.
        window.location.reload();
        return;
      }
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setError("Kein Bezahllink erhalten. Bitte später erneut versuchen.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler.");
      setLoadingTier(null);
    }
  }

  async function cancel() {
    if (!confirm("Sponsoring wirklich kündigen? Die Bevorzugung entfällt sofort.")) return;
    setError(null);
    setCanceling(true);
    try {
      const res = await fetch(`/api/v1/stores/${storeSlug}/sponsoring`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Kündigung fehlgeschlagen.");
      setSponsorship(data.sponsorship);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler.");
    } finally {
      setCanceling(false);
    }
  }

  return (
    <div>
      {sponsorship && sponsorship.status !== "canceled" && (
        <Card className="mb-6 border-amber-200 bg-amber-50">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-medium text-earth">
                Aktueller Plan: {SPONSORSHIP_TIERS[sponsorship.tier].label}
              </p>
              <p className="text-sm text-earth/70">
                Status: {STATUS_LABEL[sponsorship.status]}
                {sponsorship.currentPeriodEnd && sponsorship.status === "active" && (
                  <> · nächste Abbuchung: {new Date(sponsorship.currentPeriodEnd).toLocaleDateString("de-DE")}</>
                )}
              </p>
            </div>
            <Button variant="destructiveOutline" size="sm" onClick={cancel} disabled={canceling}>
              {canceling ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Kündigen"}
            </Button>
          </CardContent>
        </Card>
      )}

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      {!hasActiveLike && (
        <div className="mb-4 max-w-xs">
          <label htmlFor="promo-code" className="mb-1 block text-xs text-earth/60">
            Rabatt-/Testcode (optional)
          </label>
          <Input
            id="promo-code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="z. B. DIW3DJV4"
          />
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {SPONSORSHIP_TIER_ORDER.map((tierId) => {
          const tier = SPONSORSHIP_TIERS[tierId];
          const isCurrent = sponsorship?.tier === tierId && sponsorship.status !== "canceled";
          return (
            <Card key={tierId} className={cn(isCurrent && "border-sage ring-1 ring-sage")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {tier.label}
                  {tierId === "top" && <Sparkles className="h-4 w-4 text-amber-500" />}
                </CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <p className="pt-2 text-2xl font-bold text-earth">
                  {tier.priceEuros.toFixed(2).replace(".", ",")} €
                  <span className="text-sm font-normal text-earth/60"> / Monat</span>
                </p>
              </CardHeader>
              <CardContent>
                <ul className="mb-4 space-y-1.5 text-sm text-earth/80">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage" /> {f}
                    </li>
                  ))}
                </ul>
                {isCurrent ? (
                  <Badge variant="success">Aktueller Plan</Badge>
                ) : (
                  <Button
                    className="w-full"
                    variant={tierId === "top" ? "default" : "outline"}
                    disabled={Boolean(hasActiveLike) || loadingTier !== null}
                    onClick={() => subscribe(tierId)}
                  >
                    {loadingTier === tierId ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : hasActiveLike ? (
                      "Erst kündigen zum Wechseln"
                    ) : (
                      "Abo abschließen"
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}