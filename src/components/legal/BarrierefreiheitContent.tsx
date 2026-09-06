// path: src/components/legal/BarrierefreiheitContent.tsx
export function BarrierefreiheitDe() {
  return (
    <>
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
        <p>E-Mail: barrierefreiheit@traceable.de</p>
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
    </>
  );
}

export function BarrierefreiheitEn() {
  return (
    <>
      <p className="mt-2 text-sm text-earth/60">
        Traceable is committed to making its website accessible in accordance with the German
        Act on Strengthening Accessibility (BFSG) and the Barrier-Free Information Technology
        Ordinance (BITV 2.0).
      </p>

      <section className="mt-8 space-y-2">
        <h2 className="font-semibold">Compliance status</h2>
        <p>
          This website is continuously reviewed and optimized to meet the Web Content
          Accessibility Guidelines (WCAG) 2.1 at level AA. This website is{" "}
          <strong>partially compliant</strong> with these requirements. The non-compliant areas
          are listed in the following section.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Non-accessible content</h2>
        <p>
          The content listed below is not yet fully accessible for one or more of the reasons
          stated:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Location search (address suggestions):</strong> The results list for the
            city/postal-code search is not yet fully marked up as a combobox. Screen reader users
            currently receive no automatic announcement that suggestions have appeared, and the
            list cannot be navigated with arrow keys. Violates WCAG 4.1.2 (Name, Role, Value).
          </li>
          <li>
            <strong>Dropdown menus (account and theme menu):</strong> Opening and closing via
            mouse, the Escape key, and clicking outside all work; navigating within the menu via
            arrow keys and automatically closing on tab-out have not yet been implemented.
            Violates WCAG 2.1.1 / 4.1.2 (full ARIA menu pattern).
          </li>
          <li>
            <strong>Photo gallery (fullscreen view):</strong> Escape closes the view and focus is
            correctly returned afterwards, but there is not yet a complete focus trap — pressing
            Tab can currently still move focus out of the open dialog into the page behind it.
            Violates WCAG 2.4.3.
          </li>
          <li>
            <strong>User-generated content:</strong> Uploaded photos, store descriptions, and
            reviews may contain missing or insufficient alt text, or unstructured text, since this
            content comes from third parties and is not editorially checked for accessibility.
          </li>
          <li>
            <strong>Color contrast:</strong> Contrast adjustments for dark mode were made
            according to established guidelines, but have not yet been verified with a contrast
            measurement tool (e.g. axe DevTools, Lighthouse).
          </li>
        </ul>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Preparation of this statement</h2>
        <p>
          This statement was prepared on 2026-09-05 and last reviewed on 2026-09-05. The
          assessment was carried out as a self-assessment by the provider, supported by an
          automated code audit and a manual review of key components (forms, navigation, dialogs,
          tables).
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Feedback and contact details</h2>
        <p>
          If you notice any accessibility barriers on this website, we welcome your feedback:
        </p>
        <p>Email: barrierefreiheit@traceable.de</p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Arbitration procedure</h2>
        <p>
          If, after providing us feedback, no satisfactory solution has been found, you can
          contact the arbitration body under § 16 BGG (German Act on Equal Opportunities for
          Persons with Disabilities):
        </p>
        <p>
          Arbitration body under the German Act on Equal Opportunities for Persons with
          Disabilities (BGG), at the Federal Government Commissioner for Matters relating to
          Persons with Disabilities
          <br />
          Mauerstraße 53, 10117 Berlin, Germany
          <br />
          Email: info@schlichtungsstelle-bgg.de
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
    </>
  );
}