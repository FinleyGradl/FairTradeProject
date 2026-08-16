import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { StoreForm, EMPTY_STORE_FORM } from "@/components/store/StoreForm";

export const metadata: Metadata = { title: "Laden hinzufügen" };

export default async function AddStorePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/add-store");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-earth">Fair-Handels-Laden hinzufügen</h1>
      <p className="mt-2 text-earth/70">
        Hilf mit, das Verzeichnis zu erweitern. Dein Laden ist sofort sichtbar — die Community
        bestätigt oder meldet Einträge, damit das Verzeichnis vertrauenswürdig bleibt.
      </p>

      <div className="mt-8">
        <StoreForm mode="create" initialValues={EMPTY_STORE_FORM} />
      </div>
    </div>
  );
}