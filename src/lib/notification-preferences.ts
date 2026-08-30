// path: src/lib/notification-preferences.ts
// Per-user email-notification opt-in/-out for admins/moderators. A missing
// row means "everything on" — see getRecipientsForCategory below — so this
// is purely opt-OUT in effect, and ordinary users never need a row at all.
import { prisma } from "@/lib/db";
import { NOTIFICATION_CATEGORIES, type NotificationCategory } from "@/lib/notification-categories";

// Re-exported so existing server-side importers of these two from this
// module keep working — the canonical, client-safe definitions now live in
// lib/notification-categories.ts (see NotificationSettingsForm.tsx).
export { NOTIFICATION_CATEGORIES, type NotificationCategory };
export { NOTIFICATION_CATEGORY_LABELS } from "@/lib/notification-categories";

export async function getOrCreatePreferences(userId: string) {
  const existing = await prisma.notificationPreference.findUnique({ where: { userId } });
  if (existing) return existing;
  return prisma.notificationPreference.create({ data: { userId } });
}

export async function updatePreferences(
  userId: string,
  patch: Partial<Record<NotificationCategory, boolean>>
) {
  return prisma.notificationPreference.upsert({
    where: { userId },
    create: { userId, ...patch },
    update: patch,
  });
}

/**
 * Admins/moderators who want to hear about a given category. Users without
 * a NotificationPreference row are included by default (opt-out model),
 * so this can't be a simple relation filter — a missing related row would
 * be excluded by Prisma's `notificationPreference: { field: true }` shape.
 */
export async function getRecipientsForCategory(category: NotificationCategory) {
  const users = await prisma.user.findMany({
    where: { role: { in: ["admin", "moderator"] } },
    select: { id: true, email: true, name: true, notificationPreference: true },
  });
  return users
    .filter((u) => (u.notificationPreference ? u.notificationPreference[category] : true))
    .map((u) => ({ id: u.id, email: u.email, name: u.name }));
}
