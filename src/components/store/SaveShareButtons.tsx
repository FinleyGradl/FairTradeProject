"use client";

import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SaveButtonProps {
  storeId: string;
  className?: string;
}

export function SaveButton({ storeId, className }: SaveButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("fairfind-saved-stores");
    if (stored) {
      const ids: string[] = JSON.parse(stored);
      setSaved(ids.includes(storeId));
    }
  }, [storeId]);

  const toggle = () => {
    const stored = localStorage.getItem("fairfind-saved-stores");
    const ids: string[] = stored ? JSON.parse(stored) : [];
    const next = saved ? ids.filter((id) => id !== storeId) : [...ids, storeId];
    localStorage.setItem("fairfind-saved-stores", JSON.stringify(next));
    setSaved(!saved);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label={saved ? "Remove from saved" : "Save store"}
      className={cn(saved && "border-red-300 text-red-500", className)}
    >
      <Heart className={cn("h-4 w-4", saved && "fill-current")} />
    </Button>
  );
}

interface ShareButtonProps {
  title: string;
  className?: string;
}

export function ShareButton({ title, className }: ShareButtonProps) {
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={share} aria-label="Share" className={className}>
      <Share2 className="h-4 w-4" />
    </Button>
  );
}
