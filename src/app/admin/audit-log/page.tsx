// path: src/app/admin/audit-log/page.tsx
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { searchAuditLogs, AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from "@/lib/audit";
import { AuditLogViewer } from "@/components/admin/AuditLogViewer";

export const metadata: Metadata = { title: "Audit-Log" };

function canViewAuditLog(user: { role?: string; isSuperuser?: boolean } | null | undefined) {
  return user?.role === "admin" || user?.isSuperuser === true;
}

export default async function AuditLogPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/audit-log");
  }
  if (!canViewAuditLog(session.user)) {
    notFound();
  }

  const { entries, pagination } = await searchAuditLogs({ page: 1, limit: 25 });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-bold text-earth">Audit-Log</h1>
      <p className="mt-1 text-sm text-earth/70">
        Wer hat was bearbeitet, gelöscht oder moderiert — inklusive Sponsoring-Abschlüssen und
        -Kündigungen. Durchsuchbar und paginiert, für Nachvollziehbarkeit und Compliance.
      </p>

      <div className="mt-8">
        <AuditLogViewer
          initialEntries={entries.map((e) => ({
            id: e.id,
            actorEmail: e.actorEmail,
            actorName: e.actorName,
            actorRole: e.actorRole,
            action: e.action,
            entityType: e.entityType,
            entityId: e.entityId,
            entityLabel: e.entityLabel,
            metadata: e.metadata,
            ip: e.ip,
            createdAt: e.createdAt.toISOString(),
          }))}
          initialPagination={pagination}
          actions={[...AUDIT_ACTIONS]}
          entityTypes={[...AUDIT_ENTITY_TYPES]}
        />
      </div>
    </div>
  );
}
