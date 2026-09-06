// path: src/app/stores/[slug]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function StoreDetailLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {/* Hero gallery */}
      <Skeleton className="aspect-[16/7] w-full" />

      {/* Header: name, badges, rating */}
      <div className="mt-6 flex flex-col gap-3">
        <Skeleton className="h-8 w-2/3" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-5 w-40" />
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />

          <div className="pt-4">
            <Skeleton className="mb-3 h-6 w-32" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square" />
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Skeleton className="mb-3 h-6 w-32" />
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="mb-3 h-24 w-full" />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
}