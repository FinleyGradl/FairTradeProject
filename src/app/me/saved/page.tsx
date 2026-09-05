// path: src/app/me/saved/page.tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Heart } from "lucide-react";
import { auth } from "@/auth";
import { getSavedStores } from "@/lib/stores";
import { EmptyState } from "@/components/EmptyState";
import { SavedStoresGrid } from "@/components/store/SavedStoresGrid";

export const metadata: Metadata = { title: "Merkliste" };

export default async function SavedPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/me/saved");
  }

  const stores = await getSavedStores(session.user.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-2">
        <Heart className="h-6 w-6 text-sage dark:text-sage-300" />
        <h1 className="text-2xl font-bold text-earth">Merkliste</h1>
      </div>
      <p className="mt-1 text-sm text-earth/70">
        Läden, die du dir gemerkt hast.
      </p>

      {stores.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Noch keine gemerkten Läden"
            description="Tippe auf das Herz-Symbol bei einem Laden, um ihn hier zu speichern."
          />
        </div>
      ) : (
        <SavedStoresGrid initialStores={stores} />
      )}

      <p className="mt-8 text-center text-sm text-earth/50">
        <Link href="/explore" className="text-sage dark:text-sage-300 hover:underline">
          Weitere Läden entdecken →
        </Link>
      </p>
    </div>
  );
}