import Link from "next/link";
import { MapPin, Search, Store } from "lucide-react";
import { buttonVariants } from "@/components/ui/button"; 
import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/search/SearchBar";
import { StoreCard } from "@/components/store/StoreCard";
import { getFeaturedStores, getActiveStoreCount } from "@/lib/stores";

// Force server-side rendering at request time so the DB is never
// contacted during `docker build` (only reachable at runtime).
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featured, storeCount] = await Promise.all([
    getFeaturedStores(6),
    getActiveStoreCount(),
  ]);
  // Round down to a friendly "N+" figure instead of a jumpy exact count.
  const storeCountLabel = storeCount >= 100
    ? `${Math.floor(storeCount / 100) * 100}+`
    : storeCount >= 10
      ? `${Math.floor(storeCount / 10) * 10}+`
      : `${storeCount}`;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-500 to-sage-700 px-4 py-20 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white" />
          <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-white" />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Entdecke Fairtrade Läden &amp; Weltläden in deiner Nähe
          </h1>
          <p className="mt-4 text-lg text-white/90">
            Nachhaltiger Konsum leicht gemacht. Finde zertifizierte Fairtrade-Geschäfte, stöbere in lokalen Produkten und lies echte Bewertungen aus der Community.
          </p>
          <div className="mt-8">
            <SearchBar className="mx-auto max-w-lg [&_input]:border-0 [&_input]:shadow-lg" />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/explore" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "gap-2")}>
                <MapPin className="h-5 w-5" />
                Karte erkunden
              </Link>
            <Link href="/add-store" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white/30 bg-white/10 text-white hover:bg-white/20")}>
                <Store className="h-5 w-5" />
                Laden hinzufügen
              </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-sage/10 bg-surface py-8">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 px-4 text-center">
          <div>
            <p className="text-3xl font-bold text-sage dark:text-sage-300">{storeCountLabel}</p>
            <p className="text-sm text-earth/70">Läden in Deutschland</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-sage dark:text-sage-300">4</p>
            <p className="text-sm text-earth/70">Fairtrade-Zertifizierungen</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-sage dark:text-sage-300">100%</p>
            <p className="text-sm text-earth/70">Community-getrieben</p>
          </div>
        </div>
      </section>

      {/* Featured stores */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-earth">Empfohlene Läden</h2>
            <p className="mt-1 text-earth/70">Handverlesene Weltläden und Fairtrade-Shops in ganz Deutschland</p>
          </div>
          <Link href="/explore" className="text-sm font-medium text-sage dark:text-sage-300 hover:underline">
            Alle anzeigen →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sage-50 px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <Search className="mx-auto h-10 w-10 text-sage dark:text-sage-300" />
          <h2 className="mt-4 text-2xl font-bold text-earth">Kennst du einen Fairtrade-Laden?</h2>
          <p className="mt-2 text-earth/70">
            Hilf uns, die Plattform zu vergrößern, indem du nachhaltige Shops aus deiner Region hinzufügst.
          </p>
          <Link href="/add-store" className={cn(buttonVariants({ size: "lg" }), "mt-6 inline-block")}>Laden eintragen</Link>
        </div>
      </section>
    </>
  );
}