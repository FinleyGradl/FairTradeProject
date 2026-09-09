// path: src/lib/notify.ts
// Thin orchestration layer over lib/email/mailer.ts + lib/notifications.ts:
// fans a notification out to every admin/moderator who opted into a
// category, or to a single user (owner confirmations, invoices) — as email,
// an in-app row in the notification center, or both. Every send is
// best-effort — a failed/missing SMTP config, or a failed DB write, must
// never break the mutation that triggered the notification, so all errors
// are caught and logged, never thrown.
import { sendMail } from "@/lib/email/mailer";
import { getRecipientsForCategory, type NotificationCategory } from "@/lib/notification-preferences";
import {
  createNotification,
  createNotificationsForUsers,
  type NotificationPayload,
} from "@/lib/notifications";

interface MailTemplate {
  subject: string;
  html: string;
  text: string;
}

interface NotifyUserOptions {
  // Recorded in the recipient's notification center. Omit to send email
  // only.
  inApp?: NotificationPayload;
  // Set to false to record the in-app notification without sending an
  // email — used where a user-level preference (not an admin/moderator
  // category) gates the email, e.g. notifyNewReviewOnStore. Defaults to
  // true.
  sendEmail?: boolean;
}

export async function notifyUser(
  recipient: { id: string; email: string },
  template: MailTemplate,
  options?: NotifyUserOptions
): Promise<void> {
  const sendEmail = options?.sendEmail ?? true;
  if (sendEmail) {
    try {
      await sendMail({ to: recipient.email, ...template });
    } catch (error) {
      console.error(`notifyUser(${recipient.email}) failed:`, error);
    }
  }
  if (options?.inApp) {
    try {
      await createNotification(recipient.id, options.inApp);
    } catch (error) {
      console.error(`notifyUser in-app (${recipient.id}) failed:`, error);
    }
  }
}

export async function notifyModerators(
  category: NotificationCategory,
  template: MailTemplate,
  inApp?: NotificationPayload
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
    if (inApp && recipients.length) {
      // Same opted-in set as email — someone who muted a category's emails
      // isn't shown an in-app row for it either, keeping the two in sync.
      await createNotificationsForUsers(
        recipients.map((r) => r.id),
        inApp
      ).catch((err) => console.error(`notifyModerators(${category}) in-app failed:`, err));
    }
  } catch (error) {
    console.error(`notifyModerators(${category}) failed:`, error);
  }
}