import type { NextAuthConfig } from "next-auth";

// Kept edge-safe on purpose: no Credentials provider, no Prisma, no bcrypt.
// The full config (with those) lives in src/auth.ts and is only ever
// imported by Node.js runtime code (API routes, server components) —
// never by middleware.ts.
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute = nextUrl.pathname.startsWith("/me");

      if (isProtectedRoute && !isLoggedIn) {
        const redirectUrl = new URL("/login", nextUrl);
        redirectUrl.searchParams.set("callbackUrl", nextUrl.pathname);
        return Response.redirect(redirectUrl);
      }

      return true;
    },
  },
} satisfies NextAuthConfig;