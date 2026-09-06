import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { DM_Sans } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ThemeScript } from "@/components/providers/ThemeScript";
import { THEME_COOKIE, isTheme } from "@/lib/theme";
import { routing, type AppLocale } from "@/i18n/routing";
import "../globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const defaultTitle = t("defaultTitle");
  const defaultDescription = t("defaultDescription");

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template: `%s | ${t("siteName")}`,
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
    applicationName: t("siteName"),
    authors: [{ name: t("siteName") }],
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    formatDetection: { email: false, address: false, telephone: false },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        de: "/de",
        en: "/en",
      },
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
      url: `${siteUrl}/${locale}`,
      siteName: t("siteName"),
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
    },
  };
}

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Tells next-intl's server APIs (getTranslations, etc.) which locale is
  // active for this request — needed because static rendering can't rely
  // on request headers alone.
  setRequestLocale(locale as AppLocale);

  const t = await getTranslations({ locale, namespace: "common" });

  const cookieStore = await cookies();
  const storedTheme = cookieStore.get(THEME_COOKIE)?.value;
  const initialTheme = isTheme(storedTheme) ? storedTheme : "system";
  // Only an explicit "dark" cookie can be rendered server-side — "system"
  // depends on the visitor's OS setting, which ThemeScript resolves
  // client-side before paint (see that file for why).
  const initialClassIsDark = initialTheme === "dark";

  return (
    <html lang={locale} className={initialClassIsDark ? "dark" : undefined} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <a href="#main-content" className="skip-link">
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
