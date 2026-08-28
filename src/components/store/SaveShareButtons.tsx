// path: src/components/store/SaveShareButtons.tsx
"use client";

import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SaveButtonProps {
  storeSlug: string;
  initialSaved: boolean;
  isLoggedIn: boolean;
  className?: string;
}

export function SaveButton({ storeSlug, initialSaved, isLoggedIn, className }: SaveButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const toggle = async () => {
    if (!isLoggedIn) {
      router.push(`/login?callbackUrl=/stores/${storeSlug}`);
      return;
    }
    if (pending) return;
    setPending(true);
    const next = !saved;
    setSaved(next); // optimistic
    try {
      const res = await fetch(`/api/v1/stores/${storeSlug}/save`, {
        method: next ? "POST" : "DELETE",
      });
      if (!res.ok) throw new Error();
    } catch {
      setSaved(!next); // revert on failure
    } finally {
      setPending(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label={saved ? "Von der Merkliste entfernen" : "Zur Merkliste hinzufügen"}
      title={saved ? "Von der Merkliste entfernen" : "Zur Merkliste hinzufügen"}
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