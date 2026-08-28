import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { StoreCard } from "@/components/store/StoreCard";
import { getStores } from "@/lib/stores";
import { Button } from "@/components/ui/button";

// Mapping von URL-Slug zu Anzeigename und Suchbegriff
const KATEGORIE_CONFIG: Record<
  string,
  { name: string; description: string; searchTerm: string; emoji: string }
> = {
  mode: {
    name: "Mode & faire Kleidung",
    description:
      "Entdecke Fairtrade-Modegeschäfte und Weltläden mit fairer Kleidung in deiner Nähe. Keine Ausbeutung, nur faire Produktion.",
    searchTerm: "Clothing",
    emoji: "👗",
  },
  lebensmittel: {
    name: "Faire Lebensmittel",
    description:
      "Finde Läden mit fairen Lebensmitteln, Bio-Produkten und nachhaltigen Lebens­mitteln aus gerechtem Handel in ganz Deutschland.",
    searchTerm: "Grocery",
    emoji: "🛒",
  },
  "kaffee-tee": {
    name: "Fairtrade Kaffee & Tee",
    description:
      "Fairtrade-zertifizierter Kaffee und Tee direkt vom Fairtrade-Laden kaufen. Unterstütze faire Löhne für Kaffeebauern.",
    searchTerm: "Coffee",
    emoji: "☕",
  },
  geschenke: {
    name: "Faire Geschenke",
    description:
      "Nachhaltige Geschenke aus fairem Handel – entdecke Weltläden und Fairtrade-Shops mit sinnvollen Geschenkideen.",
    searchTerm: "Gifts",
    emoji: "🎁",
  },
  "zero-waste": {
    name: "Zero Waste & Nachhaltigkeit",
    description:
      "Zero-Waste-Läden und nachhaltige Shops in deiner Nähe. Fairtrade, plastikfrei und klimabewusst einkaufen.",
    searchTerm: "Zero Waste",
    emoji: "♻️",
  },
  schokolade: {
    name: "Faire Schokolade",
    description:
      "Fairtrade-Schokolade kaufen und Kakaobauern fair entlohnen. Entdecke Weltläden mit zertifizierten Schokoladen-Produkten.",
    searchTerm: "Chocolate",
    emoji: "🍫",
  },
  "wohnen-leben": {
    name: "Fairtrade Wohnen & Leben",
    description:
      "Nachhaltige Wohnaccessoires und Haushaltswaren aus fairem Handel. Entdecke Shops für ethisches Wohnen.",
    searchTerm: "Home",
    emoji: "🏠",
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(KATEGORIE_CONFIG).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = KATEGORIE_CONFIG[slug];
  if (!config) return { title: "Kategorie nicht gefunden" };
  return {
    title: `${config.name} – Fairtrade-Läden finden`,
    description: config.description,
    alternates: { canonical: `/kategorie/${slug}` },
    openGraph: {
      title: `${config.name} – FairFind`,
      description: config.description,
      locale: "de_DE",
    },
  };
}

export default async function KategoriePage({ params }: PageProps) {
  const { slug } = await params;
  const config = KATEGORIE_CONFIG[slug];
  if (!config) notFound();

  // Stores nach Kategorie filtern
  const { stores } = await getStores({ category: config.searchTerm, limit: 24 });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <span className="text-5xl" role="img" aria-label={config.name}>
          {config.emoji}
        </span>
        <h1 className="mt-4 text-3xl font-bold text-earth md:text-4xl">{config.name}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-earth/70">{config.description}</p>
      </div>

      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-earth/60" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-sage">Startseite</Link>
        <span>/</span>
        <span className="text-earth">{config.name}</span>
      </nav>

      {/* Ergebnisse */}
      {stores.length > 0 ? (
        <>
          <p className="mb-6 text-sm text-earth/70">
            {stores.length} Fairtrade-{config.name}-Läden gefunden
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </>
      ) : (
        /* Platzhalter-Content, bis die DB genug Einträge hat */
        <div className="rounded-xl border border-sage/20 bg-sage-50 p-12 text-center">
          <p className="text-lg font-medium text-earth">
            Noch keine Einträge in dieser Kategorie.
          </p>
          <p className="mt-2 text-earth/70">
            Kennst du einen Fairtrade-Laden aus dem Bereich {config.name}? Trag ihn ein!
          </p>
          <Link href="/add-store" className="mt-6 inline-block">
            <Button>Laden eintragen</Button>
          </Link>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 rounded-xl bg-sage-50 p-8 text-center">
        <h2 className="text-xl font-bold text-earth">Alle Fairtrade-Läden entdecken</h2>
        <p className="mt-2 text-earth/70">
          Nutze die interaktive Karte, um Fairtrade-Shops in deiner Nähe zu finden.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link href="/explore">
            <Button>Zur Karte</Button>
          </Link>
          <Link href="/search">
            <Button variant="outline">Suche verfeinern</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ISR: Seite alle 6 Stunden neu generieren, damit neue Stores erscheinen
export const revalidate = 21600;
