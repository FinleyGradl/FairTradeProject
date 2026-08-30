// path: src/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { loginSchema } from "@/lib/validators/auth";
import { authConfig } from "@/auth.config";
import { rateLimit } from "@/lib/rate-limit";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // The Prisma adapter handles account linking for Google. Credentials
  // sign-in is handled manually below and always uses JWT sessions —
  // NextAuth requires that combination when a Credentials provider is present.
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Map Google's profile fields onto our schema (we use `avatarUrl`,
      // not the Auth.js default `image` field).
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          avatarUrl: profile.picture,
          role: "user" as const,
          isSuperuser: false,
          emailVerified: profile.email_verified ? new Date() : null,
        };
      },
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(raw) {
        const parsed = loginSchema.safeParse(raw);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // Keyed by email rather than IP: the Credentials `authorize()`
        // callback isn't given the incoming Request here, so we can't read
        // a reliable client IP. Locking per-account still stops the
        // realistic threat (credential stuffing / brute-forcing one
        // person's password) even though it can't slow down someone
        // spraying many different emails from one IP — see
        // src/lib/rate-limit.ts for the trade-offs.
        const loginLimit = rateLimit(`login:${email}`, 10, 15 * 60 * 1000);
        if (!loginLimit.success) {
          throw new Error("RATE_LIMITED");
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.password) return null;

        const valid = await verifyPassword(password, user.password);
        if (!valid) return null;

        if (!user.emailVerified) {
          throw new Error("EMAIL_NOT_VERIFIED");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          avatarUrl: user.avatarUrl,
          role: user.role,
          isSuperuser: user.isSuperuser,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role?: string }).role ?? "user";
        token.avatarUrl = (user as { avatarUrl?: string | null }).avatarUrl ?? null;
        token.isSuperuser = (user as { isSuperuser?: boolean }).isSuperuser ?? false;
      }

      // Client called `update()` (e.g. after an avatar upload/removal) —
      // merge the new value into the token so it's actually persisted in
      // the JWT, instead of only living in the current response's session.
      if (trigger === "update" && session?.avatarUrl !== undefined) {
        token.avatarUrl = session.avatarUrl as string | null;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.avatarUrl = token.avatarUrl as string | null;
        session.user.isSuperuser = Boolean(token.isSuperuser);
      }
      return session;
    },
  },
});