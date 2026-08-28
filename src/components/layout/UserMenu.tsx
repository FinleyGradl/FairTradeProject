"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User as UserIcon, Heart, Settings, Store, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-sage-100" />;
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="ghost" size="sm">
            Anmelden
          </Button>
        </Link>
        <Link href="/register">
          <Button variant="default" size="sm">
            Registrieren
          </Button>
        </Link>
      </div>
    );
  }

  const initial = (session.user.name ?? session.user.email ?? "?").charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-sage text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
      >
        {session.user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={session.user.avatarUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          initial
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-48 rounded-xl border border-sage/10 bg-white p-1 shadow-lg">
          <p className="truncate px-3 py-2 text-xs text-earth/60">{session.user.email}</p>
          <Link
            href={`/profile/${session.user.id}`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-earth hover:bg-sage-50"
          >
            <UserIcon className="h-4 w-4" /> Mein Profil
          </Link>
          <Link
            href="/me/saved"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-earth hover:bg-sage-50"
          >
            <Heart className="h-4 w-4" /> Gespeichert
          </Link>
          <Link
            href="/me/stores"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-earth hover:bg-sage-50"
          >
            <Store className="h-4 w-4" /> Meine Läden
          </Link>
          <Link
            href="/me/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-earth hover:bg-sage-50"
          >
            <Settings className="h-4 w-4" /> Konto
          </Link>
          {(session.user.role === "admin" || session.user.role === "moderator") && (
            <Link
              href="/admin/moderation"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-earth hover:bg-sage-50"
            >
              <ShieldCheck className="h-4 w-4" /> Moderation
            </Link>
          )}
          <button
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