// path: src/lib/mollie.ts
// Thin wrapper around the Mollie REST API (https://docs.mollie.com/reference).
// Deliberately fetch-based instead of pulling in the official SDK, to avoid
// an extra dependency for what is a handful of simple JSON calls.
//
// Required env vars:
//   MOLLIE_API_KEY   – secret key from the Mollie dashboard (test_... / live_...)
//   APP_URL          – public base URL of this app, e.g. https://fairfind.example
//                       (used for redirect/webhook URLs)

const MOLLIE_API_BASE = "https://api.mollie.com/v2";

function apiKey(): string {
  const key = process.env.MOLLIE_API_KEY;
  if (!key) {
    throw new Error(
      "MOLLIE_API_KEY ist nicht gesetzt. Sponsoring-Zahlungen können nicht verarbeitet werden."
    );
  }
  return key;
}

function appUrl(): string {
  const url = process.env.APP_URL || process.env.NEXTAUTH_URL;
  if (!url) {
    throw new Error("APP_URL (oder NEXTAUTH_URL) ist nicht gesetzt.");
  }
  return url.replace(/\/$/, "");
}

async function mollieFetch<T>(
  path: string,
  init?: Omit<RequestInit, "body"> & { body?: unknown }
): Promise<T> {
  const res = await fetch(`${MOLLIE_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    body: init?.body !== undefined ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : {};

  if (!res.ok) {
    const detail = (data as { detail?: string; title?: string }).detail
      ?? (data as { title?: string }).title
      ?? res.statusText;
    throw new Error(`Mollie API error (${res.status}): ${detail}`);
  }

  return data as T;
}

export interface MollieCustomer {
  id: string;
  email: string;
}

export interface MolliePayment {
  id: string;
  status: "open" | "canceled" | "pending" | "authorized" | "expired" | "failed" | "paid";
  sequenceType: "first" | "recurring" | "oneoff";
  customerId?: string;
  subscriptionId?: string;
  metadata?: { subscriptionRecordId?: string } | null;
  _links: { checkout?: { href: string } };
}

export interface MollieSubscription {
  id: string;
  status: string;
  nextPaymentDate?: string;
}

/** Finds or creates a Mollie customer for this user (one per user, reused across stores). */
export async function ensureMollieCustomer(params: {
  existingCustomerId?: string | null;
  email: string;
  name?: string | null;
}): Promise<string> {
  if (params.existingCustomerId) {
    try {
      const customer = await mollieFetch<MollieCustomer>(`/customers/${params.existingCustomerId}`);
      return customer.id;
    } catch {
      // Fall through and create a fresh one if the stored id no longer resolves.
    }
  }

  const customer = await mollieFetch<MollieCustomer>("/customers", {
    method: "POST",
    body: { email: params.email, name: params.name ?? undefined },
  });
  return customer.id;
}

/**
 * Creates the "first" payment for a store's sponsorship. Once the user pays
 * this, Mollie grants a mandate we can then use to create a recurring
 * subscription (see createSubscription below, wired up from the webhook).
 */
export async function createFirstPayment(params: {
  customerId: string;
  amountEuros: number;
  description: string;
  subscriptionRecordId: string;
}): Promise<MolliePayment> {
  return mollieFetch<MolliePayment>("/payments", {
    method: "POST",
    body: {
      amount: { currency: "EUR", value: params.amountEuros.toFixed(2) },
      description: params.description,
      customerId: params.customerId,
      sequenceType: "first",
      redirectUrl: `${appUrl()}/me/stores?sponsoring=${params.subscriptionRecordId}`,
      webhookUrl: `${appUrl()}/api/webhooks/mollie`,
      metadata: { subscriptionRecordId: params.subscriptionRecordId },
    },
  });
}

export async function getPayment(paymentId: string): Promise<MolliePayment> {
  return mollieFetch<MolliePayment>(`/payments/${paymentId}`);
}

export async function createSubscription(params: {
  customerId: string;
  amountEuros: number;
  description: string;
  subscriptionRecordId: string;
}): Promise<MollieSubscription> {
  return mollieFetch<MollieSubscription>(`/customers/${params.customerId}/subscriptions`, {
    method: "POST",
    body: {
      amount: { currency: "EUR", value: params.amountEuros.toFixed(2) },
      interval: "1 month",
      description: params.description,
      webhookUrl: `${appUrl()}/api/webhooks/mollie`,
      metadata: { subscriptionRecordId: params.subscriptionRecordId },
    },
  });
}

export async function cancelSubscription(customerId: string, subscriptionId: string): Promise<void> {
  await mollieFetch(`/customers/${customerId}/subscriptions/${subscriptionId}`, {
    method: "DELETE",
  });
}