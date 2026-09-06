// path: src/components/legal/ImpressumContent.tsx
export function ImpressumDe() {
  return (
    <>
      <p className="mt-2 text-sm text-earth/60">
        Angaben gemäß § 5 TMG. Bitte ersetze die eckigen Platzhalter unten durch eure echten
        Daten, bevor die Seite live geht.
      </p>

      <section className="mt-8 space-y-2">
        <h2 className="font-semibold">Anbieter</h2>
        <p>
          [NAME / FIRMA]
          <br />
          [STRASSE UND HAUSNUMMER]
          <br />
          [PLZ ORT]
          <br />
          [LAND]
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Kontakt</h2>
        <p>
          E-Mail: [E-MAIL-ADRESSE]
          <br />
          Telefon: [TELEFONNUMMER — optional]
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Vertretungsberechtigt</h2>
        <p>[NAME DES VERTRETUNGSBERECHTIGTEN, z. B. Geschäftsführer]</p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Registereintrag</h2>
        <p>
          [Falls vorhanden: Handelsregister, Registergericht, Registernummer.
          Sonst diesen Abschnitt entfernen.]
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Umsatzsteuer-ID</h2>
        <p>
          [Falls vorhanden: USt-IdNr. gemäß § 27a UStG. Sonst diesen Abschnitt entfernen.]
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          [NAME]
          <br />
          [ANSCHRIFT — wie oben, falls identisch]
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">EU-Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
          bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse findest du oben.
          Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder
          nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
        <p>
          Da diese Plattform nutzergenerierte Inhalte (Store-Einträge, Bewertungen) enthält,
          werden wir entsprechende Inhalte bei Kenntnis rechtswidriger Inhalte unverzüglich
          entfernen.
        </p>
      </section>
    </>
  );
}

export function ImpressumEn() {
  return (
    <>
      <p className="mt-2 text-sm text-earth/60">
        Information pursuant to § 5 TMG (German Telemedia Act). Please replace the bracketed
        placeholders below with your real details before this page goes live.
      </p>

      <section className="mt-8 space-y-2">
        <h2 className="font-semibold">Provider</h2>
        <p>
          [NAME / COMPANY]
          <br />
          [STREET AND NUMBER]
          <br />
          [POSTAL CODE, CITY]
          <br />
          [COUNTRY]
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Contact</h2>
        <p>
          Email: [EMAIL ADDRESS]
          <br />
          Phone: [PHONE NUMBER — optional]
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Authorized representative</h2>
        <p>[NAME OF THE AUTHORIZED REPRESENTATIVE, e.g. managing director]</p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Register entry</h2>
        <p>
          [If applicable: commercial register, registering court, registration number.
          Otherwise remove this section.]
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">VAT ID</h2>
        <p>
          [If applicable: VAT identification number pursuant to § 27a UStG (German VAT Act).
          Otherwise remove this section.]
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Responsible for content pursuant to § 18(2) MStV</h2>
        <p>
          [NAME]
          <br />
          [ADDRESS — same as above if identical]
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">EU dispute resolution</h2>
        <p>
          The European Commission provides a platform for online dispute resolution (ODR):
          https://ec.europa.eu/consumers/odr/. You can find our email address above. We are
          neither obliged nor willing to participate in dispute resolution proceedings before a
          consumer arbitration board.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">Liability for content</h2>
        <p>
          As a service provider, we are responsible for our own content on these pages in
          accordance with general law. However, under §§ 8 to 10 TMG, we as a service provider
          are not obliged to monitor transmitted or stored third-party information, or to
          investigate circumstances that indicate unlawful activity.
        </p>
        <p>
          Since this platform contains user-generated content (store listings, reviews), we will
          remove such content promptly upon becoming aware of any unlawful content.
        </p>
      </section>
    </>
  );
}