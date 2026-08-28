// path: src/app/apple-icon.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a7a52",
          borderRadius: "36px",
        }}
      >
        <div style={{ display: "flex", fontSize: "96px" }}>🌿</div>
      </div>
    ),
    { ...size }
  );
}
