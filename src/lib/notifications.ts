// path: src/lib/notifications.ts
// In-app notification center — persisted feed rows shown via
// NotificationBell.tsx and /me/notifications. Deliberately dumb storage: the
// title/body are already-rendered strings decided by the caller (see
// lib/notify.ts), so this module never needs to know what a "new_review" or
// "invoice_issued" actually looks like.
import { prisma } from "@/lib/db";
import type { NotificationType } from "../../prisma/generated/prisma/client";

export type { NotificationType };

export interface NotificationPayload {
  type: NotificationType;
  title: string;
  body: string;
  url?: string;
}

export async function createNotification(
  userId: string,
  payload: NotificationPayload
): Promise<void> {
  await prisma.notification.create({
    data: { userId, type: payload.type, title: payload.title, body: payload.body, url: payload.url ?? null },
  });
}

// Fan-out variant for notifyModerators() — one row per recipient. createMany
// is fine here since every row is identical bar the userId; nobody needs the
// created rows back.
export async function createNotificationsForUsers(
  userIds: string[],
  payload: NotificationPayload
): Promise<void> {
  if (userIds.length === 0) return;
  await prisma.notification.createMany({
    data: userIds.map((userId) => ({
      userId,
      type: payload.type,
      title: payload.title,
      body: payload.body,
      url: payload.url ?? null,
    })),
  });
}

const PAGE_SIZE = 20;

export async function listNotifications(
  userId: string,
  cursor?: string | null
) {
  const items = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: PAGE_SIZE + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  });

  const hasMore = items.length > PAGE_SIZE;
  const notifications = hasMore ? items.slice(0, PAGE_SIZE) : items;
  const nextCursor = hasMore ? notifications[notifications.length - 1].id : null;

  return { notifications, nextCursor };
}

export async function getUnreadCount(userId: string): Promise<number> {
  return prisma.notification.count({ where: { userId, read: false } });
}

// Recent-for-dropdown + unread count in one round trip, used by
// NotificationBell's poll/open handler.
export async function getRecentNotifications(userId: string, limit = 6) {
  const [notifications, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    }),
    getUnreadCount(userId),
  ]);
  return { notifications, unreadCount };
}

export async function markNotificationRead(
  userId: string,
  notificationId: string
): Promise<{ error: "NOT_FOUND" } | { success: true }> {
  const notification = await prisma.notification.findUnique({ where: { id: notificationId } });
  if (!notification || notification.userId !== userId) return { error: "NOT_FOUND" };
  if (!notification.read) {
    await prisma.notification.update({ where: { id: notificationId }, data: { read: true } });
  }
  return { success: true };
}

export async function markAllNotificationsRead(userId: string): Promise<void> {
  await prisma.notification.updateMany({
    where: { userId, read: false },
    data: { read: true },
  });
}