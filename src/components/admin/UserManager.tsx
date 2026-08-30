// path: src/components/admin/UserManager.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, ChevronLeft, ChevronRight, Search, ShieldCheck, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface UserRow {
  id: string;
  email: string;
  name: string | null;
  role: string;
  isSuperuser: boolean;
  emailVerified: string | null;
  trustScore: number;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const ROLE_LABEL: Record<string, string> = {
  user: "Nutzer:in",
  owner: "Inhaber:in",
  moderator: "Moderator:in",
  admin: "Admin",
};

export function UserManager({
  initialUsers,
  initialPagination,
  roles,
  currentUserId,
}: {
  initialUsers: UserRow[];
  initialPagination: Pagination;
  roles: string[];
  currentUserId: string;
}) {
  const [users, setUsers] = useState(initialUsers);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const fetchPage = useCallback(
    async (targetPage: number) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("page", String(targetPage));
        params.set("limit", String(initialPagination.limit));
        if (q.trim()) params.set("q", q.trim());

        const res = await fetch(`/api/admin/users?${params.toString()}`);
        if (!res.ok) return;
        const data = await res.json();
        setUsers(data.users);
        setPagination(data.pagination);
        setPage(targetPage);
      } finally {
        setLoading(false);
      }
    },
    [q, initialPagination.limit]
  );

  useEffect(() => {
    const handle = setTimeout(() => {
      fetchPage(1);
    }, 300);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  async function updateUser(id: string, patch: { role?: string; isSuperuser?: boolean }) {
    setError(null);
    setSavingId(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Änderung fehlgeschlagen.");
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data.user } : u)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/40" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Suche nach Name oder E-Mail..."
          className="pl-9"
        />
      </div>

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <Card className="mt-4">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sage/10 text-left text-xs uppercase tracking-wide text-earth/50">
                  <th className="px-4 py-3 font-medium">Nutzer:in</th>
                  <th className="px-4 py-3 font-medium">Rolle</th>
                  <th className="px-4 py-3 font-medium">Superuser</th>
                  <th className="px-4 py-3 font-medium">Registriert</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-earth/50">
                      <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                    </td>
                  </tr>
                )}
                {!loading && users.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-earth/50">
                      Keine Nutzer:innen gefunden.
                    </td>
                  </tr>
                )}
                {!loading &&
                  users.map((u) => {
                    const isSelf = u.id === currentUserId;
                    return (
                      <tr key={u.id} className="border-b border-sage/5">
                        <td className="px-4 py-3">
                          <p className="text-earth">{u.name ?? "—"}</p>
                          <p className="text-xs text-earth/50">
                            {u.email} {isSelf && "(du)"}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={u.role}
                            disabled={savingId === u.id}
                            onChange={(e) => updateUser(u.id, { role: e.target.value })}
                            className="h-9 rounded-lg border border-sage/20 bg-white px-2 text-sm text-earth disabled:opacity-50"
                          >
                            {roles.map((r) => (
                              <option key={r} value={r}>
                                {ROLE_LABEL[r] ?? r}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <Button
                            type="button"
                            variant={u.isSuperuser ? "default" : "secondary"}
                            size="sm"
                            disabled={savingId === u.id}
                            onClick={() => updateUser(u.id, { isSuperuser: !u.isSuperuser })}
                          >
                            {u.isSuperuser ? (
                              <>
                                <ShieldCheck className="h-4 w-4" /> Superuser
                              </>
                            ) : (
                              <>
                                <Shield className="h-4 w-4" /> Vergeben
                              </>
                            )}
                          </Button>
                        </td>
                        <td className="px-4 py-3 text-earth/60">
                          {new Date(u.createdAt).toLocaleDateString("de-DE")}
                          {!u.emailVerified && (
                            <Badge variant="outline" className="ml-2">
                              unverifiziert
                            </Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 flex items-center justify-between text-sm text-earth/70">
        <p>
          {pagination.total} Nutzer:in{pagination.total === 1 ? "" : "nen"} · Seite {pagination.page} von{" "}
          {pagination.pages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={loading || page <= 1}
            onClick={() => fetchPage(page - 1)}
          >
            <ChevronLeft className="h-4 w-4" /> Zurück
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={loading || page >= pagination.pages}
            onClick={() => fetchPage(page + 1)}
          >
            Weiter <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
