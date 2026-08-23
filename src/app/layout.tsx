import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer, MobileNav } from "@/components/layout/Footer";
import { AuthProvider } from "@/components/providers/AuthProvider";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <AuthProvider>
          <Header />
          <main className="min-h-[calc(100vh-8rem)] pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
        </AuthProvider>
      </body>
    </html>
  );
}