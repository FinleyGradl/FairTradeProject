import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Deliberately uses a second, edge-safe NextAuth instance built only from
// authConfig — NOT the one exported from src/auth.ts. That file pulls in
// bcrypt and the full Prisma client for the Credentials provider, neither
// of which the Edge Runtime (which middleware always runs in) can execute.
export const { auth: middleware } = NextAuth(authConfig);

// Add any route that should require a logged-in user here.
// Everything else stays public (directory, search, map, store pages, etc.).
export const config = {
  matcher: ["/me/:path*"],
};