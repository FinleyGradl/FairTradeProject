// path: src/lib/notification-categories.ts
// Client-safe constants split out of lib/notification-preferences.ts (which
// pulls in Prisma) — mirrors the suggestion-diff.ts / edit-suggestions.ts
// split for the same reason: client components need these without
// dragging the DB client into the browser bundle.

export const NOTIFICATION_CATEGORIES = [
  "notifyNewStoreReport",
  "notifyNewReviewReport",
  "notifyNewPhotoReport",
  "notifyNewClaim",
  "notifyNewSuggestion",
  "notifySponsorshipStarted",
  "notifySponsorshipCanceled",
  "notifySponsorshipPaymentFailed",
] as const;

export type NotificationCategory = (typeof NOTIFICATION_CATEGORIES)[number];

export const NOTIFICATION_CATEGORY_LABELS: Record<NotificationCategory, string> = {
  notifyNewStoreReport: "Laden wird zur Prüfung gemeldet (Community-Disput)",
  notifyNewReviewReport: "Bewertung erreicht Melde-Schwelle",
  notifyNewPhotoReport: "Foto erreicht Melde-Schwelle",
  notifyNewClaim: "Neue Inhaberschafts-Anfrage",
  notifyNewSuggestion: "Neuer Änderungsvorschlag",
  notifySponsorshipStarted: "Sponsoring wurde abgeschlossen",
  notifySponsorshipCanceled: "Sponsoring wurde gekündigt",
  notifySponsorshipPaymentFailed: "Zahlung für ein Sponsoring ist fehlgeschlagen",
};
