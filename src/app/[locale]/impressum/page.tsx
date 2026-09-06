import type { Metadata } from "next";
import { LegalBindingNotice } from "@/components/legal/LegalBindingNotice";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-earth">
      <h1 className="text-2xl font-bold">Impressum</h1>
      <LegalBindingNotice />
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

      {/*
        Nur ausfüllen, falls es sich um ein Unternehmen / eine GbR / GmbH handelt.
        Bei einer rein privaten, nicht-geschäftsmäßigen Website kann dieser
        Abschnitt entfallen.
      */}
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
    </div>
  );
}