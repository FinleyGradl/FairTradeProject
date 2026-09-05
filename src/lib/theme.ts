export type Theme = "light" | "dark" | "system";

export const THEME_COOKIE = "theme";
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function isTheme(value: string | undefined | null): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}
