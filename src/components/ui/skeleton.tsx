// path: src/components/ui/skeleton.tsx
import { cn } from "@/lib/utils";

// Simple pulsing placeholder block, used by the various loading.tsx files
// to build route-shaped skeletons instead of a single generic spinner.
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-sage/10", className)} />;
}