// path: src/lib/notify.ts
// Thin orchestration layer over lib/email/mailer.ts: fans a notification
// out to every admin/moderator who opted into a category, or to a single
// user (owner confirmations, invoices). Every send is best-effort — a
// failed/missing SMTP config must never break the mutation that triggered
// the notification, so all errors are caught and logged, never thrown.
import { sendMail } from "@/lib/email/mailer";
import { getRecipientsForCategory, type NotificationCategory } from "@/lib/notification-preferences";

interface MailTemplate {
  subject: string;
  html: string;
  text: string;
}

export async function notifyModerators(
  category: NotificationCategory,
  template: MailTemplate
): Promise<void> {
  try {
    const recipients = await getRecipientsForCategory(category);
    await Promise.all(
      recipients.map((r) =>
        sendMail({ to: r.email, ...template }).catch((err) =>
          console.error(`notifyModerators(${category}) failed for ${r.email}:`, err)
        )
      )
    );
  } catch (error) {
    console.error(`notifyModerators(${category}) failed:`, error);
  }
}

export async function notifyUser(email: string, template: MailTemplate): Promise<void> {
  try {
    await sendMail({ to: email, ...template });
  } catch (error) {
    console.error(`notifyUser(${email}) failed:`, error);
  }
}
