import { mkdir, writeFile, unlink } from "fs/promises";
import path from "path";

const AVATAR_DIR = path.join(process.cwd(), "public", "uploads", "avatars");
const MAX_AVATAR_BYTES = 5 * 1024 * 1024; // 5 MB

const ALLOWED_MIME_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export function isAllowedAvatarType(mimeType: string): boolean {
  return mimeType in ALLOWED_MIME_EXT;
}

export function isAllowedAvatarSize(bytes: number): boolean {
  return bytes > 0 && bytes <= MAX_AVATAR_BYTES;
}

/**
 * Saves an uploaded avatar image to the local uploads volume and returns
 * the URL to store on the user record.
 *
 * Served via /api/uploads/avatars/[filename] rather than directly from
 * /public: with `output: "standalone"`, Next.js only serves files that
 * existed in /public at build time, so files written here at runtime
 * would 404 if linked to directly. See that route for details.
 */
export async function saveAvatarFile(userId: string, file: File): Promise<string> {
  await mkdir(AVATAR_DIR, { recursive: true });

  const ext = ALLOWED_MIME_EXT[file.type];
  const filename = `${userId}-${Date.now()}.${ext}`;
  const filePath = path.join(AVATAR_DIR, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  return `/api/uploads/avatars/${filename}`;
}

/**
 * Deletes a previously uploaded avatar file, if the given URL points to
 * our local uploads volume (leaves external/Google avatar URLs alone).
 * Accepts both the current API-route URL and the legacy direct /public
 * URL, so old avatarUrl values already in the database still clean up.
 */
export async function deleteAvatarFileIfLocal(avatarUrl: string | null): Promise<void> {
  if (!avatarUrl) return;
  const isCurrent = avatarUrl.startsWith("/api/uploads/avatars/");
  const isLegacy = avatarUrl.startsWith("/uploads/avatars/");
  if (!isCurrent && !isLegacy) return;

  const filename = path.basename(avatarUrl);
  const filePath = path.join(AVATAR_DIR, filename);

  await unlink(filePath).catch(() => {
    // File already gone / never existed — nothing to do.
  });
}