import { THEME_COOKIE } from "@/lib/theme";

// Runs synchronously in <head>, before the page paints. When the stored
// preference is "system" (or no cookie exists yet), the server can't know
// the visitor's OS color scheme, so without this script a system-dark user
// would briefly see the light theme flash before React hydrates.
const script = `
(function() {
  try {
    var match = document.cookie.match(/(?:^|; )${THEME_COOKIE}=([^;]*)/);
    var theme = match ? decodeURIComponent(match[1]) : "system";
    var isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isDark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export function ThemeScript() {
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
