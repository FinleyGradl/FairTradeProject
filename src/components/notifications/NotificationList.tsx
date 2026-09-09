// path: src/components/notifications/NotificationList.tsx
"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import {
  Star,
  EyeOff,
  FileEdit,
  Store,
  Megaphone,
  AlertTriangle,
  Receipt,
  ShieldCheck,
  Bell,
  CheckCheck,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Kept local rather than importing NotificationType from the Prisma client
// — this is a client component, see NotificationBell.tsx for the same
// reasoning.
interface NotificationItem {
  id: string;
  type: string;
  title: string;
  body: string;
  url: string | null;
  read: boolean;
  createdAt: string;
}

const TYPE_ICONS: Record<string, typeof Bell> = {
  new_review: Star,
  content_hidden: EyeOff,
  suggestion_reviewed: FileEdit,
  claim_reviewed: Store,
  store_moderated: Store,
  sponsorship_canceled: Megaphone,
  sponsorship_payment_failed: AlertTriangle,
  invoice_issued: Receipt,
  moderation_alert: ShieldCheck,
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" });
}

export function NotificationList({
  initialNotifications,
  initialNextCursor,
  initialUnreadCount,
}: {
  initialNotifications: NotificationItem[];
  initialNextCursor: string | null;
  initialUnreadCount: number;
}) {
  const router = useRouter();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [cursor, setCursor] = useState(initialNextCursor);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [loadingMore, setLoadingMore] = useState(false);
  const [markingAll, setMarkingAll] = useState(false);

  async function loadMore() {
    if (!cursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await fetch(`/api/v1/notifications?cursor=${encodeURIComponent(cursor)}`);
      if (!res.ok) return;
      const data = await res.json();
      setNotifications((prev) => [...prev, ...data.notifications]);
      setCursor(data.nextCursor);
    } finally {
      setLoadingMore(false);
    }
  }

  async function handleMarkAllRead() {
    setMarkingAll(true);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
    try {
      await fetch("/api/v1/notifications/read-all", { method: "POST" });
    } finally {
      setMarkingAll(false);
    }
  }

  async function handleItemClick(item: NotificationItem) {
    if (!item.read) {
      setNotifications((prev) => prev.map((n) => (n.id === item.id ? { ...n, read: true } : n)));
      setUnreadCount((c) => Math.max(0, c - 1));
      fetch(`/api/v1/notifications/${item.id}`, { method: "PATCH" }).catch(() => {});
    }
    if (item.url) router.push(item.url);
  }

  if (notifications.length === 0) {
    return (
      <Card className="mt-6">
        <div className="flex flex-col items-center gap-2 px-4 py-16 text-center">
          <Bell className="h-8 w-8 text-earth/30" aria-hidden="true" />
          <p className="text-sm text-earth/60">Noch keine Benachrichtigungen.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="mt-6">
      {unreadCount > 0 && (
        <div className="mb-3 flex justify-end">
          <Button variant="outline" size="sm" onClick={handleMarkAllRead} disabled={markingAll}>
            <CheckCheck className="h-4 w-4" /> Alle als gelesen markieren
          </Button>
        </div>
      )}

      <Card className="divide-y divide-sage/10 overflow-hidden">
        {notifications.map((n) => {
          const Icon = TYPE_ICONS[n.type] ?? Bell;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => handleItemClick(n)}
              className={cn(
                "flex w-full items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-sage-50",
                !n.read && "bg-sage-50/60"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  n.read ? "bg-sage-100 text-sage-600" : "bg-sage text-white"
                )}
                aria-hidden="true"
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className={cn("text-sm", n.read ? "text-earth/80" : "font-semibold text-earth")}>
                    {n.title}
                  </span>
                  {!n.read && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage-600" aria-hidden="true" />
                  )}
                </span>
                <span className="mt-0.5 block text-sm text-earth/70">{n.body}</span>
                <span className="mt-1 block text-xs text-earth/50">{formatTime(n.createdAt)}</span>
              </span>
            </button>
          );
        })}
      </Card>

      {cursor && (
        <div className="mt-4 flex justify-center">
          <Button variant="outline" size="sm" onClick={loadMore} disabled={loadingMore}>
            {loadingMore && <Loader2 className="h-4 w-4 animate-spin" />}
            Mehr laden
          </Button>
        </div>
      )}
    </div>
  );
}