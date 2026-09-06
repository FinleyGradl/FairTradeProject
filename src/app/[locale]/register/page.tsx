import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = { title: "Registrieren" };

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold text-earth">Konto erstellen</h1>
      <p className="mt-2 text-earth/70">
        Speichere Lieblingsläden, schreibe Bewertungen und trage neue Stores ein.
      </p>

      <div className="mt-8">
        <RegisterForm />
      </div>
    </div>
  );
}