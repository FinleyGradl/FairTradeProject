"use client";
// path: src/components/store/PhotoGallery.tsx

import { useRef, useState } from "react";
import Link from "next/link";
import { Camera, Flag, Loader2, Trash2, X, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDialogA11y } from "@/lib/a11y";

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string | null;
  uploadedBy: { id: string; name: string | null } | null;
  reportCount: number;
  reportedByMe: boolean;
}

interface PhotoGalleryProps {
  storeSlug: string;
  photos: GalleryPhoto[];
  isSignedIn: boolean;
  currentUserId?: string | null;
  /** Store owner/creator or admin/moderator — may delete any photo. */
  canManageStore: boolean;
}

export function PhotoGallery({
  storeSlug,
  photos: initialPhotos,
  isSignedIn,
  currentUserId,
  canManageStore,
}: PhotoGalleryProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>(initialPhotos);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openPhoto, setOpenPhoto] = useState<GalleryPhoto | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

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
  }

  async function handleReport(photo: GalleryPhoto) {
    setBusyId(photo.id);
    setError(null);
    const res = await fetch(`/api/v1/photos/${photo.id}/report`, { method: "POST" });
    const data = await res.json().catch(() => ({}));
    setBusyId(null);

    if (!res.ok) {
      setError(data.error ?? "Melden fehlgeschlagen.");
      return;
    }

    setPhotos((prev) =>
      prev.map((p) => (p.id === photo.id ? { ...p, reportedByMe: true, reportCount: data.reportCount } : p))
    );
    setOpenPhoto((prev) => (prev?.id === photo.id ? { ...prev, reportedByMe: true } : prev));
  }

  async function handleDelete(photo: GalleryPhoto) {
    if (!confirm("Dieses Foto wirklich entfernen?")) return;
    setBusyId(photo.id);
    setError(null);
    const res = await fetch(`/api/v1/stores/${storeSlug}/photos/${photo.id}`, {
      method: "DELETE",
    });
    setBusyId(null);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Entfernen fehlgeschlagen.");
      return;
    }

    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    setOpenPhoto((prev) => (prev?.id === photo.id ? null : prev));
  }

  function canDelete(photo: GalleryPhoto) {
    return canManageStore || (Boolean(currentUserId) && photo.uploadedBy?.id === currentUserId);
  }

  const closeLightbox = () => setOpenPhoto(null);
  const lightboxPanelRef = useRef<HTMLDivElement>(null);
  useDialogA11y(!!openPhoto, closeLightbox, lightboxPanelRef);
  const dialogTitleId = "photo-lightbox-title";

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-earth">
          <Images className="h-5 w-5 text-sage dark:text-sage-300" />
          Galerie {photos.length > 0 ? `(${photos.length})` : ""}
        </h2>
        {isSignedIn ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Camera className="h-3.5 w-3.5" />
            )}
            Foto hinzufügen
          </Button>
        ) : (
          <Link href="/login" className="text-sm text-sage dark:text-sage-300 hover:underline">
            Anmelden, um Fotos hinzuzufügen
          </Link>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && <p className="mb-3 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {photos.length === 0 ? (
        <p className="text-sm text-earth/60">
          Noch keine Fotos. Sei die/der Erste, der eins hochlädt!
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {photos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setOpenPhoto(photo)}
              className="group relative aspect-square overflow-hidden rounded-lg border border-sage/10 bg-sage-50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.caption ?? ""}
                loading="lazy"
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      )}

      {openPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closeLightbox}
        >
          <div
            ref={lightboxPanelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            className="relative max-h-full max-w-2xl overflow-hidden rounded-xl bg-surface"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeLightbox}
              autoFocus
              className="absolute right-2 top-2 z-10 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70"
              aria-label="Schließen"
            >
              <X className="h-4 w-4" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={openPhoto.url} alt={openPhoto.caption ?? ""} className="max-h-[70vh] w-full object-contain" />
            <div className="flex items-center justify-between gap-2 p-3">
              <div id={dialogTitleId} className="text-xs text-earth/60">
                {openPhoto.caption && <p className="mb-0.5 text-sm text-earth/80">{openPhoto.caption}</p>}
                Hochgeladen von {openPhoto.uploadedBy?.name ?? "Nutzer:in"}
              </div>
              <div className="flex shrink-0 gap-2">
                {isSignedIn && !openPhoto.reportedByMe && openPhoto.uploadedBy?.id !== currentUserId && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-earth/60"
                    onClick={() => handleReport(openPhoto)}
                    disabled={busyId === openPhoto.id}
                  >
                    <Flag className="h-3.5 w-3.5" /> Melden
                  </Button>
                )}
                {openPhoto.reportedByMe && (
                  <span className="text-xs text-earth/50">Gemeldet</span>
                )}
                {canDelete(openPhoto) && (
                  <Button
                    type="button"
                    variant="destructiveOutline"
                    size="sm"
                    className="gap-1"
                    onClick={() => handleDelete(openPhoto)}
                    disabled={busyId === openPhoto.id}
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Entfernen
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}