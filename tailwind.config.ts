import type { Config } from "tailwindcss";

// Small helper so our CSS-variable-backed tokens support Tailwind's
// opacity modifiers (e.g. `bg-cream/60`, `text-earth/70`) exactly like a
// static hex color would. The variables themselves hold "R G B" triplets
// (see :root / .dark in globals.css) and swap value under the `.dark`
// class, so every existing usage of these tokens becomes dark-mode-aware
// without touching the ~100+ files that already use them.
function withOpacity(variable: string) {
  return `rgb(var(${variable}) / <alpha-value>)`;
}

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          // DEFAULT and the numbered brand shades stay fixed across
          // themes (buttons/accents keep a consistent brand green).
          // Only the very light tint shades, used as subtle hover/active
          // backgrounds, are theme-aware — a light-green tint that must
          // become a dark, muted tint on dark backgrounds.
          DEFAULT: "#4A7C59",
          50: withOpacity("--color-sage-50"),
          100: withOpacity("--color-sage-100"),
          200: "#c8dbce",
          300: "#9fbfaa",
          400: "#739f82",
          500: "#4A7C59",
          600: "#3d6649",
          700: "#33523c",
          800: "#2b4233",
          900: "#24372b",
        },
        cream: withOpacity("--color-cream"),
        earth: withOpacity("--color-earth"),
        // New token: card/panel background. Previously most cards used
        // the literal `bg-white`; in dark mode "white" cards would be
        // jarring, so this gives cards their own themeable surface color
        // that sits one step lighter than the page background.
        surface: withOpacity("--color-surface"),
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
