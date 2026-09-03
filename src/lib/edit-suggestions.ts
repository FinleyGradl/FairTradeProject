// src/lib/edit-suggestions.ts
//
// "Suggest an edit" flow, roughly modelled on Google Business Profile:
// anyone signed in can propose a set of field changes for a store they
// can't edit directly. What happens next depends on whether the store is
// "managed" (has a confirmed owner):
//   - Managed:   the suggestion is only visible to that owner (or an
//                admin/moderator), who approves or rejects it directly.
//   - Unmanaged: the suggestion is opened up to community confirm/dispute
//                votes AND shown in the admin moderation queue — whichever
//                resolves it first (enough net votes, or an admin decision)
//                wins.
import { prisma } from "@/lib/db";
import { updateStore, canEditStore, canModerate, adjustTrustScore } from "@/lib/stores";
import { TRUST_SCORE_DELTAS, EDIT_SUGGESTION_THRESHOLDS } from "@/lib/trust";
import type { StoreEditSuggestionInput, SocialLink } from "@/lib/validators/store";
import type { HourChange, SuggestionChanges } from "@/lib/suggestion-diff";
import type { Store, StoreHours, AttestationVote } from "../../prisma/generated/prisma/client";

// Re-exported so existing callers/imports of these two types from this
// module keep working — the canonical definitions now live in
// lib/suggestion-diff.ts (client-safe, no Prisma import) so the diff-
// rendering components can use them without pulling this server module in.
export type { HourChange, SuggestionChanges };

const SUGGESTABLE_FIELDS = [
  "name",
  "description",
  "addressLine",
  "city",
  "postalCode",
  "phone",
  "website",
  "email",
  "hours",
] as const;

type SuggestableField = (typeof SUGGESTABLE_FIELDS)[number];

function normalize(value: string | null | undefined): string {
  return (value ?? "").trim();
}

