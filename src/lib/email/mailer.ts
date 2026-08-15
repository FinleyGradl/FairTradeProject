import nodemailer from "nodemailer";

// Works with any standard SMTP provider (GMX, etc.) — same pattern as the
// MenuPilot transactional email setup.
let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in your .env"
    );
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // GMX/most providers: 587 = STARTTLS, 465 = TLS
    auth: { user, pass },
  });

  return transporter;
}

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export async function sendMail({ to, subject, html, text }: SendMailOptions) {
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;

  await getTransporter().sendMail({
    from: `"FairFind" <${from}>`,
    to,
    subject,
    html,
    text,
  });
}