import { MapPin } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "@/components/search/SearchBar";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/layout/UserMenu";
import { auth } from "@/auth";
import { canModerate, getPendingModerationCount } from "@/lib/stores";

export async function Header() {
  const session = await auth();
  // Only bother querying counts for admins/moderators — everyone else
  // never sees the badge, no need to hit the DB on every page for them.
  const pendingModerationCount = canModerate(session?.user)
    ? await getPendingModerationCount()
    : 0;

  return (
    <header className="sticky top-0 z-50 border-b border-sage/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <MapPin className="h-6 w-6 text-sage" />
          <span className="text-xl font-bold text-earth">FairFind</span>
        </Link>

        <div className="hidden flex-1 md:block md:max-w-md lg:max-w-lg">
          <SearchBar />
        </div>

        <nav className="ml-auto flex items-center gap-2">
          <Link href="/explore">
            <Button variant="ghost" size="sm">
              Explore
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="ghost" size="sm" className="md:hidden">
              Search
            </Button>
          </Link>
          <Link href="/add-store">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              Add store
            </Button>
          </Link>
          <UserMenu pendingModerationCount={pendingModerationCount} />
        </nav>
      </div>
    </header>
  );
}