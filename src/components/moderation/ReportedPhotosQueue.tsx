"use client";
// path: src/components/moderation/ReportedPhotosQueue.tsx

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flag, Loader2, Trash2, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ReportedPhoto {
  id: string;
  url: string;
  caption: string | null;
  reportCount: number;
  store: { slug: string; name: string };
  uploadedBy: { name: string | null; email: string } | null;
  reports: { userName: string | null; reason: string | null; createdAt: string }[];
}

export function ReportedPhotosQueue({ photos }: { photos: ReportedPhoto[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [items, setItems] = useState(photos);

  async function remove(photo: ReportedPhoto) {
    setBusyId(photo.id);
    const res = await fetch(`/api/v1/stores/${photo.store.slug}/photos/${photo.id}`, {
      method: "DELETE",
    });
    setBusyId(null);
    if (res.ok) {
      setItems((prev) => prev.filter((p) => p.id !== photo.id));
      router.refresh();
    }
  }

  async function dismiss(photo: ReportedPhoto) {
    setBusyId(photo.id);
    const res = await fetch(`/api/v1/photos/${photo.id}/report`, {
      method: "DELETE",
    });
    setBusyId(null);
    if (res.ok) {
      setItems((prev) => prev.filter((p) => p.id !== photo.id));
      router.refresh();
    }
  }

  if (items.length === 0) {
    return <p className="text-sm text-earth/60">Keine gemeldeten Fotos. 🎉</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((photo) => (
        <div key={photo.id} className="rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50/40 dark:bg-amber-950/20 p-4">
          <div className="flex flex-wrap items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt={photo.caption ?? ""}
              loading="lazy"
              className="h-24 w-24 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <Link
                    href={`/stores/${photo.store.slug}`}
                    className="font-medium text-earth hover:underline"
                  >
                    {photo.store.name}
                  </Link>
                  <p className="text-xs text-earth/50">
                    Hochgeladen von {photo.uploadedBy?.name ?? photo.uploadedBy?.email ?? "Unbekannt"}
                  </p>
                </div>
                <Badge variant="outline" className="border-amber-400 dark:border-amber-600 text-amber-700 dark:text-amber-300">
                  {photo.reportCount} Meldungen
                </Badge>
              </div>

              {photo.reports.length > 0 && (
                <ul className="mt-3 space-y-1.5 border-t border-amber-200/60 dark:border-amber-800/40 pt-3">
                  {photo.reports.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-earth/80">
                      <Flag className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                      <span>
                        <span className="font-medium">{r.userName ?? "Anonym"}:</span>{" "}
                        {r.reason || "Kein Grund angegeben"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  variant="destructiveOutline"
                  className="gap-1"
                  onClick={() => remove(photo)}
                  disabled={busyId === photo.id}
                >
                  {busyId === photo.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                  Foto entfernen
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  onClick={() => dismiss(photo)}
                  disabled={busyId === photo.id}
                >
                  {busyId === photo.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <EyeOff className="h-3.5 w-3.5" />
                  )}
                  Meldungen ignorieren
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}