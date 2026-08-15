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