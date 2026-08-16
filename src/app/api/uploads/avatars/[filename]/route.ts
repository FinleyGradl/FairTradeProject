import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const AVATAR_DIR = path.join(process.cwd(), "public", "uploads", "avatars");

const EXT_CONTENT_TYPE: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

/**
 * Serves avatar files straight off disk on every request.
 *
 * Why this exists: with `output: "standalone"`, Next.js only serves files
 * that were present in /public at build time. Avatars are written at
 * runtime (see src/lib/uploads.ts), so requesting them directly under
 * /uploads/avatars/... 404s even though the file is really on disk. Route
 * handlers run per-request, so reading the file here works regardless of
 * when it was written.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // Guard against path traversal — only allow a bare filename, no slashes.
  if (!filename || filename.includes("/") || filename.includes("\\") || filename.includes("..")) {
    return NextResponse.json({ error: "Ungültiger Dateiname." }, { status: 400 });
  }

  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const contentType = EXT_CONTENT_TYPE[ext];
  if (!contentType) {
    return NextResponse.json({ error: "Ungültiger Dateityp." }, { status: 400 });
  }

  const filePath = path.join(AVATAR_DIR, filename);

  try {
    const data = await readFile(filePath);
    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // Filenames include a timestamp, so a new upload always gets a new
        // URL — safe to cache the old ones aggressively.
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Datei nicht gefunden." }, { status: 404 });
  }
}
