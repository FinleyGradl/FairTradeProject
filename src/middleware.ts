import NextAuth from "next-auth";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { authConfig } from "@/auth.config";
import { routing } from "@/i18n/routing";

// Deliberately uses a second, edge-safe NextAuth instance built only from
// authConfig — NOT the one exported from src/auth.ts. That file pulls in
// bcrypt and the full Prisma client for the Credentials provider, neither
// of which the Edge Runtime (which middleware always runs in) can execute.
const { auth } = NextAuth(authConfig);

const intlMiddleware = createIntlMiddleware(routing);

// auth.config.ts's `authorized` callback checks `nextUrl.pathname.startsWith("/me")`.
// Now that every path is locale-prefixed (/de/me/..., /en/me/...), we strip
// the locale off before handing the request to that callback so the
// route-protection logic itself doesn't need to change at all.
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const localeMatch = pathname.match(/^\/(de|en)(\/.*)?$/);
  const pathWithoutLocale = localeMatch ? localeMatch[2] || "/" : pathname;

  const strippedReq = new NextRequest(
    new URL(pathWithoutLocale + req.nextUrl.search, req.nextUrl.origin),
    req
  );

  // authConfig.callbacks.authorized() redirects to /login (unprefixed) when
  // it denies access — intlMiddleware below still runs on the following
  // request, so the final redirect still ends up correctly locale-prefixed.
  const authResult = authConfig.callbacks.authorized({
    auth: req.auth,
    request: strippedReq,
  } as Parameters<typeof authConfig.callbacks.authorized>[0]);

  if (authResult !== true) {
    return authResult;
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Alles außer: api, Next.js-internals, Dateien mit Endung (Assets),
    // sowie die locale-unabhängigen Root-Dateien (robots.txt, sitemap.xml,
    // manifest, icons).
    "/((?!api|_next|_vercel|robots.txt|sitemap.xml|manifest.webmanifest|.*\\..*).*)",
  ],
};
