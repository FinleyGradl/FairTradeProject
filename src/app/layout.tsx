import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer, MobileNav } from "@/components/layout/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: {
    default: "FairFind — Discover Fair Trade Stores",
    template: "%s | FairFind",
  },
  description:
    "Find fair-trade stores near you. Browse ethical shops, products, and reviews across Germany.",
  openGraph: {
    title: "FairFind — Discover Fair Trade Stores",
    description: "Location-aware directory of fair-trade stores.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-[calc(100vh-8rem)] pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
