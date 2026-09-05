import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { DM_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ThemeScript } from "@/components/providers/ThemeScript";
import { THEME_COOKIE, isTheme } from "@/lib/theme";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const siteName = "FairFind";
const defaultTitle = "FairFind — Discover Fair Trade Stores";
const defaultDescription =
  "Find fair-trade stores near you. Browse ethical shops, products, and reviews across Germany.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Tints the mobile browser UI (address bar etc.) to match the active
  // theme instead of leaving it default white in dark mode.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#121512" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | FairFind",
  },
  description: defaultDescription,
  keywords: [
    "fair trade",
    "fairer handel",
    "fair trade shop",
    "Weltladen",
    "ethical shopping",
    "sustainable products",
    "fair trade Germany",
  ],
  applicationName: siteName,
  authors: [{ name: siteName }],
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    type: "website",
    locale: "de_DE",
    // images intentionally omitted here — Next.js auto-detects
    // src/app/opengraph-image.tsx and injects og:image (and the twitter
    // equivalent) for every route that doesn't define its own.
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const storedTheme = cookieStore.get(THEME_COOKIE)?.value;
  const initialTheme = isTheme(storedTheme) ? storedTheme : "system";
  // Only an explicit "dark" cookie can be rendered server-side — "system"
  // depends on the visitor's OS setting, which ThemeScript resolves
  // client-side before paint (see that file for why).
  const initialClassIsDark = initialTheme === "dark";

  return (
    <html lang="de" className={initialClassIsDark ? "dark" : undefined} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <a href="#main-content" className="skip-link">
          Zum Hauptinhalt springen
        </a>
        <ThemeProvider initialTheme={initialTheme}>
          <AuthProvider>
            <Header />
            <main
              id="main-content"
              tabIndex={-1}
              className="min-h-[calc(100vh-8rem)] pb-20 outline-none md:pb-0"
            >
              {children}
            </main>
            <Footer />
            <MobileNav />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}