function hoursEqual(a: HourChange[], b: HourChange[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((x, y) => x.dayOfWeek - y.dayOfWeek);
  const sortedB = [...b].sort((x, y) => x.dayOfWeek - y.dayOfWeek);
  return sortedA.every((h, i) => {
    const other = sortedB[i];
    return (
      h.dayOfWeek === other.dayOfWeek &&
      h.isClosed === other.isClosed &&
      (h.isClosed || (h.openTime === other.openTime && h.closeTime === other.closeTime))
    );
  });
}

/** Builds the { field: newValue } diff, comparing only against fields the
 * caller actually provided. Returns null if nothing actually changed. */
function buildChanges(
  store: Store & { hours: StoreHours[] },
  input: StoreEditSuggestionInput
): SuggestionChanges | null {
  const changes: SuggestionChanges = {};

  const stringFields: Exclude<SuggestableField, "hours">[] = [
    "name",
    "description",
    "addressLine",
    "city",
    "postalCode",
    "phone",
    "website",
    "email",
  ];
  for (const field of stringFields) {
    const proposed = input[field];
    if (proposed === undefined) continue;
    if (normalize(proposed) !== normalize(store[field])) {
      changes[field] = proposed.trim();
    }
  }

  if (input.hours !== undefined) {
    const current: HourChange[] = store.hours.map((h) => ({
      dayOfWeek: h.dayOfWeek,
      openTime: h.openTime,
      closeTime: h.closeTime,
      isClosed: h.isClosed,
    }));
    if (!hoursEqual(current, input.hours)) {
      changes.hours = input.hours;
    }
  }

  return Object.keys(changes).length > 0 ? changes : null;
}

export function parseSuggestionChanges(raw: string): SuggestionChanges {
  return JSON.parse(raw) as SuggestionChanges;
}

export async function createEditSuggestion(
  storeSlug: string,
  actingUser: { id: string; role?: string },
  input: StoreEditSuggestionInput
): Promise<
  | { error: "NOT_FOUND" | "NO_CHANGES" | "CAN_EDIT_DIRECTLY" }
  | { suggestion: Awaited<ReturnType<typeof prisma.storeEditSuggestion.create>> }
> {
  const store = await prisma.store.findUnique({
    where: { slug: storeSlug },
    include: { hours: true },
  });
  if (!store) return { error: "NOT_FOUND" };

  // People who can already edit the store directly (owner, or the creator
  // of a still-unclaimed listing, or admins/mods) use the real edit form —
  // suggestions are for everyone else.
  if (canEditStore(store, actingUser)) {
    return { error: "CAN_EDIT_DIRECTLY" };
  }

  const changes = buildChanges(store, input);
  if (!changes) return { error: "NO_CHANGES" };

  const suggestion = await prisma.storeEditSuggestion.create({
    data: {
      storeId: store.id,
      suggestedByUserId: actingUser.id,
      changes: JSON.stringify(changes),
      note: input.note?.trim() || null,
    },
  });

  return { suggestion };
}

/** Pending suggestions for a store's owner/admin review queue. */
export async function listPendingSuggestionsForStore(storeId: string) {
  return prisma.storeEditSuggestion.findMany({
    where: { storeId, status: "pending" },
    include: { suggestedBy: { select: { id: true, name: true, email: true, trustScore: true } } },
    orderBy: { createdAt: "asc" },
  });
}

/** Pending suggestions on *unmanaged* stores — the admin moderation queue. */
export async function listCommunitySuggestions() {
  return prisma.storeEditSuggestion.findMany({
    where: { status: "pending", store: { ownerUserId: null } },
    include: {
      store: {
        select: {
          id: true,
          slug: true,
          name: true,
          description: true,
          addressLine: true,
          city: true,
          postalCode: true,
          phone: true,
          website: true,
          email: true,
          ownerUserId: true,
          hours: { orderBy: { dayOfWeek: "asc" } },
        },
      },
      suggestedBy: { select: { id: true, name: true, email: true, trustScore: true } },
    },
    orderBy: { createdAt: "asc" },
  });
}

/**
 * Pending suggestions for the public community-vote widget on a store's
 * page — only meaningful for unmanaged (ownerless) stores; the caller is
 * expected to check that first. Includes the viewer's own vote, if any.
 */
export async function listPublicSuggestionsForStore(storeId: string, viewerId?: string) {
  const suggestions = await prisma.storeEditSuggestion.findMany({
    where: { storeId, status: "pending" },
    orderBy: { createdAt: "asc" },
  });
  if (suggestions.length === 0) return [];

  const myVotes = viewerId
    ? await prisma.editSuggestionVote.findMany({
        where: { suggestionId: { in: suggestions.map((s) => s.id) }, userId: viewerId },
      })
    : [];
  const voteMap = new Map(myVotes.map((v) => [v.suggestionId, v.vote]));

  return suggestions.map((s) => ({
    id: s.id,
    changes: parseSuggestionChanges(s.changes),
    note: s.note,
    confirmCount: s.confirmCount,
    disputeCount: s.disputeCount,
    myVote: voteMap.get(s.id) ?? null,
  }));
}

export async function countPendingCommunitySuggestions(): Promise<number> {
  return prisma.storeEditSuggestion.count({
    where: { status: "pending", store: { ownerUserId: null } },
  });
}

/** Merges a suggestion's changed fields onto the store's current values and
 * writes them via the normal updateStore() path, so this goes through the
 * exact same verification-reset rules as a direct edit. */
async function applyChanges(
  store: Store & { hours: StoreHours[] },
  changes: SuggestionChanges,
  resetVerification: boolean
) {
  const merged = {
    name: changes.name ?? store.name,
    description: changes.description ?? store.description,
    addressLine: changes.addressLine ?? store.addressLine,
    city: changes.city ?? store.city,
    postalCode: changes.postalCode ?? store.postalCode,
    country: store.country,
    latitude: store.latitude,
    longitude: store.longitude,
    phone: changes.phone ?? store.phone ?? "",
    website: changes.website ?? store.website ?? "",
    email: changes.email ?? store.email ?? "",
    // Suggestions never touch these — but updateStore() treats a missing
    // key as "clear it" (see normalizeOptional / the fairBadges/categories
    // JSON.stringify(... ?? []) fallback in lib/stores.ts), so they have
    // to be carried forward explicitly or approving a suggestion would
    // silently wipe the store's cover image, badges, and categories.
    coverImage: store.coverImage ?? "",
    fairBadges: JSON.parse(store.fairBadges) as ("fairtrade" | "wfto" | "bcorp" | "organic")[],
    categories: JSON.parse(store.categories) as string[],
    // Suggestions never touch social links either — carry them forward
    // for the same reason as fairBadges/categories/coverImage above.
    socialLinks: JSON.parse(store.socialLinks) as SocialLink[],
    ...(changes.hours ? { hours: changes.hours } : {}),
  };

  return updateStore(store.slug, merged, { resetVerification });
}

/**
 * Direct approve/reject by whoever is authorized to review this suggestion:
 * the store's owner if it's managed, or an admin/moderator either way.
 */
export async function reviewEditSuggestion(
  suggestionId: string,
  action: "approve" | "reject",
  actingUser: { id: string; role?: string }
): Promise<{ error: "NOT_FOUND" | "FORBIDDEN" | "ALREADY_REVIEWED" } | { success: true }> {
  const suggestion = await prisma.storeEditSuggestion.findUnique({
    where: { id: suggestionId },
    include: { store: { include: { hours: true } } },
  });
  if (!suggestion) return { error: "NOT_FOUND" };
  if (suggestion.status !== "pending") return { error: "ALREADY_REVIEWED" };

  const isOwner = suggestion.store.ownerUserId === actingUser.id;
  const isModerator = canModerate(actingUser);
  if (!isOwner && !isModerator) {
    return { error: "FORBIDDEN" };
  }

  if (action === "approve") {
    await applyChanges(
      suggestion.store,
      parseSuggestionChanges(suggestion.changes),
      !isModerator
    );
    await adjustTrustScore(suggestion.suggestedByUserId, TRUST_SCORE_DELTAS.editSuggestionApplied);
  } else {
    await adjustTrustScore(suggestion.suggestedByUserId, TRUST_SCORE_DELTAS.editSuggestionRejected);
  }

  await prisma.storeEditSuggestion.update({
    where: { id: suggestionId },
    data: {
      status: action === "approve" ? "approved" : "rejected",
      reviewedByUserId: actingUser.id,
      reviewedAt: new Date(),
    },
  });

  return { success: true };
}

/**
 * Community confirm/dispute vote on a pending suggestion for an *unmanaged*
 * store. Reaching the net-vote threshold either way resolves it
 * automatically — see EDIT_SUGGESTION_THRESHOLDS in lib/trust.ts.
 */
export async function castSuggestionVote(
  suggestionId: string,
  userId: string,
  vote: AttestationVote
): Promise<
  | { error: "NOT_FOUND" | "NOT_COMMUNITY_REVIEWABLE" | "OWN_SUGGESTION" | "ALREADY_REVIEWED" }
  | { confirmCount: number; disputeCount: number; status: "pending" | "approved" | "rejected" }
> {
  const suggestion = await prisma.storeEditSuggestion.findUnique({
    where: { id: suggestionId },
    include: { store: { include: { hours: true } } },
  });
  if (!suggestion) return { error: "NOT_FOUND" };
  if (suggestion.store.ownerUserId !== null) {
    return { error: "NOT_COMMUNITY_REVIEWABLE" };
  }
  if (suggestion.status !== "pending") return { error: "ALREADY_REVIEWED" };
  if (suggestion.suggestedByUserId === userId) return { error: "OWN_SUGGESTION" };

  await prisma.editSuggestionVote.upsert({
    where: { suggestionId_userId: { suggestionId, userId } },
    create: { suggestionId, userId, vote },
    update: { vote },
  });

  const [confirmCount, disputeCount] = await Promise.all([
    prisma.editSuggestionVote.count({ where: { suggestionId, vote: "confirm" } }),
    prisma.editSuggestionVote.count({ where: { suggestionId, vote: "dispute" } }),
  ]);

  const net = confirmCount - disputeCount;
  let status: "pending" | "approved" | "rejected" = "pending";

  if (net >= EDIT_SUGGESTION_THRESHOLDS.autoApply) {
    status = "approved";
    // Community-applied changes are, by definition, not from a trusted
    // editor — always reset verification, same as any non-privileged edit.
    await applyChanges(suggestion.store, parseSuggestionChanges(suggestion.changes), true);
    await adjustTrustScore(suggestion.suggestedByUserId, TRUST_SCORE_DELTAS.editSuggestionApplied);
  } else if (-net >= EDIT_SUGGESTION_THRESHOLDS.autoReject) {
    status = "rejected";
    await adjustTrustScore(suggestion.suggestedByUserId, TRUST_SCORE_DELTAS.editSuggestionRejected);
  }

  if (status !== "pending") {
    await prisma.storeEditSuggestion.update({
      where: { id: suggestionId },
      data: { status, confirmCount, disputeCount, reviewedAt: new Date() },
    });
  } else {
    await prisma.storeEditSuggestion.update({
      where: { id: suggestionId },
      data: { confirmCount, disputeCount },
    });
  }

  return { confirmCount, disputeCount, status };
}