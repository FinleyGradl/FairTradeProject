// path: src/components/legal/DatenschutzContent.tsx
export function DatenschutzDe() {
  return (
    <>
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
        <h2 className="font-semibold">7. Sponsoring &amp; Zahlungsabwicklung (Mollie)</h2>
        <p>
          Store-Inhaber:innen können ein kostenpflichtiges, monatlich kündbares Sponsoring-Abo
          abschließen, um ihren Laden in Suche, Kategorien und ggf. auf der Startseite bevorzugt
          anzeigen zu lassen (deutlich als &bdquo;Gesponsert&ldquo; gekennzeichnet). Zur
          Zahlungsabwicklung setzen wir den Zahlungsdienstleister Mollie B.V., Keizersgracht 313,
          1016 EE Amsterdam, Niederlande, ein. Dabei werden Name, E-Mail-Adresse und die zur
          Zahlungsabwicklung erforderlichen Zahlungsdaten an Mollie übermittelt; Mollie
          verarbeitet diese Daten als eigenständig Verantwortlicher gemäß der
          Datenschutzerklärung von Mollie (https://www.mollie.com/de/privacy). Rechtsgrundlage
          ist die Vertragserfüllung des Sponsoring-Abos (Art. 6 Abs. 1 lit. b DSGVO). Zahlungsdaten
          selbst (z. B. Kartennummern) verarbeiten wir nicht auf unseren eigenen Servern — diese
          verbleiben bei Mollie.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">8. Insights &amp; Reichweitenmessung</h2>
        <p>
          Für Aufrufe von Store-Detailseiten erfassen wir eigene, serverseitige Statistiken, die
          wir Store-Inhaber:innen in einer Insights-Übersicht (Aufrufe im Zeitverlauf, Herkunft,
          grober Standort, Suchanfragen) bereitstellen — vergleichbar mit einfachen Kennzahlen aus
          Google Analytics oder der Google Search Console, jedoch ohne Drittanbieter-Tracking. Wir
          erfassen dabei:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>die aufgerufene Seite und die Referrer-URL (falls vorhanden)</li>
          <li>
            einen groben, meist zweistelligen Länder-Code, wenn dieser von unserem Hoster/Proxy
            mitgeliefert wird oder — falls nicht — über einen externen Geolokalisierungsdienst
            (ipapi.co) ermittelbar ist; in letzterem Fall wird deine IP-Adresse einmalig zu diesem
            Zweck an ipapi.co übertragen
          </li>
          <li>
            einen täglich neu berechneten, gesalzenen Hash-Wert aus anonymisierter IP-Adresse und
            Browser-Kennung zur groben Schätzung eindeutiger Besucher:innen — dieser Wert lässt
            sich nicht auf deine tatsächliche IP-Adresse zurückrechnen und ändert sich täglich, ist
            also nicht zur Nachverfolgung über mehrere Tage hinweg geeignet
          </li>
        </ul>
        <p>
          Wir speichern zu keinem Zeitpunkt vollständige IP-Adressen und setzen dafür keine
          Cookies. Ergänzend erfassen wir, wie oft ein Store in Such- und Kategorie-Ergebnissen
          erscheint (&bdquo;Impressionen&ldquo;), um Store-Inhaber:innen ähnliche Kennzahlen wie in
          der Google Search Console anzeigen zu können. Rechtsgrundlage ist unser berechtigtes
          Interesse sowie das der Store-Inhaber:innen an nachvollziehbaren Reichweitenzahlen (Art.
          6 Abs. 1 lit. f DSGVO). Einzelne Seitenaufrufe werden nach 12 Monaten automatisiert
          gelöscht bzw. aggregiert.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">9. Deine Rechte</h2>
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
    </>
  );
}

export function DatenschutzEn() {
  return (
    <>
      <p className="mt-2 text-sm text-earth/60">
        Last updated: [DATE]. Please fill in or remove the bracketed placeholders below as
        applicable.
      </p>

      <section className="mt-8 space-y-2">
        <h2 className="font-semibold">1. Controller</h2>
        <p>
          [NAME / COMPANY]
          <br />
          [ADDRESS]
          <br />
          Email: [EMAIL ADDRESS]
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">2. Hosting &amp; server log files</h2>
        <p>
          This website is hosted by [ENTER HOSTING PROVIDER]. When you access the site, our
          hosting provider automatically collects so-called server log files (IP address,
          date/time of access, page accessed, browser type, referrer URL). This data is used to
          ensure trouble-free operation and IT security (Art. 6(1)(f) GDPR) and is automatically
          deleted after [PERIOD, e.g. 7 days].
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">3. User account &amp; registration</h2>
        <p>
          For certain features (writing reviews, saving stores, adding your own stores) you can
          create a user account. In doing so, we process:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Name, email address</li>
          <li>
            If you register with email &amp; password: your password, stored exclusively as a
            hash (bcrypt) — we never have access to your plaintext password
          </li>
          <li>Time of registration and email confirmation</li>
          <li>Saved stores/products and reviews you have written</li>
        </ul>
        <p>
          The legal basis is the performance of the usage agreement with you (Art. 6(1)(b) GDPR).
          To secure your account, we also set a technically necessary session cookie
          (Art. 6(1)(f) GDPR), which expires upon logout or when the session ends.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">4. Login with Google</h2>
        <p>
          Alternatively, you can register/sign in via &ldquo;Sign in with Google&rdquo;. In doing
          so, Google Ireland Limited (or, for users outside the EEA: Google LLC, USA) transmits
          your name, email address and, where applicable, your profile picture to us. Google&apos;s
          privacy policy applies: https://policies.google.com/privacy. The legal basis is your
          consent through actively choosing this login option (Art. 6(1)(a) GDPR). For transfers
          to the USA, Google states that it relies on standard contractual clauses and/or the
          EU–U.S. Data Privacy Framework.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">5. Sending emails (confirmation &amp; password reset)</h2>
        <p>
          To confirm your email address and for the &ldquo;forgot password&rdquo; process, we
          send automated emails via [ENTER SMTP PROVIDER, e.g. GMX]. In doing so, your email
          address is transmitted to the respective mail provider. The legal basis is the
          performance of the contract (Art. 6(1)(b) GDPR) or our legitimate interest in securing
          accounts (Art. 6(1)(f) GDPR).
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">6. Maps (OpenStreetMap)</h2>
        <p>
          To display store locations, we embed map material from OpenStreetMap. When the map
          loads, your IP address is transmitted to the servers of the OpenStreetMap Foundation.
          Further information: https://osmfoundation.org/wiki/Privacy_Policy. The legal basis is
          our legitimate interest in a clear presentation of store locations (Art. 6(1)(f) GDPR).
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">7. Sponsoring &amp; payment processing (Mollie)</h2>
        <p>
          Store owners can take out a paid, monthly cancellable sponsoring subscription to have
          their store shown preferentially in search, categories and, where applicable, on the
          homepage (clearly marked as &ldquo;Sponsored&rdquo;). For payment processing we use the
          payment service provider Mollie B.V., Keizersgracht 313, 1016 EE Amsterdam,
          Netherlands. In doing so, name, email address and the payment data required for
          processing are transmitted to Mollie; Mollie processes this data as an independent
          controller in accordance with Mollie&apos;s privacy policy
          (https://www.mollie.com/en/privacy). The legal basis is the performance of the
          sponsoring subscription contract (Art. 6(1)(b) GDPR). We do not process payment data
          itself (e.g. card numbers) on our own servers — this remains with Mollie.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">8. Insights &amp; reach measurement</h2>
        <p>
          For views of store detail pages, we collect our own, server-side statistics, which we
          provide to store owners in an insights overview (views over time, origin, approximate
          location, search queries) — comparable to simple metrics from Google Analytics or
          Google Search Console, but without third-party tracking. We collect:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>the page viewed and the referrer URL (if available)</li>
          <li>
            an approximate, usually two-letter country code, if provided by our hosting
            provider/proxy or — if not — determinable via an external geolocation service
            (ipapi.co); in the latter case your IP address is transmitted once to ipapi.co for
            this purpose
          </li>
          <li>
            a daily-recalculated, salted hash value derived from an anonymized IP address and
            browser identifier, used to roughly estimate unique visitors — this value cannot be
            reversed to your actual IP address and changes daily, so it is not suitable for
            tracking across multiple days
          </li>
        </ul>
        <p>
          We never store complete IP addresses and do not use cookies for this purpose.
          Additionally, we record how often a store appears in search and category results
          (&ldquo;impressions&rdquo;), so we can show store owners metrics similar to Google
          Search Console. The legal basis is our legitimate interest, and that of store owners,
          in traceable reach figures (Art. 6(1)(f) GDPR). Individual page views are automatically
          deleted or aggregated after 12 months.
        </p>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="font-semibold">9. Your rights</h2>
        <p>You have the right at any time to:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Access your stored data (Art. 15 GDPR)</li>
          <li>Rectification of inaccurate data (Art. 16 GDPR)</li>
          <li>Erasure of your data or your account (Art. 17 GDPR)</li>
          <li>Restriction of processing (Art. 18 GDPR)</li>
          <li>Data portability (Art. 20 GDPR)</li>
          <li>Object to processing (Art. 21 GDPR)</li>
          <li>Lodge a complaint with a data protection supervisory authority</li>
        </ul>
        <p>Simply reach out to: [EMAIL ADDRESS]</p>
      </section>
    </>
  );
}