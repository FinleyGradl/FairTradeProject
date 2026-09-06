// path: src/app/kategorie/[slug]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function KategorieLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Skeleton className="h-8 w-72" />
      <Skeleton className="mt-2 h-4 w-96 max-w-full" />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-sage/10">
            <Skeleton className="aspect-[16/10] w-full rounded-none" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}