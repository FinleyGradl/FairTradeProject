import type { MetadataRoute } from "next";

const BASE_URL = "https://traceable.ddns.net";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Admin- und Nutzer-Dashboards aus dem Index ausschließen
        disallow: [
          "/admin/",
          "/api/",
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
          "/verify-email",
          "/me/",
          "/profile/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
