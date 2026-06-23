import Link from "next/link";
import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
import Logo from "@/components/Logo";
import { signup } from "@/app/auth/actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Créer un compte propriétaire",
};

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-sea-light px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Logo />
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-sand">
          <h1 className="text-2xl font-bold">Créer un compte</h1>
          <p className="mt-1 mb-6 text-sm text-stone">
            Rejoignez l&apos;espace propriétaires Massalia.
          </p>

          {!isSupabaseConfigured && (
            <p className="mb-6 rounded-lg bg-terracotta/15 px-4 py-3 text-sm text-terracotta-dark">
              L&apos;espace propriétaires nécessite la configuration de Supabase
              (voir le README).
            </p>
          )}

          <AuthForm mode="signup" action={signup} />
        </div>
        <p className="mt-6 text-center text-sm text-stone">
          <Link href="/" className="hover:text-sea">
            ← Retour au site
          </Link>
        </p>
      </div>
    </main>
  );
}
