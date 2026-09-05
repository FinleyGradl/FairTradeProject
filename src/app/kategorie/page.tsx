import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fairtrade Kategorien – Mode, Lebensmittel, Kaffee & mehr",
  description:
    "Alle Fairtrade-Kategorien auf einen Blick: Faire Mode, nachhaltige Lebensmittel, Fairtrade-Kaffee, Zero-Waste-Produkte und mehr. Finde Weltläden in deiner Nähe.",
  alternates: { canonical: "/kategorie" },
};

const KATEGORIEN = [
  { slug: "mode", name: "Mode & Kleidung", emoji: "👗", desc: "Faire Kleidung & Textilien" },
  { slug: "lebensmittel", name: "Lebensmittel", emoji: "🛒", desc: "Bio & faire Nahrungsmittel" },
  { slug: "kaffee-tee", name: "Kaffee & Tee", emoji: "☕", desc: "Fairtrade-zertifizierter Kaffee" },
  { slug: "geschenke", name: "Geschenke", emoji: "🎁", desc: "Nachhaltige Geschenkideen" },
  { slug: "zero-waste", name: "Zero Waste", emoji: "♻️", desc: "Plastikfrei & nachhaltig" },
  { slug: "schokolade", name: "Schokolade", emoji: "🍫", desc: "Fairtrade-Kakao & Schokolade" },
  { slug: "wohnen-leben", name: "Wohnen & Leben", emoji: "🏠", desc: "Faire Wohnaccessoires" },
];

export default function KategorieOverviewPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-earth">Alle Fairtrade-Kategorien</h1>
      <p className="mt-3 text-lg text-earth/70">
        Stöbere nach Themen und entdecke Fairtrade-Läden, die zu dir passen.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {KATEGORIEN.map((k) => (
          <Link
            key={k.slug}
            href={`/kategorie/${k.slug}`}
            className="group flex items-start gap-4 rounded-xl border border-sage/20 bg-surface p-5 transition-shadow hover:shadow-md hover:border-sage/40"
          >
            <span className="text-3xl" role="img" aria-label={k.name}>
              {k.emoji}
            </span>
            <div>
              <p className="font-semibold text-earth group-hover:text-sage group-hover:dark:text-sage-300 transition-colors">
                {k.name}
              </p>
              <p className="mt-0.5 text-sm text-earth/60">{k.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
