// path: src/app/profile/[id]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <Skeleton className="h-5 w-32" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    </div>
  );
}