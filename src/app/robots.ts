// path: src/app/robots.ts
import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/me", "/login", "/register", "/reset-password", "/forgot-password"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
