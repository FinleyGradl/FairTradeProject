// path: src/app/api/admin/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { canManageUsers, countSuperusers, setUserRole, setUserSuperuser, ASSIGNABLE_ROLES } from "@/lib/users";
import { logAudit } from "@/lib/audit";

const patchSchema = z.object({
  role: z.enum(ASSIGNABLE_ROLES as [string, ...string[]]).optional(),
  isSuperuser: z.boolean().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || !canManageUsers(session.user)) {
    return NextResponse.json({ error: "Nicht berechtigt." }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success || (!parsed.data.role && parsed.data.isSuperuser === undefined)) {
    return NextResponse.json({ error: "Ungültige Eingabe." }, { status: 400 });
  }

  const target = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, role: true, isSuperuser: true },
  });
  if (!target) {
    return NextResponse.json({ error: "Nutzer:in nicht gefunden." }, { status: 404 });
  }

  // Guard against locking the platform out of user management entirely by
  // removing the last remaining superuser (including via self-demotion).
  if (parsed.data.isSuperuser === false && target.isSuperuser) {
    const remaining = await countSuperusers();
    if (remaining <= 1) {
      return NextResponse.json(
        { error: "Der letzte Superuser-Status kann nicht entfernt werden." },
        { status: 409 }
      );
    }
  }

  let updated = target;

  if (parsed.data.role && parsed.data.role !== target.role) {
    updated = await setUserRole(id, parsed.data.role as (typeof ASSIGNABLE_ROLES)[number]);
    await logAudit({
      actor: session.user,
      action: "user.role_change",
      entityType: "User",
      entityId: id,
      entityLabel: target.email,
      metadata: { from: target.role, to: parsed.data.role },
      request,
    });
  }

  if (parsed.data.isSuperuser !== undefined && parsed.data.isSuperuser !== target.isSuperuser) {
    updated = await setUserSuperuser(id, parsed.data.isSuperuser);
    await logAudit({
      actor: session.user,
      action: parsed.data.isSuperuser ? "user.superuser_grant" : "user.superuser_revoke",
      entityType: "User",
      entityId: id,
      entityLabel: target.email,
      request,
    });
  }

  return NextResponse.json({
    user: {
      id: updated.id,
      email: updated.email,
      name: updated.name,
      role: updated.role,
      isSuperuser: updated.isSuperuser,
    },
  });
}
