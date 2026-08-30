// path: src/lib/audit.ts
// Central write/read layer for the admin audit log (see AuditLog in
// prisma/schema.prisma). Every mutation worth being accountable for —
// moderation decisions, deletes, role changes, ... — calls logAudit()
// from its API route right after the mutation succeeds.
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

// Canonical action list — dot-namespaced as "<entity>.<verb>". Kept as a
// const array (not an enum) so the audit-log filter UI can render it
// without a schema round-trip, and so new actions don't require a
// migration.
export const AUDIT_ACTIONS = [
  "store.update",
  "store.delete",
  "store.moderate",
  "claim.review",
  "suggestion.review",
  "review.delete",
  "review.hide",
  "review.report_dismiss",
  "photo.delete",
  "photo.report_dismiss",
  "promo_code.create",
  "promo_code.update",
  "promo_code.delete",
  "user.role_change",
  "user.superuser_grant",
  "user.superuser_revoke",
  "subscription.start",
  "subscription.cancel",
  "subscription.activate",
  "subscription.renew",
  "subscription.payment_failed",
  "subscription.mandate_failed",
] as const;

export type AuditAction = (typeof AUDIT_ACTIONS)[number];

export const AUDIT_ENTITY_TYPES = [
  "Store",
  "StoreClaim",
  "StoreEditSuggestion",
  "Review",
  "StorePhoto",
  "PromoCode",
  "User",
  "SponsorshipSubscription",
] as const;

export type AuditEntityType = (typeof AUDIT_ENTITY_TYPES)[number];

// Used for actions triggered by an external system rather than a signed-in
// user — currently just the Mollie webhook. Keeps a clear, greppable trail
// ("who" was "the payment provider", not a blank/null actor) for anything
// that changes billing state without a human in the loop, which matters
// for payment-compliance audits (see mollie webhook route).
export const SYSTEM_ACTOR = {
  id: null,
  email: "system@mollie-webhook",
  name: "Mollie Webhook",
  role: "system",
} as const;

interface LogAuditInput {
  actor:
    | { id: string | null; email?: string | null; name?: string | null; role?: string | null }
    | null
    | undefined;
  action: AuditAction;
  entityType: AuditEntityType;
  entityId?: string | null;
  entityLabel?: string | null;
  metadata?: Record<string, unknown> | null;
  request?: NextRequest | Request | null;
}

function extractIp(request?: NextRequest | Request | null): string | null {
  if (!request) return null;
  // Reverse-proxy headers first (Vercel/most hosts set these); no
  // request.ip on the standard Request type.
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() ?? null;
  return request.headers.get("x-real-ip");
}

/**
 * Writes one audit-log entry. Deliberately fire-and-forget from the
 * caller's perspective — a logging failure must never take down the
 * actual mutation it's describing, so all errors are swallowed (and
 * reported to the console for visibility).
 */
export async function logAudit(input: LogAuditInput): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        actorId: input.actor?.id ?? null,
        actorEmail: input.actor?.email ?? null,
        actorName: input.actor?.name ?? null,
        actorRole: input.actor?.role ?? null,
        action: input.action,
        entityType: input.entityType,
        entityId: input.entityId ?? null,
        entityLabel: input.entityLabel ?? null,
        metadata: input.metadata ? JSON.stringify(input.metadata) : null,
        ip: extractIp(input.request),
      },
    });
  } catch (error) {
    console.error("logAudit failed:", error);
  }
}

export interface AuditLogSearchParams {
  page?: number;
  limit?: number;
  action?: string;
  entityType?: string;
  actorId?: string;
  q?: string; // matches actorEmail, actorName, entityLabel
  from?: string; // ISO date, inclusive
  to?: string; // ISO date, inclusive
}

export async function searchAuditLogs(params: AuditLogSearchParams) {
  const { page = 1, limit = 25, action, entityType, actorId, q, from, to } = params;
  const safeLimit = Math.min(Math.max(limit, 1), 100);
  const safePage = Math.max(page, 1);

  const where: Record<string, unknown> = {};
  if (action) where.action = action;
  if (entityType) where.entityType = entityType;
  if (actorId) where.actorId = actorId;
  if (from || to) {
    where.createdAt = {
      ...(from ? { gte: new Date(from) } : {}),
      ...(to ? { lte: new Date(to) } : {}),
    };
  }
  if (q?.trim()) {
    const term = q.trim();
    where.OR = [
      { actorEmail: { contains: term, mode: "insensitive" } },
      { actorName: { contains: term, mode: "insensitive" } },
      { entityLabel: { contains: term, mode: "insensitive" } },
    ];
  }

  const [entries, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (safePage - 1) * safeLimit,
      take: safeLimit,
    }),
    prisma.auditLog.count({ where }),
  ]);

  return {
    entries,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      pages: Math.max(Math.ceil(total / safeLimit), 1),
    },
  };
}
