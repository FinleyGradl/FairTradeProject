// path: src/app/api/webhooks/mollie/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import * as mollie from "@/lib/mollie";
import { SPONSORSHIP_TIERS, type SponsorshipTierId } from "@/lib/constants";
import { recordPromoRedemption } from "@/lib/promo-codes";
import { logAudit, SYSTEM_ACTOR } from "@/lib/audit";
import { createInvoice, formatInvoiceNumber, formatCents, parseIssuerSnapshot } from "@/lib/invoices";
import { notifyModerators, notifyUser } from "@/lib/notify";
import {
  moderationAlertTemplate,
  invoiceEmailTemplate,
  sponsorshipPaymentFailedOwnerTemplate,
} from "@/lib/email/templates";

// Mollie calls this URL server-to-server whenever a payment's status
// changes. It sends `id=<payment id>` as application/x-www-form-urlencoded
// (occasionally JSON) — never any status directly, by design we always have
// to fetch the current payment state from Mollie ourselves. This must
// always respond 200 quickly, or Mollie will keep retrying.
export async function POST(request: NextRequest) {
  let paymentId: string | null = null;

  const contentType = request.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("application/json")) {
      const body = await request.json();
      paymentId = body.id ?? null;
    } else {
      const form = await request.formData();
      paymentId = (form.get("id") as string) ?? null;
    }
  } catch {
    paymentId = null;
  }

  if (!paymentId) {
    return NextResponse.json({ error: "Missing payment id" }, { status: 400 });
  }

  try {
    const payment = await mollie.getPayment(paymentId);

    const record = payment.metadata?.subscriptionRecordId
      ? await prisma.sponsorshipSubscription.findUnique({
          where: { id: payment.metadata.subscriptionRecordId },
        })
      : await prisma.sponsorshipSubscription.findFirst({
          where: { mollieSubscriptionId: payment.subscriptionId ?? "__none__" },
        });

    if (!record) {
      console.warn("Mollie webhook: no matching sponsorship for payment", paymentId);
      return NextResponse.json({ received: true });
    }

    const store = await prisma.store.findUnique({
      where: { id: record.storeId },
      select: { name: true, slug: true },
    });
    const owner = await prisma.user.findUnique({
      where: { id: record.ownerUserId },
      select: { name: true, email: true },
    });
    const entityLabel = store ? `${store.name} (${record.tier})` : record.storeId;
    const tierDefLabel = SPONSORSHIP_TIERS[record.tier as SponsorshipTierId]?.label ?? record.tier;
    const baseMetadata = {
      storeSlug: store?.slug ?? null,
      tier: record.tier,
      molliePaymentId: paymentId,
      sequenceType: payment.sequenceType,
    };

    // Billed-amount cents, straight from what Mollie actually charged —
    // more reliable than recomputing from tier price/discount, which
    // could drift if either changes after the fact.
    const amountGrossCents = Math.round(parseFloat(payment.amount.value) * 100);

    async function issueInvoiceAndNotifyOwner(
      sub: NonNullable<typeof record>,
      periodStart: Date,
      periodEnd: Date
    ) {
      if (!store || !owner) return;
      const invoice = await createInvoice({
        subscriptionId: sub.id,
        storeId: sub.storeId,
        storeName: store.name,
        recipientUserId: sub.ownerUserId,
        recipientName: owner.name,
        recipientEmail: owner.email,
        tier: sub.tier,
        periodStart,
        periodEnd,
        amountGrossCents,
        molliePaymentId: paymentId,
      });
      const issuer = parseIssuerSnapshot(invoice.issuerSnapshot);
      await notifyUser(
        owner.email,
        invoiceEmailTemplate({
          invoiceNumber: formatInvoiceNumber(invoice),
          invoiceDate: invoice.createdAt.toLocaleDateString("de-DE"),
          storeName: store.name,
          tierLabel: tierDefLabel,
          periodStart: periodStart.toLocaleDateString("de-DE"),
          periodEnd: periodEnd.toLocaleDateString("de-DE"),
          recipientName: owner.name,
          amountNet: formatCents(invoice.amountNetCents),
          vatRatePercent: invoice.vatRatePercent,
          vatAmount: formatCents(invoice.vatAmountCents),
          amountGross: formatCents(invoice.amountGrossCents),
          isKleinunternehmer: invoice.isKleinunternehmer,
          issuer,
        })
      );
    }

    if (payment.status === "paid") {
      if (payment.sequenceType === "first" && record.status === "incomplete") {
        // Mandate established — now create the actual recurring subscription.
        const tierDef = SPONSORSHIP_TIERS[record.tier as SponsorshipTierId];
        const amountEuros = tierDef.priceEuros * (1 - record.discountPercent / 100);
        const subscription = await mollie.createSubscription({
          customerId: record.mollieCustomerId!,
          amountEuros,
          description: record.promoCode
            ? `FairFind Sponsoring – ${tierDef.label} (monatlich, Code ${record.promoCode} -${record.discountPercent}%)`
            : `FairFind Sponsoring – ${tierDef.label} (monatlich)`,
          subscriptionRecordId: record.id,
        });

        const periodEnd = subscription.nextPaymentDate
          ? new Date(subscription.nextPaymentDate)
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        await prisma.sponsorshipSubscription.update({
          where: { id: record.id },
          data: {
            status: "active",
            mollieSubscriptionId: subscription.id,
            currentPeriodEnd: periodEnd,
          },
        });

        if (record.promoCode) {
          await recordPromoRedemption(record.promoCode);
        }

        await logAudit({
          actor: SYSTEM_ACTOR,
          action: "subscription.activate",
          entityType: "SponsorshipSubscription",
          entityId: record.id,
          entityLabel,
          metadata: { ...baseMetadata, mollieSubscriptionId: subscription.id },
          request,
        });

        if (amountGrossCents > 0) {
          await issueInvoiceAndNotifyOwner(record, new Date(), periodEnd);
        }

        if (store) {
          await notifyModerators(
            "notifySponsorshipStarted",
            moderationAlertTemplate({
              headline: `Neues Sponsoring: „${store.name}“ (${tierDefLabel})`,
              detailHtml: `<strong>„${store.name}“</strong> hat soeben ein <strong>${tierDefLabel}</strong>-Sponsoring abgeschlossen.`,
              detailText: `„${store.name}“ hat ein ${tierDefLabel}-Sponsoring abgeschlossen.`,
              dashboardUrl: `${process.env.NEXTAUTH_URL ?? ""}/admin/sponsoring`,
            })
          );
        }
      } else if (payment.sequenceType === "recurring") {
        const periodEnd = new Date(Date.now() + 31 * 24 * 60 * 60 * 1000);
        await prisma.sponsorshipSubscription.update({
          where: { id: record.id },
          data: {
            status: "active",
            currentPeriodEnd: periodEnd,
          },
        });

        await logAudit({
          actor: SYSTEM_ACTOR,
          action: "subscription.renew",
          entityType: "SponsorshipSubscription",
          entityId: record.id,
          entityLabel,
          metadata: baseMetadata,
          request,
        });

        if (amountGrossCents > 0) {
          const periodStart = record.currentPeriodEnd ?? new Date();
          await issueInvoiceAndNotifyOwner(record, periodStart, periodEnd);
        }
      }
    } else if (["failed", "expired", "canceled"].includes(payment.status)) {
      if (payment.sequenceType === "first") {
        // Never got a mandate — this sponsorship never actually starts.
        await prisma.sponsorshipSubscription.update({
          where: { id: record.id },
          data: { status: "canceled", canceledAt: new Date() },
        });

        await logAudit({
          actor: SYSTEM_ACTOR,
          action: "subscription.mandate_failed",
          entityType: "SponsorshipSubscription",
          entityId: record.id,
          entityLabel,
          metadata: { ...baseMetadata, paymentStatus: payment.status },
          request,
        });
      } else {
        // A renewal failed. Mollie retries automatically for a while, so we
        // mark it past_due rather than immediately canceling the boost.
        await prisma.sponsorshipSubscription.update({
          where: { id: record.id },
          data: { status: "past_due" },
        });

        await logAudit({
          actor: SYSTEM_ACTOR,
          action: "subscription.payment_failed",
          entityType: "SponsorshipSubscription",
          entityId: record.id,
          entityLabel,
          metadata: { ...baseMetadata, paymentStatus: payment.status },
          request,
        });
      }

      if (store && owner) {
        await notifyUser(
          owner.email,
          sponsorshipPaymentFailedOwnerTemplate({ storeName: store.name, tierLabel: tierDefLabel })
        );
      }
      await notifyModerators(
        "notifySponsorshipPaymentFailed",
        moderationAlertTemplate({
          headline: `Zahlung fehlgeschlagen: „${store?.name ?? record.storeId}“`,
          detailHtml: `Eine Zahlung für das <strong>${tierDefLabel}</strong>-Sponsoring von <strong>„${store?.name ?? record.storeId}“</strong> ist fehlgeschlagen (${payment.status}).`,
          detailText: `Zahlung für „${store?.name ?? record.storeId}“ (${tierDefLabel}) fehlgeschlagen: ${payment.status}.`,
          dashboardUrl: `${process.env.NEXTAUTH_URL ?? ""}/admin/sponsoring`,
        })
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Mollie webhook error:", error);
    // Still 200 — Mollie's retry behavior on errors doesn't help us here
    // since the error is almost always on our end, and we log it above.
    return NextResponse.json({ received: true });
  }
}