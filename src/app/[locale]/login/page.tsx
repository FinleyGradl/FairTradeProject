import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold text-earth">Willkommen zurück</h1>
      <p className="mt-2 text-earth/70">Melde dich an, um Stores zu speichern und zu bewerten.</p>

      <div className="mt-8">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}