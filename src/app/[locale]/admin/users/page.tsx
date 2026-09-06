// path: src/app/admin/users/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/auth";
import { listUsers, canManageUsers, ASSIGNABLE_ROLES } from "@/lib/users";
import { UserManager } from "@/components/admin/UserManager";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = { title: "Nutzerverwaltung" };

export default async function AdminUsersPage() {
  const locale = await getLocale();
  const session = await auth();
  if (!session?.user) {
    return redirect({ href: "/login?callbackUrl=/admin/users", locale });
  }
  if (!canManageUsers(session.user)) {
    notFound();
  }

  const { users, pagination } = await listUsers({ page: 1, limit: 25 });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl font-bold text-earth">Nutzerverwaltung</h1>
      <p className="mt-1 text-sm text-earth/70">
        Rollen vergeben und Admins/Moderator:innen ernennen. Nur für Superuser sichtbar — der
        &quot;admin&quot;-Rolle allein reicht dafür nicht.
      </p>

      <div className="mt-8">
        <UserManager
          initialUsers={users.map((u) => ({
            ...u,
            emailVerified: u.emailVerified ? u.emailVerified.toISOString() : null,
            createdAt: u.createdAt.toISOString(),
          }))}
          initialPagination={pagination}
          roles={ASSIGNABLE_ROLES}
          currentUserId={session.user.id}
        />
      </div>
    </div>
  );
}
