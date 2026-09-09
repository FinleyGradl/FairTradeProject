// path: src/components/layout/NotificationBell.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { Bell, CheckCheck } from "lucide-react";
import { useMenuA11y } from "@/lib/a11y";

// Kept local (not imported from the Prisma client) so this client component
// never pulls Node-only Prisma runtime into the browser bundle — same
// reasoning as the notification-categories.ts / notify-preferences split.
interface NotificationItem {
  id: string;
  type: string;
  title: string;
  body: string;
  url: string | null;
  read: boolean;
  createdAt: string;
}

// Polling interval for the badge/dropdown while the tab is open. No
// websocket/SSE infra exists in this app, so this is the cheap, good-enough
// approach — 45s keeps the badge reasonably fresh without hammering the API.
const POLL_INTERVAL_MS = 45_000;

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" });
}

export function NotificationBell({
  initialNotifications = [],
  initialUnreadCount = 0,
}: {
  initialNotifications?: NotificationItem[];
  initialUnreadCount?: number;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = () => setOpen(false);
  const { handleBlur } = useMenuA11y({ menuRef, isOpen: open, onClose: close });

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/notifications?recent=1");
      if (!res.ok) return;
      const data = await res.json();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch {
      // Best-effort — the badge just stays stale until the next poll.
    }
  }, []);

  useEffect(() => {
    if (!session?.user) return;
    refresh();
    const interval = setInterval(refresh, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [session?.user, refresh]);

  useEffect(() => {
    if (open) refresh();
  }, [open, refresh]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  async function handleItemClick(item: NotificationItem) {
    setOpen(false);
    if (!item.read) {
      setNotifications((prev) => prev.map((n) => (n.id === item.id ? { ...n, read: true } : n)));
      setUnreadCount((c) => Math.max(0, c - 1));
      fetch(`/api/v1/notifications/${item.id}`, { method: "PATCH" }).catch(() => {});
    }
    if (item.url) router.push(item.url);
  }

  async function handleMarkAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
    try {
      await fetch("/api/v1/notifications/read-all", { method: "POST" });
    } catch {
      // Best-effort — a stray unread row just lingers until next poll.
    }
  }

  if (status === "loading" || !session?.user) return null;

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={
          unreadCount > 0 ? `Benachrichtigungen (${unreadCount} ungelesen)` : "Benachrichtigungen"
        }
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-earth hover:bg-sage-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
      >
        <Bell className="h-5 w-5" aria-hidden="true" />
        {unreadCount > 0 && (
          <span
            className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white dark:bg-red-600"
            aria-hidden="true"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Benachrichtigungen"
          onBlur={handleBlur}
          className="absolute right-0 top-11 z-50 w-80 max-w-[90vw] rounded-xl border border-sage/10 bg-surface p-1 shadow-lg"
        >
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-sm font-semibold text-earth">Benachrichtigungen</span>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-sage-700 hover:bg-sage-50 dark:text-sage-300"
              >
                <CheckCheck className="h-3.5 w-3.5" /> Alle gelesen
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-earth/60">
              Noch keine Benachrichtigungen.
            </p>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => handleItemClick(n)}
                  className="flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-left hover:bg-sage-50"
                >
                  <span className="flex items-center gap-2">
                    {!n.read && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage-600" aria-hidden="true" />
                    )}
                    <span className={cnTitle(n.read)}>{n.title}</span>
                  </span>
                  <span className="line-clamp-2 pl-3.5 text-xs text-earth/70">{n.body}</span>
                  <span className="pl-3.5 text-[11px] text-earth/50">{formatTime(n.createdAt)}</span>
                </button>
              ))}
            </div>
          )}

          <Link
            href="/me/notifications"
            role="menuitem"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-sage-700 hover:bg-sage-50 dark:text-sage-300"
          >
            Alle anzeigen
          </Link>
        </div>
      )}
    </div>
  );
}

function cnTitle(read: boolean) {
  return read ? "text-sm text-earth/80" : "text-sm font-semibold text-earth";
}