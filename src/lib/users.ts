// path: src/lib/users.ts
// User management for the superuser-only /admin/users area. Deliberately
// separate from lib/stores.ts (which owns canModerate() etc.) since this
// is a different, narrower trust tier — see isSuperuser on User.
import { prisma } from "@/lib/db";
import type { UserRole } from "../../prisma/generated/prisma/client";

export const ASSIGNABLE_ROLES: UserRole[] = ["user", "owner", "moderator", "admin"];

/**
 * Only an explicit superuser may manage other users' roles/superuser flag.
 * Being "admin" alone is NOT enough — admins get store/promo-code/
 * moderation powers, but user management is a separate, higher tier.
 */
export function canManageUsers(user: { isSuperuser?: boolean } | null | undefined): boolean {
  return user?.isSuperuser === true;
}

export interface ListUsersParams {
  page?: number;
  limit?: number;
  q?: string; // matches name or email
  role?: string;
}

export async function listUsers(params: ListUsersParams) {
  const { page = 1, limit = 25, q, role } = params;
  const safeLimit = Math.min(Math.max(limit, 1), 100);
  const safePage = Math.max(page, 1);

  const where: Record<string, unknown> = {};
  if (role) where.role = role;
  if (q?.trim()) {
    const term = q.trim();
    where.OR = [
      { name: { contains: term, mode: "insensitive" } },
      { email: { contains: term, mode: "insensitive" } },
    ];
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (safePage - 1) * safeLimit,
      take: safeLimit,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isSuperuser: true,
        emailVerified: true,
        trustScore: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      pages: Math.max(Math.ceil(total / safeLimit), 1),
    },
  };
}

export async function countSuperusers(): Promise<number> {
  return prisma.user.count({ where: { isSuperuser: true } });
}

export async function setUserRole(userId: string, role: UserRole) {
  return prisma.user.update({ where: { id: userId }, data: { role } });
}

export async function setUserSuperuser(userId: string, isSuperuser: boolean) {
  return prisma.user.update({ where: { id: userId }, data: { isSuperuser } });
}
