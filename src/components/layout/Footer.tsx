import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-sage/10 bg-cream py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <p className="font-bold text-earth">FairFind</p>
            <p className="mt-1 max-w-sm text-sm text-earth/70">
              Fairtrade Läden und Weltläden in deiner Nähe entdecken. Nachhaltiges Einkaufen in ganz Deutschland.
            </p>
          </div>
          <nav aria-label="Footer-Navigation" className="flex gap-8 text-sm">
            <div>
              <p className="font-medium text-earth">Entdecken</p>
              <ul className="mt-2 space-y-1 text-earth/70">
                <li><Link href="/explore" className="hover:text-sage hover:dark:text-sage-300">Läden erkunden</Link></li>
                <li><Link href="/search" className="hover:text-sage hover:dark:text-sage-300">Suche</Link></li>
                <li><Link href="/add-store" className="hover:text-sage hover:dark:text-sage-300">Laden hinzufügen</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-earth">Kategorien</p>
              <ul className="mt-2 space-y-1 text-earth/70">
                <li><Link href="/kategorie/mode" className="hover:text-sage hover:dark:text-sage-300">Mode &amp; Kleidung</Link></li>
                <li><Link href="/kategorie/lebensmittel" className="hover:text-sage hover:dark:text-sage-300">Lebensmittel</Link></li>
                <li><Link href="/kategorie/kaffee-tee" className="hover:text-sage hover:dark:text-sage-300">Kaffee &amp; Tee</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-earth">Über uns</p>
              <ul className="mt-2 space-y-1 text-earth/70">
                <li><Link href="/about" className="hover:text-sage hover:dark:text-sage-300">Unsere Mission</Link></li>
                <li><Link href="/about#fair-trade" className="hover:text-sage hover:dark:text-sage-300">Was ist Fairtrade?</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-earth">Rechtliches</p>
              <ul className="mt-2 space-y-1 text-earth/70">
                <li><Link href="/impressum" className="hover:text-sage hover:dark:text-sage-300">Impressum</Link></li>
                <li><Link href="/datenschutz" className="hover:text-sage hover:dark:text-sage-300">Datenschutz</Link></li>
                <li><Link href="/nutzungsbedingungen" className="hover:text-sage hover:dark:text-sage-300">Nutzungsbedingungen</Link></li>
                <li><Link href="/barrierefreiheit" className="hover:text-sage hover:dark:text-sage-300">Barrierefreiheit</Link></li>
              </ul>
            </div>
          </nav>
        </div>
        <p className="mt-8 text-center text-xs text-earth/50">
          © {new Date().getFullYear()} FairFind — Prototype
        </p>
      </div>
    </footer>
  );
}