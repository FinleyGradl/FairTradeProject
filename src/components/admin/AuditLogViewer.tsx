// path: src/components/admin/AuditLogViewer.tsx
"use client";

import { useCallback, useEffect, useState, Fragment } from "react";
import { Loader2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface AuditLogEntryRow {
  id: string;
  actorEmail: string | null;
  actorName: string | null;
  actorRole: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  entityLabel: string | null;
  metadata: string | null;
  ip: string | null;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// Rough grouping so the action select isn't one flat alphabetical wall —
// mirrors the dot-namespace in lib/audit.ts's AUDIT_ACTIONS.
function actionLabel(action: string): string {
  const labels: Record<string, string> = {
    "store.update": "Laden bearbeitet",
    "store.delete": "Laden gelöscht",
    "store.moderate": "Laden moderiert",
    "claim.review": "Inhaberschafts-Anfrage bearbeitet",
    "suggestion.review": "Änderungsvorschlag bearbeitet",
    "review.delete": "Bewertung gelöscht (eigene)",
    "review.hide": "Bewertung ausgeblendet",
    "review.report_dismiss": "Bewertungsmeldung verworfen",
    "photo.delete": "Foto gelöscht",
    "photo.report_dismiss": "Fotomeldung verworfen",
    "promo_code.create": "Promo-Code erstellt",
    "promo_code.update": "Promo-Code geändert",
    "promo_code.delete": "Promo-Code gelöscht",
    "user.role_change": "Rolle geändert",
    "user.superuser_grant": "Superuser vergeben",
    "user.superuser_revoke": "Superuser entzogen",
    "subscription.start": "Sponsoring abgeschlossen",
    "subscription.cancel": "Sponsoring gekündigt",
    "subscription.activate": "Sponsoring aktiviert",
    "subscription.renew": "Sponsoring verlängert",
    "subscription.payment_failed": "Zahlung fehlgeschlagen",
    "subscription.mandate_failed": "Mandat fehlgeschlagen",
  };
  return labels[action] ?? action;
}

const DESTRUCTIVE_ACTIONS = new Set([
  "store.delete",
  "review.delete",
  "review.hide",
  "photo.delete",
  "promo_code.delete",
  "user.superuser_revoke",
  "subscription.cancel",
  "subscription.mandate_failed",
  "subscription.payment_failed",
]);

export function AuditLogViewer({
  initialEntries,
  initialPagination,
  actions,
  entityTypes,
}: {
  initialEntries: AuditLogEntryRow[];
  initialPagination: Pagination;
  actions: string[];
  entityTypes: string[];
}) {
  const [entries, setEntries] = useState(initialEntries);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [action, setAction] = useState("");
  const [entityType, setEntityType] = useState("");
  const [page, setPage] = useState(1);

  const fetchPage = useCallback(
    async (targetPage: number) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("page", String(targetPage));
        params.set("limit", String(initialPagination.limit));
        if (q.trim()) params.set("q", q.trim());
        if (action) params.set("action", action);
        if (entityType) params.set("entityType", entityType);

        const res = await fetch(`/api/admin/audit-log?${params.toString()}`);
        if (!res.ok) return;
        const data = await res.json();
        setEntries(data.entries);
        setPagination(data.pagination);
        setPage(targetPage);
      } finally {
        setLoading(false);
      }
    },
    [q, action, entityType, initialPagination.limit]
  );

  // Re-search whenever a filter changes (debounced for free-text search).
  useEffect(() => {
    const handle = setTimeout(() => {
      fetchPage(1);
    }, 300);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, action, entityType]);

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString("de-DE", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  function parseMetadata(raw: string | null): Record<string, unknown> | null {
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/40" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Suche nach Nutzer:in, E-Mail oder Objekt..."
            className="pl-9"
          />
        </div>
        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="h-10 rounded-lg border border-sage/20 bg-white px-3 text-sm text-earth"
        >
          <option value="">Alle Aktionen</option>
          {actions.map((a) => (
            <option key={a} value={a}>
              {actionLabel(a)}
            </option>
          ))}
        </select>
        <select
          value={entityType}
          onChange={(e) => setEntityType(e.target.value)}
          className="h-10 rounded-lg border border-sage/20 bg-white px-3 text-sm text-earth"
        >
          <option value="">Alle Objekttypen</option>
          {entityTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <Card className="mt-4">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sage/10 text-left text-xs uppercase tracking-wide text-earth/50">
                  <th className="px-4 py-3 font-medium">Zeitpunkt</th>
                  <th className="px-4 py-3 font-medium">Wer</th>
                  <th className="px-4 py-3 font-medium">Aktion</th>
                  <th className="px-4 py-3 font-medium">Objekt</th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-earth/50">
                      <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                    </td>
                  </tr>
                )}
                {!loading && entries.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-earth/50">
                      Keine Einträge gefunden.
                    </td>
                  </tr>
                )}
                {!loading &&
                  entries.map((entry) => {
                    const meta = parseMetadata(entry.metadata);
                    const isExpanded = expandedId === entry.id;
                    return (
                      <Fragment key={entry.id}>
                        <tr
                          className="cursor-pointer border-b border-sage/5 hover:bg-sage-50/50"
                          onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                        >
                          <td className="whitespace-nowrap px-4 py-3 text-earth/70">
                            {formatDate(entry.createdAt)}
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-earth">{entry.actorName ?? entry.actorEmail ?? "—"}</span>
                            {entry.actorRole && (
                              <span className="ml-1.5 text-xs text-earth/50">({entry.actorRole})</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={DESTRUCTIVE_ACTIONS.has(entry.action) ? "outline" : "secondary"}>
                              {actionLabel(entry.action)}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-earth/70">
                            <span className="text-xs uppercase tracking-wide text-earth/40">
                              {entry.entityType}
                            </span>{" "}
                            {entry.entityLabel ?? entry.entityId ?? "—"}
                          </td>
                          <td className="px-4 py-3 text-right text-xs text-sage-600">
                            {meta ? (isExpanded ? "Weniger" : "Details") : ""}
                          </td>
                        </tr>
                        {isExpanded && meta && (
                          <tr className="border-b border-sage/5 bg-sage-50/30">
                            <td colSpan={5} className="px-4 py-3">
                              <pre className="overflow-x-auto whitespace-pre-wrap text-xs text-earth/70">
                                {JSON.stringify(meta, null, 2)}
                              </pre>
                              {entry.ip && (
                                <p className="mt-2 text-xs text-earth/40">IP: {entry.ip}</p>
                              )}
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 flex items-center justify-between text-sm text-earth/70">
        <p>
          {pagination.total} Eintrag{pagination.total === 1 ? "" : "e"} · Seite {pagination.page} von{" "}
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
