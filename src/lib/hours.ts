import { format, isWithinInterval, parse } from "date-fns";

export interface StoreHourRow {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function getDayName(dayOfWeek: number): string {
  return DAY_NAMES[dayOfWeek] ?? "?";
}

/** Convert JS getDay() (0=Sun) to our schema (0=Mon) */
export function jsDayToSchemaDay(jsDay: number): number {
  return jsDay === 0 ? 6 : jsDay - 1;
}

export function isOpenNow(hours: StoreHourRow[], now = new Date()): boolean {
  const day = jsDayToSchemaDay(now.getDay());
  const today = hours.find((h) => h.dayOfWeek === day);
  if (!today || today.isClosed) return false;

  const open = parse(today.openTime, "HH:mm", now);
  const close = parse(today.closeTime, "HH:mm", now);
  return isWithinInterval(now, { start: open, end: close });
}

export function getOpenStatusLabel(hours: StoreHourRow[], now = new Date()): string {
  if (isOpenNow(hours, now)) return "Open now";
  const day = jsDayToSchemaDay(now.getDay());
  const today = hours.find((h) => h.dayOfWeek === day);
  if (today && !today.isClosed) {
    return `Opens ${today.openTime}`;
  }
  for (let i = 1; i <= 7; i++) {
    const nextDay = (day + i) % 7;
    const row = hours.find((h) => h.dayOfWeek === nextDay);
    if (row && !row.isClosed) {
      return `Opens ${getDayName(nextDay)} ${row.openTime}`;
    }
  }
  return "Closed";
}

export function formatHoursTable(hours: StoreHourRow[]): { day: string; hours: string; isToday: boolean }[] {
  const today = jsDayToSchemaDay(new Date().getDay());
  return [0, 1, 2, 3, 4, 5, 6].map((day) => {
    const row = hours.find((h) => h.dayOfWeek === day);
    return {
      day: getDayName(day),
      hours: row?.isClosed ? "Closed" : row ? `${row.openTime} – ${row.closeTime}` : "—",
      isToday: day === today,
    };
  });
}

export function formatTime(time: string): string {
  try {
    const parsed = parse(time, "HH:mm", new Date());
    return format(parsed, "HH:mm");
  } catch {
    return time;
  }
}
