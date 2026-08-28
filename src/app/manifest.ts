// path: src/app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FairFind — Discover Fair Trade Stores",
    short_name: "FairFind",
    description:
      "Find fair-trade stores near you. Browse ethical shops, products, and reviews across Germany.",
    start_url: "/",
    display: "standalone",
    background_color: "#eafff2",
    theme_color: "#1a7a52",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
