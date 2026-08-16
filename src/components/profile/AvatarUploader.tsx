"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AvatarUploaderProps {
  currentAvatarUrl: string | null;
  fallbackInitial: string;
}

export function AvatarUploader({ currentAvatarUrl, fallbackInitial }: AvatarUploaderProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentAvatarUrl);
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
    formData.append("avatar", file);

    const res = await fetch("/api/profile/avatar", { method: "POST", body: formData });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Upload fehlgeschlagen.");
      setPreview(currentAvatarUrl);
      return;
    }

    setPreview(data.avatarUrl);
    router.refresh();
  }

  async function handleRemove() {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/profile/avatar", { method: "DELETE" });
    setLoading(false);

    if (!res.ok) {
      setError("Entfernen fehlgeschlagen.");
      return;
    }

    setPreview(null);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sage text-2xl font-semibold text-white">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="h-full w-full object-cover" />
        ) : (
          fallbackInitial
        )}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        )}
      </div>

      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
            disabled={loading}
          >
            <Camera className="h-4 w-4" /> Bild ändern
          </Button>
          {preview && (
            <Button type="button" variant="ghost" size="sm" onClick={handleRemove} disabled={loading}>
              <X className="h-4 w-4" /> Entfernen
            </Button>
          )}
        </div>
        <p className="mt-1 text-xs text-earth/50">JPG, PNG oder WebP, max. 5 MB.</p>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
}