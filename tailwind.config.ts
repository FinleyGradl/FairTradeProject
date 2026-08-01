import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: "#4A7C59",
          50: "#f3f8f4",
          100: "#e3ede6",
          200: "#c8dbce",
          300: "#9fbfaa",
          400: "#739f82",
          500: "#4A7C59",
          600: "#3d6649",
          700: "#33523c",
          800: "#2b4233",
          900: "#24372b",
        },
        cream: "#FAF7F2",
        earth: "#5C4033",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
