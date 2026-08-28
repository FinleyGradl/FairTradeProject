"use client";
// path: src/components/store/StoreHeroGallery.tsx
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, Flag, Loader2, Trash2 } from "lucide-react";

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string | null;
  uploadedBy: { id: string; name: string | null } | null;
  reportCount: number;
  reportedByMe: boolean;
}

type Slide = { kind: "cover"; url: string } | ({ kind: "gallery" } & GalleryPhoto);

interface StoreHeroGalleryProps {
  storeSlug: string;
  storeName: string;
  coverImage: string | null;
  photos: GalleryPhoto[];
  isSignedIn: boolean;
  currentUserId?: string | null;
  /** Store owner/creator or admin/moderator — may delete any gallery photo. */
  canManageStore: boolean;
}

/**
 * Renders the background of the store hero: the cover image first (if set),
 * then every community-uploaded gallery photo, browsable with left/right
 * arrows. The cover slide itself has no report/delete controls here — it's
 * managed separately via the store edit page. Rendered as an absolutely
 * positioned fill layer; the caller is responsible for the gradient/text
 * overlay on top (with pointer-events-none so it doesn't block the arrows).
 */
export function StoreHeroGallery({
  storeSlug,
  storeName,
  coverImage,
  photos: initialPhotos,
  isSignedIn,
  currentUserId,
  canManageStore,
}: StoreHeroGalleryProps) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(initialPhotos);
  const inputRef = useRef<HTMLInputElement>(null);
  const [index, setIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const slides: Slide[] = [
    ...(coverImage ? [{ kind: "cover" as const, url: coverImage }] : []),
    ...photos.map((p) => ({ kind: "gallery" as const, ...p })),
  ];
  const current = slides[index] ?? null;

  function go(delta: number) {
    if (slides.length === 0) return;
    setIndex((i) => (i + delta + slides.length) % slides.length);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setError(null);

    if (file.size > 5 * 1024 * 1024) {
      setError("Bild darf maximal 5 MB groß sein.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("photo", file);
    const res = await fetch(`/api/v1/stores/${storeSlug}/photos`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    setUploading(false);

    if (!res.ok) {
      setError(data.error ?? "Upload fehlgeschlagen.");
      return;
    }

    setPhotos((prev) => [data.photo, ...prev]);
    // Jump straight to the newly added photo (prepended, right after the cover).
    setIndex(coverImage ? 1 : 0);
  }

  async function handleReport() {
    if (!current || current.kind !== "gallery") return;
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/v1/photos/${current.id}/report`, { method: "POST" });
    const data = await res.json().catch(() => ({}));
    setBusy(false);

    if (!res.ok) {
      setError(data.error ?? "Melden fehlgeschlagen.");
      return;
    }
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === current.id ? { ...p, reportedByMe: true, reportCount: data.reportCount } : p
      )
    );
  }

  async function handleDelete() {
    if (!current || current.kind !== "gallery") return;
    if (!confirm("Dieses Foto wirklich entfernen?")) return;

    setBusy(true);
    setError(null);
    const res = await fetch(`/api/v1/stores/${storeSlug}/photos/${current.id}`, {
      method: "DELETE",
    });
    setBusy(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Entfernen fehlgeschlagen.");
      return;
    }

    setPhotos((prev) => prev.filter((p) => p.id !== current.id));
    setIndex((i) => Math.max(0, Math.min(i, slides.length - 2)));
  }

  const canReportCurrent =
    current?.kind === "gallery" &&
    isSignedIn &&
    !current.reportedByMe &&
    current.uploadedBy?.id !== currentUserId;
  const canDeleteCurrent =
    current?.kind === "gallery" && (canManageStore || current.uploadedBy?.id === currentUserId);

  return (
    <>
      {current && (
        <Image src={current.url} alt={storeName} fill className="object-cover" priority sizes="100vw" />
      )}

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
            aria-label="Vorheriges Bild"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
            aria-label="Nächstes Bild"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/40 px-2.5 py-0.5 text-xs text-white">
            {index + 1} / {slides.length}
          </div>
        </>
      )}

      <div className="absolute right-2 top-2 z-10 flex gap-1.5">
        {isSignedIn && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
            aria-label="Foto hinzufügen"
            title="Foto zur Galerie hinzufügen"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
          </button>
        )}
        {canReportCurrent && (
          <button
            type="button"
            onClick={handleReport}
            disabled={busy}
            className="rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
            aria-label="Foto melden"
            title="Foto melden"
          >
            <Flag className="h-4 w-4" />
          </button>
        )}
        {current?.kind === "gallery" && current.reportedByMe && (
          <span className="rounded-full bg-black/40 px-2 py-1 text-xs text-white">Gemeldet</span>
        )}
        {canDeleteCurrent && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            className="rounded-full bg-black/40 p-2 text-white transition hover:bg-red-600"
            aria-label="Foto entfernen"
            title="Foto entfernen"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && (
        <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded bg-red-600 px-3 py-1 text-xs text-white">
          {error}
        </div>
      )}
    </>
  );
}