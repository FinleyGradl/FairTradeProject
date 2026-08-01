import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "No results found",
  description = "Try adjusting your filters or search in a different area.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <SearchX className="mb-4 h-12 w-12 text-sage/40" />
      <h3 className="text-lg font-semibold text-earth">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-earth/70">{description}</p>
    </div>
  );
}
