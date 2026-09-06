// path: src/components/layout/UserMenu.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User as UserIcon, Heart, Settings, Store, ShieldCheck, Megaphone, Ticket, Users, ScrollText, Bell, Receipt } from "lucide-react";
import { buttonVariants } from "@/components/ui/button"; 
import { cn } from "@/lib/utils";
import { useMenuA11y } from "@/lib/a11y";

export function UserMenu({ pendingModerationCount = 0 }: { pendingModerationCount?: number }) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = () => setOpen(false);
  const { handleBlur } = useMenuA11y({ menuRef, isOpen: open, onClose: close });

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

  const canModerate = session?.user?.role === "admin" || session?.user?.role === "moderator";
  const pendingCount = canModerate ? pendingModerationCount : 0;

  if (status === "loading") {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-sage-100" />;
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Anmelden
          </Link>
        <Link href="/register" className={buttonVariants({ variant: "default", size: "sm" })}>
            Registrieren
          </Link>
      </div>
    );
  }

  const initial = (session.user.name ?? session.user.email ?? "?").charAt(0).toUpperCase();

  const displayName = session.user.name ?? session.user.email ?? "Konto";

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Konto-Menü für ${displayName} öffnen`}
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-9 w-9 items-center justify-center rounded-full bg-sage text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
      >
        <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full">
          {session.user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={session.user.avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <span aria-hidden="true">{initial}</span>
          )}
        </span>
        {canModerate && pendingCount > 0 && (
          <span
            className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-cream bg-red-500 dark:bg-red-600"
            aria-hidden="true"
          />
        )}
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label={`Konto-Menü für ${displayName}`}
          onBlur={handleBlur}
          className="absolute right-0 top-11 z-50 w-48 rounded-xl border border-sage/10 bg-surface p-1 shadow-lg"
        >
          <p className="truncate px-3 py-2 text-xs text-earth/60">{session.user.email}</p>
          <Link
            href={`/profile/${session.user.id}`}
            role="menuitem"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-earth hover:bg-sage-50"
          >
            <UserIcon className="h-4 w-4" /> Mein Profil
          </Link>
          <Link
            href="/me/saved"
            role="menuitem"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-earth hover:bg-sage-50"
          >
            <Heart className="h-4 w-4" /> Gespeichert
          </Link>
          <Link
            href="/me/stores"
            role="menuitem"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-earth hover:bg-sage-50"
          >
            <Store className="h-4 w-4" /> Meine Läden
          </Link>
          <Link
            href="/me/settings"
            role="menuitem"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-earth hover:bg-sage-50"
          >
            <Settings className="h-4 w-4" /> Konto
          </Link>
          {canModerate && (
            <Link
              href="/admin/moderation"
              role="menuitem"
            tabIndex={-1}
            onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-earth hover:bg-sage-50"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Moderation
              </span>
              {pendingCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 dark:bg-red-600 px-1 text-xs font-semibold text-white">
                  {pendingCount}
                </span>
              )}
            </Link>
          )}
          {canModerate && (
            <Link
              href="/admin/notification-settings"
              role="menuitem"
            tabIndex={-1}
            onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-earth hover:bg-sage-50"
            >
              <Bell className="h-4 w-4" /> Benachrichtigungen
            </Link>
          )}
          {session.user.role === "admin" && (
            <>
              <Link
                href="/admin/sponsoring"
                role="menuitem"
            tabIndex={-1}
            onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-earth hover:bg-sage-50"
              >
                <Megaphone className="h-4 w-4" /> Sponsoring-Übersicht
              </Link>
              <Link
                href="/admin/promo-codes"
                role="menuitem"
            tabIndex={-1}
            onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-earth hover:bg-sage-50"
              >
                <Ticket className="h-4 w-4" /> Promo-Codes
              </Link>
              <Link
                href="/admin/audit-log"
                role="menuitem"
            tabIndex={-1}
            onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-earth hover:bg-sage-50"
              >
                <ScrollText className="h-4 w-4" /> Audit-Log
              </Link>
            </>
          )}
          {session.user.isSuperuser && (
            <>
              <Link
                href="/admin/users"
                role="menuitem"
            tabIndex={-1}
            onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-earth hover:bg-sage-50"
              >
                <Users className="h-4 w-4" /> Nutzerverwaltung
              </Link>
              <Link
                href="/admin/settings/billing"
                role="menuitem"
            tabIndex={-1}
            onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-earth hover:bg-sage-50"
              >
                <Receipt className="h-4 w-4" /> Rechnungs-Einstellungen
              </Link>
              {session.user.role !== "admin" && (
                <Link
                  href="/admin/audit-log"
                  role="menuitem"
            tabIndex={-1}
            onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-earth hover:bg-sage-50"
                >
                  <ScrollText className="h-4 w-4" /> Audit-Log
                </Link>
              )}
            </>
          )}
          <button
            role="menuitem"
            tabIndex={-1}
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-earth hover:bg-sage-50"
          >
            <LogOut className="h-4 w-4" /> Abmelden
          </button>
        </div>
      )}
    </div>
  );
}