// path: src/app/[locale]/admin/page.tsx
import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/auth";
import { canModerate } from "@/lib/stores";
import { canManageUsers } from "@/lib/users";
import { getLocale } from "next-intl/server";

export default async function AdminIndexPage() {
  const locale = await getLocale();
  const session = await auth();
  if (!session?.user) {
    return redirect({ href: "/login?callbackUrl=/admin", locale });
  }

  if (canModerate(session.user)) {
    return redirect({ href: "/admin/moderation", locale });
  }
  if (session.user.role === "admin") {
    return redirect({ href: "/admin/sponsoring", locale });
  }
  if (canManageUsers(session.user)) {
    return redirect({ href: "/admin/users", locale });
  }

  notFound();
}