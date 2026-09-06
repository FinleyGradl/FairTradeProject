"use client";

import { useRef, useState } from "react";
import { Camera, ImageOff, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CoverImageUploaderProps {
  storeSlug: string;
  currentCoverImage: string | null;
  onUploaded: (coverImage: string | null) => void;
}

export function CoverImageUploader({
  storeSlug,
  currentCoverImage,
  onUploaded,
}: CoverImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentCoverImage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (file.size > 5 * 1024 * 1024) {
      setError("Bild darf maximal 5 MB groß sein.");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setLoading(true);

    const formData = new FormData();
    formData.append("cover", file);

    const res = await fetch(`/api/v1/stores/${storeSlug}/cover`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Upload fehlgeschlagen.");
      setPreview(currentCoverImage);
      return;
    }

    setPreview(data.coverImage);
    onUploaded(data.coverImage);
  }

  async function handleRemove() {
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/v1/stores/${storeSlug}/cover`, { method: "DELETE" });
    setLoading(false);

    if (!res.ok) {
      setError("Entfernen fehlgeschlagen.");
      return;
    }

    setPreview(null);
    onUploaded(null);
  }

  return (
    <div>
      <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-xl border border-sage/20 bg-sage-50">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1 text-earth/40">
            <ImageOff className="h-6 w-6" />
            <span className="text-xs">Kein Titelbild</span>
          </div>
        )}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="mt-2 flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
        >
          <Camera className="h-4 w-4" /> Bild hochladen
        </Button>
        {preview && (
          <Button type="button" variant="ghost" size="sm" onClick={handleRemove} disabled={loading}>
            <X className="h-4 w-4" /> Entfernen
          </Button>
        )}
      </div>
      <p className="mt-1 text-xs text-earth/50">JPG, PNG oder WebP, max. 5 MB.</p>
      {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
