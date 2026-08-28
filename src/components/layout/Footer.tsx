import Link from "next/link";
import { Compass, Heart, Search, User } from "lucide-react";

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
          <div className="flex gap-8 text-sm">
            <div>
              <p className="font-medium text-earth">Entdecken</p>
              <ul className="mt-2 space-y-1 text-earth/70">
                <li><Link href="/explore" className="hover:text-sage">Läden erkunden</Link></li>
                <li><Link href="/search" className="hover:text-sage">Suche</Link></li>
                <li><Link href="/add-store" className="hover:text-sage">Laden hinzufügen</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-earth">Kategorien</p>
              <ul className="mt-2 space-y-1 text-earth/70">
                <li><Link href="/kategorie/mode" className="hover:text-sage">Mode &amp; Kleidung</Link></li>
                <li><Link href="/kategorie/lebensmittel" className="hover:text-sage">Lebensmittel</Link></li>
                <li><Link href="/kategorie/kaffee-tee" className="hover:text-sage">Kaffee &amp; Tee</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-earth">Über uns</p>
              <ul className="mt-2 space-y-1 text-earth/70">
                <li><Link href="/about" className="hover:text-sage">Unsere Mission</Link></li>
                <li><Link href="/about#fair-trade" className="hover:text-sage">Was ist Fairtrade?</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-earth">Rechtliches</p>
              <ul className="mt-2 space-y-1 text-earth/70">
                <li><Link href="/impressum" className="hover:text-sage">Impressum</Link></li>
                <li><Link href="/datenschutz" className="hover:text-sage">Datenschutz</Link></li>
                <li><Link href="/nutzungsbedingungen" className="hover:text-sage">Nutzungsbedingungen</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-earth/50">
          © {new Date().getFullYear()} FairFind — Prototype
        </p>
      </div>
    </footer>
  );
}

export function MobileNav() {
  const links = [
    { href: "/explore", icon: Compass, label: "Entdecken" },
    { href: "/search", icon: Search, label: "Suche" },
    { href: "/me/saved", icon: Heart, label: "Gespeichert" },
    { href: "/about", icon: User, label: "Über uns" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-sage/10 bg-white md:hidden">
      <div className="flex justify-around py-2">
        {links.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-0.5 px-3 py-1 text-xs text-earth/70 hover:text-sage"
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}