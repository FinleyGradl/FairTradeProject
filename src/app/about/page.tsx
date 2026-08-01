import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-earth">About FairFind</h1>
      <p className="mt-4 text-lg text-earth/80 leading-relaxed">
        FairFind is a location-aware directory of fair-trade stores. We help conscious
        consumers discover ethical shops, browse products, and support businesses that
        prioritize fair wages and sustainable practices.
      </p>

      <section id="fair-trade" className="mt-12">
        <h2 className="text-2xl font-semibold text-earth">What is fair trade?</h2>
        <p className="mt-3 text-earth/80 leading-relaxed">
          Fair trade is a trading partnership based on dialogue, transparency, and respect
          that seeks greater equity in international trade. It contributes to sustainable
          development by offering better trading conditions to, and securing the rights of,
          marginalized producers and workers.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">Fairtrade International</Badge>
          <Badge variant="secondary">WFTO</Badge>
          <Badge variant="secondary">B Corp</Badge>
          <Badge variant="secondary">Organic</Badge>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-earth">How it works</h2>
        <ol className="mt-4 space-y-4 text-earth/80">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage text-sm font-bold text-white">1</span>
            <span><strong className="text-earth">Discover</strong> — Browse stores on the map or search by name, category, or product.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage text-sm font-bold text-white">2</span>
            <span><strong className="text-earth">Save & share</strong> — Bookmark favorites and share stores with friends.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage text-sm font-bold text-white">3</span>
            <span><strong className="text-earth">Contribute</strong> — Add new stores or claim ownership to keep listings up to date.</span>
          </li>
        </ol>
      </section>

      <div className="mt-12 rounded-xl bg-sage-50 p-6 text-center">
        <p className="font-medium text-earth">Ready to explore?</p>
        <Link href="/explore" className="mt-4 inline-block">
          <Button>Browse stores in Berlin</Button>
        </Link>
      </div>
    </div>
  );
}
