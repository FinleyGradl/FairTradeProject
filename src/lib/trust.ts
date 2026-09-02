/**
 * Central place for every trust-score point value, so the community-
 * moderation behaviour can be tuned without hunting through call sites.
 */
export const TRUST_SCORE_DELTAS = {
  /** Awarded once, the first time a user verifies their email. */
  emailVerified: 1,
  /** A store this user submitted/owns reaches "community" verification. */
  storeCommunityVerified: 5,
  /** A store this user submitted/owns reaches "admin" verification. */
  storeAdminVerified: 8,
  /** A store this user submitted/owns gets flagged into the mod queue. */
  storeFlagged: -6,
  /** A store this user submitted/owns is rejected or closed by a moderator. */
  storeRejected: -10,
  /** An ownership claim this user filed gets approved. */
  claimApproved: 6,
  /** An ownership claim this user filed gets rejected. */
  claimRejected: -4,
  /** An edit suggestion this user filed gets approved/applied. */
  editSuggestionApplied: 2,
  /** An edit suggestion this user filed gets rejected. */
  editSuggestionRejected: -2,
  /** A product suggestion this user filed gets approved/applied. */
  productSuggestionApplied: 2,
  /** A product suggestion this user filed gets rejected. */
  productSuggestionRejected: -2,
} as const;

/**
 * How many net (confirm − dispute) votes a store needs before we treat it
 * as community-verified / before we pull it out of the public listing for
 * moderator review. Kept low on purpose — this is a small, local
 * directory, not a high-traffic platform, so requiring dozens of votes
 * would mean listings practically never get a badge.
 */
export const ATTESTATION_THRESHOLDS = {
  /** Net confirmations needed to earn the "Community-geprüft" badge. */
  communityVerify: 3,
  /** Net disputes needed to pull a store out of the public listing. */
  flagForReview: 3,
} as const;

/**
 * Net (confirm − dispute) votes an edit suggestion on an *unmanaged* store
 * needs before the community itself resolves it — mirrors
 * ATTESTATION_THRESHOLDS. An admin/moderator can still resolve it directly
 * at any time via the moderation queue, whichever comes first.
 */
export const EDIT_SUGGESTION_THRESHOLDS = {
  /** Net confirmations needed to auto-apply the suggested change. */
  autoApply: 3,
  /** Net disputes needed to auto-reject the suggestion. */
  autoReject: 3,
} as const;

export function trustBadgeLabel(score: number): string {
  if (score >= 50) return "Vertrauenswürdiges Mitglied";
  if (score >= 10) return "Etabliertes Mitglied";
  if (score < 0) return "Eingeschränktes Vertrauen";
  return "Neues Mitglied";
}