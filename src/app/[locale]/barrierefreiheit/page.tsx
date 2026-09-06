import type { Metadata } from "next";
import { LegalBindingNotice } from "@/components/legal/LegalBindingNotice";

export const metadata: Metadata = { title: "Barrierefreiheit" };

export default function BarrierefreiheitPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-earth">
      <h1 className="text-2xl font-bold">Erklärung zur Barrierefreiheit</h1>
      <LegalBindingNotice />
      <p className="mt-2 text-sm text-earth/60">
        Traceable ist bemüht, seine Website im Einklang mit dem
        Barrierefreiheitsstärkungsgesetz (BFSG) und der Barrierefreie-
        Informationstechnik-Verordnung (BITV 2.0) barrierefrei zugänglich zu machen.
      </p>

      <section className="mt-8 space-y-2">
        <h2 className="font-semibold">Stand der Vereinbarkeit mit den Anforderungen</h2>
        <p>
          Diese Website wird fortlaufend daraufhin geprüft und optimiert, den Anforderungen der
          Web Content Accessibility Guidelines (WCAG) 2.1 auf Stufe AA zu entsprechen. Diese
          Website ist mit den genannten Anforderungen <strong>teilweise konform</strong>. Die
          nicht konformen Bereiche sind im folgenden Abschnitt aufgeführt.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Nicht barrierefreie Inhalte</h2>
        <p>
          Die nachstehend aufgeführten Inhalte sind aus einem oder mehreren der unten genannten
          Gründe noch nicht vollständig barrierefrei:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Ortssuche (Adressvorschläge):</strong> Die Ergebnisliste bei der Orts-/PLZ-Suche
            ist noch nicht vollständig als Kombinationsfeld (Combobox) ausgezeichnet. Nutzende von
            Screenreadern erhalten aktuell keine automatische Ansage, dass Vorschläge erschienen
            sind, und die Liste lässt sich nicht per Pfeiltasten durchsuchen. Verstoß gegen WCAG
            4.1.2 (Name, Role, Value).
          </li>
          <li>
            <strong>Dropdown-Menüs (Konto- und Design-Menü):</strong> Öffnen und Schließen per Maus,
            Escape-Taste sowie Klick außerhalb funktionieren; die Navigation innerhalb des Menüs
            per Pfeiltasten sowie ein automatisches Schließen beim Heraustabben sind noch nicht
            umgesetzt. Verstoß gegen WCAG 2.1.1 / 4.1.2 (vollständiges ARIA-Menu-Pattern).
          </li>
          <li>
            <strong>Bildergalerie (Vollbildansicht):</strong> Escape schließt die Ansicht und der
            Fokus kehrt danach korrekt zurück, es besteht jedoch noch keine vollständige
            Fokus-Klammer (Focus Trap) — mit Tab lässt sich der Fokus derzeit noch aus dem
            geöffneten Dialog heraus in die dahinterliegende Seite bewegen. Verstoß gegen WCAG
            2.4.3.
          </li>
          <li>
            <strong>Von Nutzer:innen erstellte Inhalte:</strong> Hochgeladene Fotos, Store-
            Beschreibungen und Bewertungen können fehlende oder unzureichende Alternativtexte
            bzw. unstrukturierten Text enthalten, da diese Inhalte von Dritten stammen und nicht
            redaktionell auf Barrierefreiheit geprüft werden.
          </li>
          <li>
            <strong>Farbkontraste:</strong> Kontrastanpassungen für den Dunkelmodus wurden nach
            etablierten Richtwerten vorgenommen, aber noch nicht mit einem Kontrastmess-Werkzeug
            (z. B. axe DevTools, Lighthouse) verifiziert.
          </li>
        </ul>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Erstellung dieser Erklärung</h2>
        <p>
          Diese Erklärung wurde am 05.09.2026 erstellt und zuletzt am 05.09.2026 überprüft. Die
          Bewertung erfolgte als Selbstbewertung durch den Anbieter, unterstützt durch ein
          automatisiertes Code-Audit sowie eine manuelle Prüfung zentraler Komponenten
          (Formulare, Navigation, Dialoge, Tabellen).
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Feedback und Kontaktangaben</h2>
        <p>
          Sollten dir Barrieren auf dieser Website auffallen, freuen wir uns über deine
          Rückmeldung:
        </p>
        <p>
          E-Mail: barrierefreiheit@traceable.de
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Schlichtungsverfahren</h2>
        <p>
          Wenn auch nach einer Rückmeldung an uns keine zufriedenstellende Lösung gefunden
          wurde, kannst du dich an die Schlichtungsstelle nach § 16 BGG wenden:
        </p>
        <p>
          Schlichtungsstelle nach dem Behindertengleichstellungsgesetz (BGG) bei dem
          Beauftragten der Bundesregierung für die Belange von Menschen mit Behinderungen
          <br />
          Mauerstraße 53, 10117 Berlin
          <br />
          E-Mail: info@schlichtungsstelle-bgg.de
          <br />
          Website:{" "}
          <a
            href="https://www.schlichtungsstelle-bgg.de"
            className="text-sage underline hover:no-underline dark:text-sage-300"
          >
            www.schlichtungsstelle-bgg.de
          </a>
        </p>
      </section>
    </div>
  );
}
