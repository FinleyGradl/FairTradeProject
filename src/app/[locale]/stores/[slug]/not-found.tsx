import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button"; 
import { cn } from "@/lib/utils";

export default function StoreNotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-earth">Store not found</h1>
      <p className="mt-2 text-earth/70">
        This store may have been removed or the link is incorrect.
      </p>
      <Link href="/explore" className={cn(buttonVariants(), "mt-6")}>Browse all stores</Link>
    </div>
  );
}
