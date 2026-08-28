// path: src/app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FairFind — Discover Fair Trade Stores";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "linear-gradient(135deg, #0f4d3a 0%, #1a7a52 55%, #2fa06a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.15)",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
            }}
          >
            🌿
          </div>
          <div style={{ display: "flex", fontSize: "36px", color: "#eafff2", fontWeight: 700 }}>
            FairFind
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "64px",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            maxWidth: "980px",
          }}
        >
          Discover Fair Trade Stores Near You
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            color: "rgba(255,255,255,0.85)",
            marginTop: "28px",
            maxWidth: "900px",
          }}
        >
          Ethical shops, products &amp; reviews across Germany
        </div>
      </div>
    ),
    { ...size }
  );
}
