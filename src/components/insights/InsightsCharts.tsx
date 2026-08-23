// path: src/components/insights/InsightsCharts.tsx
"use client";

import { useEffect, useState } from "react";
import { Loader2, Eye, Users, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StoreInsights {
  rangeDays: number;
  totalViews: number;
  uniqueVisitors: number;
  viewsByDay: { date: string; views: number }[];
  topReferrers: { host: string; count: number }[];
  topCountries: { country: string; count: number }[];
  searchQueries: { query: string; impressions: number; clicks: number }[];
}

const RANGE_OPTIONS = [7, 30, 90] as const;

function ViewsBarChart({ data }: { data: { date: string; views: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.views));
  // Thin the x-axis labels so they don't overlap on longer ranges.
  const labelEvery = Math.ceil(data.length / 8);

  return (
    <div className="flex h-40 items-end gap-[2px]">
      {data.map((d, i) => (
        <div key={d.date} className="group relative flex flex-1 flex-col items-center justify-end">
          <div
            className="w-full min-w-[2px] rounded-t bg-sage transition-colors group-hover:bg-sage-600"
            style={{ height: `${Math.max(2, (d.views / max) * 100)}%` }}
            title={`${d.date}: ${d.views} Aufrufe`}
          />
          {i % labelEvery === 0 && (
            <span className="mt-1 origin-top-left rotate-45 whitespace-nowrap text-[10px] text-earth/50">
              {d.date.slice(5)}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function SimpleTable({
  rows,
  labelHeader,
  emptyLabel,
}: {
  rows: { label: string; value: number; sub?: number }[];
  labelHeader: string;
  emptyLabel: string;
}) {
  if (rows.length === 0) {
    return <p className="py-4 text-center text-sm text-earth/50">{emptyLabel}</p>;
  }
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <div className="space-y-2">
      {rows.map((row) => (
        <div key={row.label} className="text-sm">
          <div className="mb-0.5 flex items-center justify-between gap-2">
            <span className="truncate text-earth/80">{row.label}</span>
            <span className="shrink-0 tabular-nums text-earth/60">
              {row.value}
              {row.sub !== undefined ? ` · ${row.sub} Klicks` : ""}
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-sage-100">
            <div
              className="h-1.5 rounded-full bg-sage"
              style={{ width: `${(row.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
      <p className="pt-1 text-xs text-earth/40">{labelHeader}</p>
    </div>
  );
}

export function InsightsCharts({ storeSlug }: { storeSlug: string }) {
  const [range, setRange] = useState<(typeof RANGE_OPTIONS)[number]>(30);
  const [data, setData] = useState<StoreInsights | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setData(null);
    setError(null);
    fetch(`/api/v1/stores/${storeSlug}/insights?days=${range}`)
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Insights konnten nicht geladen werden.");
        if (!cancelled) setData(json);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Unbekannter Fehler.");
      });
    return () => {
      cancelled = true;
    };
  }, [storeSlug, range]);

  return (
    <div>
      <div className="mb-6 flex gap-2">
        {RANGE_OPTIONS.map((r) => (
          <Button
            key={r}
            size="sm"
            variant={range === r ? "default" : "outline"}
            onClick={() => setRange(r)}
          >
            {r} Tage
          </Button>
        ))}
      </div>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {!data && !error && (
        <div className="flex justify-center py-16 text-sage">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}

      {data && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-100">
                  <Eye className="h-5 w-5 text-sage" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-earth">{data.totalViews}</p>
                  <p className="text-xs text-earth/60">Aufrufe (letzte {data.rangeDays} Tage)</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-100">
                  <Users className="h-5 w-5 text-sage" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-earth">{data.uniqueVisitors}</p>
                  <p className="text-xs text-earth/60">Ungefähr eindeutige Besucher:innen</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Aufrufe im Zeitverlauf</CardTitle>
            </CardHeader>
            <CardContent>
              <ViewsBarChart data={data.viewsByDay} />
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Herkunft (Referrer)</CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleTable
                  rows={data.topReferrers.map((r) => ({ label: r.host, value: r.count }))}
                  labelHeader="Woher Besucher:innen kommen"
                  emptyLabel="Noch keine Daten."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Länder</CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleTable
                  rows={data.topCountries.map((c) => ({ label: c.country, value: c.count }))}
                  labelHeader="Grobe Standortschätzung per IP"
                  emptyLabel="Noch keine Daten."
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className={cn("flex items-center gap-2 text-base")}>
                <Search className="h-4 w-4 text-sage" /> Suchanfragen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleTable
                rows={data.searchQueries.map((q) => ({
                  label: q.query,
                  value: q.impressions,
                  sub: q.clicks,
                }))}
                labelHeader="Wie oft dein Laden bei welcher Suche erschienen ist, und wie viele Klicks das gebracht hat"
                emptyLabel="Noch keine Suchanfragen erfasst."
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}