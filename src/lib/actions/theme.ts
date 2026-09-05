"use server";

import { cookies } from "next/headers";
import { THEME_COOKIE, THEME_COOKIE_MAX_AGE, type Theme } from "@/lib/theme";

export async function setThemeCookie(theme: Theme) {
  const cookieStore = await cookies();
  cookieStore.set(THEME_COOKIE, theme, {
    maxAge: THEME_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
  });
}
