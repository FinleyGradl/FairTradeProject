import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Mein Konto" };

export default async function AccountSettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/me/settings");
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-bold text-earth">Mein Konto</h1>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Kontodaten</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-earth/80">
          <p>
            <span className="font-medium text-earth">Name:</span> {session.user.name ?? "—"}
          </p>
          <p>
            <span className="font-medium text-earth">E-Mail:</span> {session.user.email}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}