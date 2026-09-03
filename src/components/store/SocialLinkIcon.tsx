// src/components/store/SocialLinkIcon.tsx
//
// Maps a SocialPlatform to a brand icon where lucide-react ships one
// (Instagram, Facebook, YouTube, LinkedIn, Twitter/X). TikTok, Pinterest,
// and "other" fall back to a generic Link icon since lucide has no
// dedicated glyph for those.
import { Instagram, Facebook, Youtube, Linkedin, Twitter, Link as LinkIcon } from "lucide-react";
import type { SocialPlatform } from "@/lib/constants";

const ICONS: Partial<Record<SocialPlatform, typeof LinkIcon>> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
};

export function SocialLinkIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const Icon = ICONS[platform] ?? LinkIcon;
  return <Icon className={className} />;
}
