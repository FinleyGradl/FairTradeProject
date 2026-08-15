import type { Metadata } from "next";

export const metadata: Metadata = { title: "Datenschutzerklärung" };

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-earth">
      <h1 className="text-2xl font-bold">Datenschutzerklärung</h1>
      <p className="mt-2 text-sm text-earth/60">
        Stand: [DATUM]. Bitte die eckigen Platzhalter ausfüllen bzw. entfernen, was nicht
        zutrifft.
      </p>

      <section className="mt-8 space-y-2">
        <h2 className="font-semibold">1. Verantwortlicher</h2>
        <p>
          [NAME / FIRMA]
          <br />
          [ANSCHRIFT]
          <br />
          E-Mail: [E-MAIL-ADRESSE]
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">2. Hosting &amp; Server-Logfiles</h2>
        <p>
          Diese Website wird bei [HOSTING-ANBIETER EINTRAGEN] gehostet. Beim Aufruf der Seite
          erfasst unser Hoster automatisch sogenannte Server-Logfiles (IP-Adresse, Datum/Uhrzeit
          des Zugriffs, aufgerufene Seite, Browsertyp, Referrer-URL). Diese Daten dienen der
          Sicherstellung eines störungsfreien Betriebs und der IT-Sicherheit (Art. 6 Abs. 1 lit.
          f DSGVO) und werden nach [ZEITRAUM, z. B. 7 Tage] automatisch gelöscht.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">3. Nutzerkonto &amp; Registrierung</h2>
        <p>
          Für bestimmte Funktionen (Bewertungen schreiben, Stores speichern, eigene Stores
          eintragen) kannst du ein Nutzerkonto anlegen. Dabei verarbeiten wir:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Name, E-Mail-Adresse</li>
          <li>
            Bei Registrierung mit E-Mail &amp; Passwort: dein Passwort, gespeichert ausschließlich
            als Hash (bcrypt) — wir haben zu keinem Zeitpunkt Zugriff auf dein Klartext-Passwort
          </li>
          <li>Zeitpunkt der Registrierung und der E-Mail-Bestätigung</li>
          <li>gespeicherte Stores/Produkte und von dir verfasste Bewertungen</li>
        </ul>
        <p>
          Rechtsgrundlage ist die Erfüllung des Nutzungsvertrags mit dir (Art. 6 Abs. 1 lit. b
          DSGVO). Zur Absicherung deines Kontos setzen wir außerdem ein technisch notwendiges
          Session-Cookie (Art. 6 Abs. 1 lit. f DSGVO), das nach Abmeldung bzw. Ablauf der Sitzung
          verfällt.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">4. Login mit Google</h2>
        <p>
          Alternativ kannst du dich über &bdquo;Mit Google anmelden&ldquo; registrieren/anmelden.
          Dabei übermittelt Google Ireland Limited (bzw. bei Nutzern außerhalb des EWR: Google
          LLC, USA) deinen Namen, deine E-Mail-Adresse und ggf. dein Profilbild an uns. Es gilt
          die Datenschutzerklärung von Google:
          https://policies.google.com/privacy. Rechtsgrundlage ist deine Einwilligung durch
          aktive Auswahl dieser Login-Option (Art. 6 Abs. 1 lit. a DSGVO). Bei einer Übermittlung
          in die USA stützt sich Google nach eigenen Angaben auf Standardvertragsklauseln bzw.
          das EU-U.S. Data Privacy Framework.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">5. E-Mail-Versand (Bestätigung &amp; Passwort-Reset)</h2>
        <p>
          Zur Bestätigung deiner E-Mail-Adresse und für den &bdquo;Passwort vergessen&ldquo;-Prozess
          versenden wir automatisierte E-Mails über [SMTP-ANBIETER EINTRAGEN, z. B. GMX]. Dabei
          wird deine E-Mail-Adresse an den jeweiligen Mail-Provider übermittelt. Rechtsgrundlage
          ist die Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO) bzw. unser berechtigtes Interesse
          an der Absicherung von Konten (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">6. Karten (OpenStreetMap)</h2>
        <p>
          Zur Darstellung von Store-Standorten binden wir Kartenmaterial von OpenStreetMap ein.
          Beim Laden der Karte wird deine IP-Adresse an die Server der OpenStreetMap Foundation
          übertragen. Weitere Informationen: https://osmfoundation.org/wiki/Privacy_Policy.
          Rechtsgrundlage ist unser berechtigtes Interesse an einer anschaulichen Darstellung der
          Store-Standorte (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">7. Cookies &amp; Analyse-Tools</h2>
        <p>
          [HIER EINTRAGEN, falls Analytics/Tracking-Cookies eingesetzt werden, z. B. Plausible
          oder Google Analytics — inkl. Rechtsgrundlage/Consent-Banner. Falls (noch) keine
          Analyse-Tools verwendet werden, diesen Absatz durch einen entsprechenden Hinweis
          ersetzen: &bdquo;Wir setzen aktuell keine Analyse- oder Tracking-Cookies ein.&ldquo;]
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">8. Deine Rechte</h2>
        <p>Du hast jederzeit das Recht auf:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung deiner Daten bzw. deines Kontos (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>Beschwerde bei einer Datenschutzaufsichtsbehörde</li>
        </ul>
        <p>Wende dich dafür einfach an: [E-MAIL-ADRESSE]</p>
      </section>
    </div>
  );
}