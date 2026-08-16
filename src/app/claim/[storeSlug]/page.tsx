import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { getStoreForEdit } from "@/lib/stores";
import { Button } from "@/components/ui/button";
import { ClaimForm } from "@/components/claim/ClaimForm";

interface PageProps {
  params: Promise<{ storeSlug: string }>;
}

export default async function ClaimStorePage({ params }: PageProps) {
  const { storeSlug } = await params;
  const session = await auth();
  const store = await getStoreForEdit(storeSlug);

  if (!store) notFound();

  if (!session?.user) {
    redirect(`/login?callbackUrl=/claim/${storeSlug}`);
  }

  const alreadyOwnedByOther = Boolean(store.ownerUserId) && store.ownerUserId !== session.user.id;
  const isOwnStore = store.ownerUserId === session.user.id;

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-bold text-earth">{store.name} beanspruchen</h1>
      <p className="mt-2 text-earth/70">
        Betreibst du diesen Laden? Reiche eine Anfrage ein, um Bearbeitungsrechte zu erhalten.
      </p>

      {isOwnStore ? (
        <div className="mt-8 rounded-xl border border-sage/10 bg-white p-6 text-sm text-earth/80">
          Du bist bereits als Inhaber:in dieses Ladens eingetragen.{" "}
          <Link href={`/stores/${storeSlug}/edit`} className="text-sage hover:underline">
            Laden bearbeiten →
          </Link>
        </div>
      ) : alreadyOwnedByOther ? (
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
          Dieser Laden wurde bereits von einer Inhaberin bzw. einem Inhaber beansprucht. Wenn du
          denkst, das ist ein Fehler, kontaktiere uns bitte.
        </div>
      ) : (
        <ClaimForm storeSlug={storeSlug} />
      )}

      <div className="mt-6 text-center">
        <Link href={`/stores/${storeSlug}`}>
          <Button variant="outline">← Zurück zum Laden</Button>
        </Link>
      </div>
    </div>
  );
}