import Link from "next/link";
import { MapPin, Search, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search/SearchBar";
import { StoreCard } from "@/components/store/StoreCard";
import { getFeaturedStores } from "@/lib/stores";

export default async function HomePage() {
  const featured = await getFeaturedStores(6);

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
            Discover fair-trade stores near you
          </h1>
          <p className="mt-4 text-lg text-white/90">
            Ethical shopping made easy. Find certified fair-trade shops, browse products, and read community reviews.
          </p>
          <div className="mt-8">
            <SearchBar className="mx-auto max-w-lg [&_input]:border-0 [&_input]:shadow-lg" />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/explore">
              <Button size="lg" variant="secondary" className="gap-2">
                <MapPin className="h-5 w-5" />
                Explore map
              </Button>
            </Link>
            <Link href="/add-store">
              <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                <Store className="h-5 w-5" />
                Add a store
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-sage/10 bg-white py-8">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 px-4 text-center">
          <div>
            <p className="text-3xl font-bold text-sage">10+</p>
            <p className="text-sm text-earth/70">Stores in Berlin</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-sage">4</p>
            <p className="text-sm text-earth/70">Fair-trade certifications</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-sage">100%</p>
            <p className="text-sm text-earth/70">Community driven</p>
          </div>
        </div>
      </section>

      {/* Featured stores */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-earth">Featured stores</h2>
            <p className="mt-1 text-earth/70">Hand-picked fair-trade shops in Berlin</p>
          </div>
          <Link href="/explore" className="text-sm font-medium text-sage hover:underline">
            View all →
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
          <Search className="mx-auto h-10 w-10 text-sage" />
          <h2 className="mt-4 text-2xl font-bold text-earth">Know a fair-trade store?</h2>
          <p className="mt-2 text-earth/70">
            Help grow the directory by adding stores in your area. Every listing is reviewed by our community.
          </p>
          <Link href="/add-store" className="mt-6 inline-block">
            <Button size="lg">Submit a store</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
