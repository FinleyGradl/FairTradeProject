// path: src/app/nutzungsbedingungen/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Nutzungsbedingungen" };

export default function NutzungsbedingungenPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-earth">
      <h1 className="text-2xl font-bold">Nutzungsbedingungen</h1>
      <p className="mt-2 text-sm text-earth/60">Stand: [DATUM]</p>

      <section className="mt-8 space-y-2">
        <h2 className="font-semibold">1. Geltungsbereich</h2>
        <p>
          Diese Nutzungsbedingungen regeln die Nutzung von FairFind, einem Verzeichnis für
          Fair-Trade-Stores, betrieben von [NAME / FIRMA] (&bdquo;wir&ldquo;). Mit der Erstellung
          eines Nutzerkontos oder der Nutzung der Plattform erkennst du diese Bedingungen an.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">2. Leistungsbeschreibung</h2>
        <p>
          FairFind bietet ein durchsuchbares Verzeichnis von Fair-Trade-Stores inklusive
          Kartendarstellung, Produktinformationen und nutzergenerierten Bewertungen. Wir stellen
          die Plattform nach bestem Wissen bereit, garantieren aber keine ständige Verfügbarkeit,
          Vollständigkeit oder Richtigkeit der gelisteten Store- und Produktinformationen.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">3. Registrierung &amp; Nutzerkonto</h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>Du musst bei der Registrierung wahrheitsgemäße Angaben machen.</li>
          <li>Du bist für die Geheimhaltung deiner Zugangsdaten selbst verantwortlich.</li>
          <li>Ein Konto ist personengebunden und nicht übertragbar.</li>
          <li>
            Du kannst dein Konto jederzeit löschen; wende dich dafür an [E-MAIL-ADRESSE].
          </li>
        </ul>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">4. Nutzergenerierte Inhalte</h2>
        <p>
          Wenn du Stores einträgst, Bewertungen schreibst oder Bilder hochlädst, gilt:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Deine Inhalte müssen wahrheitsgemäß und nicht irreführend sein.</li>
          <li>
            Du versicherst, dass du die erforderlichen Rechte an hochgeladenen Inhalten (z. B.
            Fotos) besitzt.
          </li>
          <li>
            Beleidigende, diskriminierende, rechtswidrige oder werbliche Inhalte (Spam) sind
            untersagt.
          </li>
          <li>
            Wir behalten uns vor, Inhalte zu prüfen, zu bearbeiten oder bei Verstößen zu
            entfernen sowie Konten bei wiederholten Verstößen zu sperren.
          </li>
          <li>
            Mit dem Einreichen räumst du uns ein einfaches, zeitlich unbeschränktes Nutzungsrecht
            ein, deine Inhalte im Rahmen der Plattform darzustellen.
          </li>
        </ul>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">5. Store-Einträge &amp; Inhaberschaft</h2>
        <p>
          Store-Betreiber können ihre Einträge beanspruchen (&bdquo;Claim&ldquo;-Funktion). Wir
          behalten uns vor, Claim-Anfragen zu prüfen und bei begründetem Zweifel abzulehnen.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">6. Sponsoring (bezahlte Hervorhebung)</h2>
        <p>
          Bestätigte Inhaber:innen eines Store-Eintrags können ein kostenpflichtiges,
          monatliches Sponsoring-Abo abschließen. Dies bewirkt eine bevorzugte Platzierung in
          Suchergebnissen, Kategorie-Listen und ggf. auf der Startseite gemäß dem in der
          Plattform hinterlegten Ranking-Algorithmus. Es gilt dabei:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            Gesponserte Einträge werden für alle Nutzer:innen deutlich und dauerhaft als
            &bdquo;Gesponsert&ldquo; gekennzeichnet.
          </li>
          <li>
            Sponsoring verschafft eine zusätzliche Platzierungsbewertung (&bdquo;Boost&ldquo;),
            garantiert aber keine bestimmte Position und ersetzt nicht die Bewertung von
            Qualitätsfaktoren wie Rezensionen, Verifizierungsstatus oder Entfernung.
          </li>
          <li>
            Die Zahlungsabwicklung erfolgt über unseren Zahlungsdienstleister Mollie (siehe
            Datenschutzerklärung); mit Bestätigung der Zahlung wird ein monatlich
            wiederkehrendes Abonnement eingerichtet.
          </li>
          <li>
            Vereinzelt geben wir zeitlich oder mengenmäßig begrenzte Rabattcodes aus (z. B. für
            Aktionen); Details und Gültigkeit des jeweiligen Codes werden bei Ausgabe
            kommuniziert.
          </li>
          <li>
            Das Abo ist jederzeit zum Ende der laufenden Abrechnungsperiode über die
            Sponsoring-Verwaltung im eigenen Konto kündbar. Eine anteilige Erstattung bereits
            gezahlter Beträge erfolgt nicht.
          </li>
          <li>
            Wir behalten uns vor, ein Sponsoring bei Verstößen gegen diese Nutzungsbedingungen
            (z. B. irreführende Store-Inhalte) ohne Erstattung zu beenden.
          </li>
        </ul>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">7. Haftungsausschluss</h2>
        <p>
          Wir haften nicht für die Richtigkeit, Vollständigkeit oder Aktualität von Store- und
          Produktinformationen sowie nutzergenerierten Bewertungen. Die Nutzung der Plattform
          erfolgt auf eigenes Risiko. Für Schäden haften wir nur bei Vorsatz oder grober
          Fahrlässigkeit, soweit gesetzlich zulässig.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">7. Änderungen dieser Bedingungen</h2>
        <p>
          Wir können diese Nutzungsbedingungen bei Bedarf anpassen, etwa bei neuen Funktionen
          oder rechtlichen Änderungen. Über wesentliche Änderungen informieren wir registrierte
          Nutzer per E-Mail oder In-App-Hinweis.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">8. Anwendbares Recht</h2>
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts,
          soweit dem keine zwingenden verbraucherschützenden Vorschriften deines Wohnsitzlandes
          entgegenstehen.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">9. Kontakt</h2>
        <p>Fragen zu diesen Bedingungen? [E-MAIL-ADRESSE]</p>
      </section>
    </div>
  );
}