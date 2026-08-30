// path: src/app/loading.tsx
import { Loader2 } from "lucide-react";

// Global fallback. Next.js only renders this while a server component
// further down the tree is awaiting data and no more specific loading.tsx
// exists in between — see src/app/stores/[slug]/loading.tsx etc. for the
// routes that get a shaped skeleton instead of this generic spinner.
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4 py-24 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-sage" />
      <p className="text-sm text-earth/60">Wird geladen …</p>
    </div>
  );
}