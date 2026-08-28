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

export const metadata: Metadata = {
  metadataBase: new URL("https://traceable.ddns.net"),
  title: {
    default: "FairFind – Fairtrade Läden in deiner Nähe finden",
    template: "%s | FairFind",
  },
  description:
    "Finde Fairtrade Shops, nachhaltige Mode und faire Lebensmittel. Entdecke zertifizierte Weltläden und lies Bewertungen der Community.",
  openGraph: {
    title: "FairFind – Fairtrade Läden in deiner Nähe finden",
    description:
      "Standortbasiertes Verzeichnis für Fairtrade-Läden und Weltläden in ganz Deutschland.",
    type: "website",
    locale: "de_DE",
    siteName: "FairFind",
  },
  twitter: {
    card: "summary_large_image",
    title: "FairFind – Fairtrade Läden in deiner Nähe finden",
    description:
      "Finde zertifizierte Fairtrade-Shops und Weltläden in deiner Nähe.",
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