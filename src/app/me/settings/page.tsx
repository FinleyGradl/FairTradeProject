import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AvatarUploader } from "@/components/profile/AvatarUploader";
import { ProfileNameForm } from "@/components/profile/ProfileNameForm";
import { ChangeEmailForm } from "@/components/profile/ChangeEmailForm";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";

export const metadata: Metadata = { title: "Mein Konto" };

export default async function AccountSettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/me/settings");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      pendingEmail: true,
      avatarUrl: true,
      password: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const fallbackInitial = (user.name ?? user.email).charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-earth">Mein Konto</h1>
        <Link href={`/profile/${user.id}`}>
          <Button variant="outline" size="sm">
            Öffentliches Profil ansehen
          </Button>
        </Link>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Profilbild &amp; Name</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <AvatarUploader currentAvatarUrl={user.avatarUrl} fallbackInitial={fallbackInitial} />
          <ProfileNameForm initialName={user.name ?? ""} />
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>E-Mail-Adresse</CardTitle>
        </CardHeader>
        <CardContent>
          {user.pendingEmail && (
            <p className="mb-3 rounded-lg bg-sage-50 p-3 text-sm text-earth">
              Bestätigung ausstehend für <strong>{user.pendingEmail}</strong> — prüfe dein
              Postfach.
            </p>
          )}
          <ChangeEmailForm hasPassword={Boolean(user.password)} currentEmail={user.email} />
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Passwort</CardTitle>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm hasPassword={Boolean(user.password)} />
        </CardContent>
      </Card>
    </div>
  );
}