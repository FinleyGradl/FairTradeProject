import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"; 
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Über FairFind – Unsere Mission für nachhaltigen Konsum",
  description:
    "FairFind ist das Community-Verzeichnis für Fairtrade-Läden und Weltläden in Deutschland. Erfahre, was Fairtrade bedeutet und wie unsere Plattform funktioniert.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-earth">Über FairFind</h1>
      <p className="mt-4 text-lg text-earth/80 leading-relaxed">
        FairFind ist ein standortbasiertes Verzeichnis für Fairtrade-Läden und Weltläden. Wir helfen
        bewussten Konsumentinnen und Konsumenten dabei, ethische Geschäfte zu entdecken, Produkte zu
        stöbern und Unternehmen zu unterstützen, die faire Löhne und nachhaltige Praktiken in den
        Vordergrund stellen.
      </p>

      <section id="fair-trade" className="mt-12">
        <h2 className="text-2xl font-semibold text-earth">Was ist Fairtrade?</h2>
        <p className="mt-3 text-earth/80 leading-relaxed">
          Fairtrade ist eine Handelspartnerschaft, die auf Dialog, Transparenz und Respekt basiert
          und mehr Gerechtigkeit im internationalen Handel anstrebt. Sie trägt zur nachhaltigen
          Entwicklung bei, indem sie benachteiligten Produzentinnen und Produzenten sowie
          Arbeitnehmerinnen und Arbeitnehmern bessere Handelsbedingungen bietet und ihre Rechte
          sichert.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">Fairtrade International</Badge>
          <Badge variant="secondary">WFTO</Badge>
          <Badge variant="secondary">B Corp</Badge>
          <Badge variant="secondary">Bio / Organic</Badge>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-earth">So funktioniert FairFind</h2>
        <ol className="mt-4 space-y-4 text-earth/80">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage text-sm font-bold text-white">1</span>
            <span><strong className="text-earth">Entdecken</strong> — Durchsuche Läden auf der Karte oder suche nach Name, Kategorie oder Produkt.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage text-sm font-bold text-white">2</span>
            <span><strong className="text-earth">Speichern &amp; teilen</strong> — Merke dir deine Lieblings-Läden und teile sie mit Freunden.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage text-sm font-bold text-white">3</span>
            <span><strong className="text-earth">Beitragen</strong> — Füge neue Läden hinzu oder übernimm die Verantwortung für einen Eintrag, damit das Verzeichnis aktuell bleibt.</span>
          </li>
        </ol>
      </section>

      <div className="mt-12 rounded-xl bg-sage-50 p-6 text-center">
        <p className="font-medium text-earth">Bereit zum Entdecken?</p>
        <Link href="/explore" className={cn(buttonVariants(), "mt-4 inline-block")}>Fairtrade-Läden in deiner Nähe finden</Link>
      </div>
    </div>
  );
}
