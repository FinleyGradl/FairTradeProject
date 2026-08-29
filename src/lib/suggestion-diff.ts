// path: src/lib/suggestion-diff.ts
//
// Client-safe (no Prisma import) formatting helpers shared by every place
// that renders a StoreEditSuggestion's changes against a store's current
// values: the owner's review queue, the admin moderation queue, and the
// public community-vote widget.
import { getDayName } from "@/lib/hours";

export const SUGGESTION_FIELD_LABELS: Record<string, string> = {
  name: "Name",
  description: "Beschreibung",
  addressLine: "Adresse",
  city: "Stadt",
  postalCode: "PLZ",
  phone: "Telefon",
  website: "Website",
  email: "E-Mail",
};

export interface HourChange {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

export type SuggestionChanges = Partial<Record<keyof typeof SUGGESTION_FIELD_LABELS, string>> & {
  hours?: HourChange[];
};

export interface CurrentStoreSnapshot {
  name: string;
  description: string;
  addressLine: string;
  city: string;
  postalCode: string;
  phone: string | null;
  website: string | null;
  email: string | null;
  hours: HourChange[];
}

function formatHour(h: HourChange | undefined): string {
  if (!h || h.isClosed) return "geschlossen";
  return `${h.openTime}\u2013${h.closeTime}`;
}

/** Every changed scalar (non-hours) field, paired with the store's current
 * value for a before/after display. */
export function getScalarFieldDiffs(changes: SuggestionChanges, current: CurrentStoreSnapshot) {
  return Object.entries(SUGGESTION_FIELD_LABELS)
    .filter(([key]) => changes[key as keyof typeof SUGGESTION_FIELD_LABELS] !== undefined)
    .map(([key, label]) => ({
      field: key,
      label,
      oldValue: (current[key as keyof CurrentStoreSnapshot] as string) || "\u2014",
      newValue: (changes[key as keyof typeof SUGGESTION_FIELD_LABELS] as string) || "\u2014",
    }));
}

/** Only the days whose hours actually differ from the store's current
 * schedule (the suggestion always carries the full 7-day set). */
export function getHoursDiffs(changes: SuggestionChanges, current: CurrentStoreSnapshot) {
  if (!changes.hours) return [];
  return changes.hours
    .map((newHour) => {
      const oldHour = current.hours.find((h) => h.dayOfWeek === newHour.dayOfWeek);
      return {
        dayOfWeek: newHour.dayOfWeek,
        dayName: getDayName(newHour.dayOfWeek),
        oldLabel: formatHour(oldHour),
        newLabel: formatHour(newHour),
      };
    })
    .filter((d) => d.oldLabel !== d.newLabel);
}

export function hasAnyDiff(changes: SuggestionChanges, current: CurrentStoreSnapshot): boolean {
  return getScalarFieldDiffs(changes, current).length > 0 || getHoursDiffs(changes, current).length > 0;
}
