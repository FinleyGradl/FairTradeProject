import { ShieldCheck, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function VerifiedBadge({
  level,
  className,
}: {
  level: "unverified" | "community" | "admin";
  className?: string;
}) {
  if (level === "admin") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full bg-sage px-2.5 py-0.5 text-xs font-medium text-white",
          className
        )}
        title="Von einem Moderator geprüft"
      >
        <ShieldCheck className="h-3.5 w-3.5" /> Admin-geprüft
      </span>
    );
  }

  if (level === "community") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-300",
          className
        )}
        title="Von mehreren unabhängigen Nutzer:innen bestätigt"
      >
        <Users className="h-3.5 w-3.5" /> Community-geprüft
      </span>
    );
  }

  return null;
}