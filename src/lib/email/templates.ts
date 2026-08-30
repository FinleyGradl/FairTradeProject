// path: src/lib/email/templates.ts
const wrapper = (title: string, bodyHtml: string) => `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background-color:#FAF7F2;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 0;">
      <tr>
        <td align="center">
          <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e3ede6;">
            <tr>
              <td style="background:#4A7C59;padding:20px 32px;">
                <span style="color:#ffffff;font-size:18px;font-weight:700;">FairFind</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;color:#5C4033;">
                <h1 style="font-size:20px;margin:0 0 16px;">${title}</h1>
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px;color:#5C4033a0;font-size:12px;">
                © ${new Date().getFullYear()} FairFind
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

const buttonHtml = (href: string, label: string) => `
  <a href="${href}" style="display:inline-block;margin-top:8px;padding:12px 24px;background:#4A7C59;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;">${label}</a>
`;

export function verifyEmailTemplate(verifyUrl: string) {
  const html = wrapper(
    "Bestätige deine E-Mail-Adresse",
    `<p style="line-height:1.6;">Willkommen bei FairFind! Bitte bestätige deine E-Mail-Adresse, um dein Konto zu aktivieren.</p>
     ${buttonHtml(verifyUrl, "E-Mail bestätigen")}
     <p style="font-size:12px;color:#5C4033a0;margin-top:24px;">Der Link ist 24 Stunden gültig. Falls du dich nicht registriert hast, kannst du diese E-Mail ignorieren.</p>`
  );
  const text = `Willkommen bei FairFind! Bestätige deine E-Mail-Adresse: ${verifyUrl} (24h gültig)`;
  return { html, text };
}

export function changeEmailTemplate(verifyUrl: string) {
  const html = wrapper(
    "Neue E-Mail-Adresse bestätigen",
    `<p style="line-height:1.6;">Du hast angefragt, die E-Mail-Adresse deines FairFind-Kontos zu ändern. Bestätige die neue Adresse mit einem Klick:</p>
     ${buttonHtml(verifyUrl, "Neue E-Mail bestätigen")}
     <p style="font-size:12px;color:#5C4033a0;margin-top:24px;">Der Link ist 24 Stunden gültig. Falls du das nicht warst, kannst du diese E-Mail ignorieren — deine E-Mail-Adresse bleibt unverändert.</p>`
  );
  const text = `Bestätige deine neue E-Mail-Adresse: ${verifyUrl} (24h gültig)`;
  return { html, text };
}

export function resetPasswordTemplate(resetUrl: string) {
  const html = wrapper(
    "Passwort zurücksetzen",
    `<p style="line-height:1.6;">Wir haben eine Anfrage erhalten, das Passwort für dein FairFind-Konto zurückzusetzen.</p>
     ${buttonHtml(resetUrl, "Neues Passwort vergeben")}
     <p style="font-size:12px;color:#5C4033a0;margin-top:24px;">Der Link ist 60 Minuten gültig. Falls du das nicht warst, kannst du diese E-Mail ignorieren — dein Passwort bleibt unverändert.</p>`
  );
  const text = `Passwort zurücksetzen: ${resetUrl} (60 Minuten gültig)`;
  return { html, text };
}

export function transferInviteTemplate(params: {
  storeName: string;
  fromName: string;
  message: string | null;
  acceptUrl: string;
  ttlDays: number;
}) {
  const { storeName, fromName, message, acceptUrl, ttlDays } = params;
  const html = wrapper(
    "Übertragungsanfrage für einen Laden",
    `<p style="line-height:1.6;"><strong>${fromName}</strong> möchte dir die Inhaberschaft für <strong>„${storeName}“</strong> auf FairFind übertragen.</p>
     ${message ? `<p style="line-height:1.6;background:#FAF7F2;border-radius:8px;padding:12px;font-style:italic;">„${message}“</p>` : ""}
     <p style="line-height:1.6;">Nimm die Übertragung an, um ab sofort Inhaber:in dieses Eintrags zu sein — inklusive Bearbeitungsrechten, Insights und Sponsoring-Optionen.</p>
     ${buttonHtml(acceptUrl, "Anfrage ansehen")}
     <p style="font-size:12px;color:#5C4033a0;margin-top:24px;">Der Link ist ${ttlDays} Tage gültig. Falls du das nicht erwartet hast, kannst du diese E-Mail ignorieren — es ändert sich nichts, bis du aktiv zustimmst.</p>`
  );
  const text = `${fromName} möchte dir die Inhaberschaft für „${storeName}“ übertragen.${
    message ? ` Nachricht: „${message}“` : ""
  } Anfrage ansehen: ${acceptUrl} (${ttlDays} Tage gültig)`;
  return { html, text };
}

export function transferAcceptedTemplate(params: { storeName: string; toName: string; storeUrl: string }) {
  const { storeName, toName, storeUrl } = params;
  const html = wrapper(
    "Übertragung angenommen",
    `<p style="line-height:1.6;"><strong>${toName}</strong> hat deine Übertragungsanfrage für <strong>„${storeName}“</strong> angenommen. Der Eintrag gehört jetzt dieser Person — du hast keine Bearbeitungsrechte mehr.</p>
     ${buttonHtml(storeUrl, "Laden ansehen")}`
  );
  const text = `${toName} hat deine Übertragungsanfrage für „${storeName}“ angenommen. Laden ansehen: ${storeUrl}`;
  return { html, text };
}

export function transferDeclinedTemplate(params: { storeName: string; toName: string }) {
  const { storeName, toName } = params;
  const html = wrapper(
    "Übertragung abgelehnt",
    `<p style="line-height:1.6;"><strong>${toName}</strong> hat deine Übertragungsanfrage für <strong>„${storeName}“</strong> abgelehnt. Du bleibst weiterhin Inhaber:in des Eintrags.</p>`
  );
  const text = `${toName} hat deine Übertragungsanfrage für „${storeName}“ abgelehnt. Du bleibst Inhaber:in.`;
  return { html, text };
}

// --- Moderation / admin notification emails --------------------------------
// Sent to admins/moderators who opted in — see lib/notify.ts +
// lib/notification-preferences.ts. Deliberately generic (one function for
// all four "something needs your attention" cases) rather than one
// function per case, since the shape is identical.
export function moderationAlertTemplate(params: {
  headline: string;
  detailHtml: string;
  detailText: string;
  dashboardUrl: string;
}) {
  const { headline, detailHtml, detailText, dashboardUrl } = params;
  const subject = `Moderation: ${headline}`;
  const html = wrapper(
    headline,
    `<p style="line-height:1.6;">${detailHtml}</p>
     ${buttonHtml(dashboardUrl, "Im Moderations-Dashboard ansehen")}
     <p style="font-size:12px;color:#5C4033a0;margin-top:24px;">Du erhältst diese Mail, weil du als Admin/Moderator:in für diese Kategorie Benachrichtigungen aktiviert hast. Das lässt sich unter „Benachrichtigungs-Einstellungen“ anpassen.</p>`
  );
  const text = `${headline}\n\n${detailText}\n\nDashboard: ${dashboardUrl}`;
  return { subject, html, text };
}

// --- Content-moderation transparency to the affected user -------------------
// Sent to the author/owner of content a moderator hid, removed, or
// rejected, so they're never left wondering where it went.
export function contentModeratedTemplate(params: {
  headline: string;
  detailHtml: string;
  detailText: string;
}) {
  const { headline, detailHtml, detailText } = params;
  const subject = headline;
  const html = wrapper(
    headline,
    `<p style="line-height:1.6;">${detailHtml}</p>
     <p style="font-size:12px;color:#5C4033a0;margin-top:24px;">Wenn du das für einen Fehler hältst, antworte gern auf diese E-Mail oder wende dich an unseren Support.</p>`
  );
  const text = `${headline}\n\n${detailText}`;
  return { subject, html, text };
}

// --- Sponsoring / subscription lifecycle -----------------------------------
export function sponsorshipCanceledOwnerTemplate(params: {
  storeName: string;
  tierLabel: string;
  activeUntil: string | null;
}) {
  const { storeName, tierLabel, activeUntil } = params;
  const subject = `Sponsoring für „${storeName}“ gekündigt`;
  const untilHtml = activeUntil
    ? `Es bleibt bis zum <strong>${activeUntil}</strong> aktiv, danach wird es nicht mehr verlängert.`
    : "Es wird nicht mehr verlängert.";
  const html = wrapper(
    "Sponsoring gekündigt",
    `<p style="line-height:1.6;">Das <strong>${tierLabel}</strong>-Sponsoring für <strong>„${storeName}“</strong> wurde gekündigt. ${untilHtml}</p>
     <p style="line-height:1.6;">Du kannst jederzeit ein neues Sponsoring abschließen.</p>`
  );
  const text = `Das ${tierLabel}-Sponsoring für „${storeName}“ wurde gekündigt. ${
    activeUntil ? `Aktiv bis ${activeUntil}.` : "Es wird nicht mehr verlängert."
  }`;
  return { subject, html, text };
}

export function sponsorshipPaymentFailedOwnerTemplate(params: { storeName: string; tierLabel: string }) {
  const { storeName, tierLabel } = params;
  const subject = `Zahlung für „${storeName}“ fehlgeschlagen`;
  const html = wrapper(
    "Zahlung fehlgeschlagen",
    `<p style="line-height:1.6;">Die Zahlung für dein <strong>${tierLabel}</strong>-Sponsoring von <strong>„${storeName}“</strong> ist fehlgeschlagen. Mollie versucht es automatisch erneut — bitte prüfe, ob deine Zahlungsmethode noch gültig ist, damit dein Sponsoring aktiv bleibt.</p>`
  );
  const text = `Die Zahlung für dein ${tierLabel}-Sponsoring von „${storeName}“ ist fehlgeschlagen. Bitte prüfe deine Zahlungsmethode.`;
  return { subject, html, text };
}

// --- Invoice / receipt email -------------------------------------------------
// The legally relevant one — includes every field a German Rechnung needs
// (§14 UStG): issuer name+address, recipient, date, a sequential invoice
// number, description/period, net amount, VAT (or the §19-UStG note), and
// gross amount. Sent as plain HTML (no PDF) — that's legally sufficient
// for an electronic invoice as long as the format is accepted, which is
// standard practice for SaaS subscriptions.
export function invoiceEmailTemplate(params: {
  invoiceNumber: string;
  invoiceDate: string;
  storeName: string;
  tierLabel: string;
  periodStart: string;
  periodEnd: string;
  recipientName: string | null;
  amountNet: string;
  vatRatePercent: number;
  vatAmount: string;
  amountGross: string;
  isKleinunternehmer: boolean;
  issuer: {
    name: string;
    street: string;
    zipCity: string;
    country: string;
    email: string;
    taxNumber: string | null;
    vatId: string | null;
    iban: string | null;
    bankName: string | null;
    footerNote: string | null;
  };
}) {
  const {
    invoiceNumber,
    invoiceDate,
    storeName,
    tierLabel,
    periodStart,
    periodEnd,
    recipientName,
    amountNet,
    vatRatePercent,
    vatAmount,
    amountGross,
    isKleinunternehmer,
    issuer,
  } = params;

  const vatRow = isKleinunternehmer
    ? `<tr><td colspan="2" style="padding-top:8px;font-size:12px;color:#5C4033a0;">Gemäß §19 UStG wird keine Umsatzsteuer berechnet und ausgewiesen.</td></tr>`
    : `<tr><td style="padding:2px 0;">USt. (${vatRatePercent}%)</td><td style="padding:2px 0;text-align:right;">${vatAmount}</td></tr>`;

  const html = wrapper(
    `Rechnung ${invoiceNumber}`,
    `<p style="line-height:1.6;">Vielen Dank für dein Sponsoring! Anbei die Rechnung für <strong>„${storeName}“</strong> (${tierLabel}), Zeitraum ${periodStart} – ${periodEnd}.</p>
     <table width="100%" style="margin:16px 0;font-size:14px;border-top:1px solid #e3ede6;padding-top:12px;">
       <tr><td style="padding:2px 0;color:#5C4033a0;">Rechnungsnummer</td><td style="padding:2px 0;text-align:right;">${invoiceNumber}</td></tr>
       <tr><td style="padding:2px 0;color:#5C4033a0;">Rechnungsdatum</td><td style="padding:2px 0;text-align:right;">${invoiceDate}</td></tr>
       <tr><td style="padding:2px 0;color:#5C4033a0;">Empfänger</td><td style="padding:2px 0;text-align:right;">${recipientName ?? "—"}</td></tr>
     </table>
     <table width="100%" style="margin:16px 0;font-size:14px;border-top:1px solid #e3ede6;padding-top:12px;">
       <tr><td style="padding:2px 0;">Netto</td><td style="padding:2px 0;text-align:right;">${amountNet}</td></tr>
       ${vatRow}
       <tr><td style="padding:8px 0 0;font-weight:700;">Gesamt</td><td style="padding:8px 0 0;text-align:right;font-weight:700;">${amountGross}</td></tr>
     </table>
     <table width="100%" style="margin:16px 0;font-size:12px;color:#5C4033a0;border-top:1px solid #e3ede6;padding-top:12px;">
       <tr><td>${issuer.name}</td></tr>
       <tr><td>${issuer.street}</td></tr>
       <tr><td>${issuer.zipCity}, ${issuer.country}</td></tr>
       <tr><td>${issuer.email}</td></tr>
       ${issuer.taxNumber ? `<tr><td>Steuernummer: ${issuer.taxNumber}</td></tr>` : ""}
       ${issuer.vatId ? `<tr><td>USt-IdNr.: ${issuer.vatId}</td></tr>` : ""}
       ${issuer.iban ? `<tr><td>IBAN: ${issuer.iban}${issuer.bankName ? ` (${issuer.bankName})` : ""}</td></tr>` : ""}
     </table>
     ${issuer.footerNote ? `<p style="font-size:12px;color:#5C4033a0;">${issuer.footerNote}</p>` : ""}`
  );

  const text = `Rechnung ${invoiceNumber} für „${storeName}“ (${tierLabel}), Zeitraum ${periodStart} – ${periodEnd}.
Netto: ${amountNet}${isKleinunternehmer ? " (gemäß §19 UStG keine USt.)" : ` zzgl. ${vatRatePercent}% USt. (${vatAmount})`}
Gesamt: ${amountGross}

${issuer.name}
${issuer.street}
${issuer.zipCity}, ${issuer.country}
${issuer.email}
${issuer.taxNumber ? `Steuernummer: ${issuer.taxNumber}\n` : ""}${issuer.vatId ? `USt-IdNr.: ${issuer.vatId}\n` : ""}${issuer.iban ? `IBAN: ${issuer.iban}\n` : ""}`;

  return { subject: `Rechnung ${invoiceNumber} — ${storeName}`, html, text };
}