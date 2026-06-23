"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import type { AuthState } from "@/app/auth/actions";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-sea px-6 py-3 font-semibold text-cream transition-base hover:bg-sea-dark disabled:opacity-60"
    >
      {pending ? "Un instant…" : label}
    </button>
  );
}

export default function AuthForm({
  mode,
  action,
}: {
  mode: "login" | "signup";
  action: (prev: AuthState, formData: FormData) => Promise<AuthState>;
}) {
  const [state, formAction] = useActionState(action, {});
  const isSignup = mode === "signup";

  return (
    <form action={formAction} className="space-y-4">
      {isSignup && (
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Nom complet
          </label>
          <input
            name="full_name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-lg border border-sand bg-cream px-4 py-2.5 outline-none focus:border-sea focus:ring-1 focus:ring-sea"
            placeholder="Jean Dupont"
          />
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Email</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-sand bg-cream px-4 py-2.5 outline-none focus:border-sea focus:ring-1 focus:ring-sea"
          placeholder="vous@exemple.fr"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">
          Mot de passe
        </label>
        <input
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete={isSignup ? "new-password" : "current-password"}
          className="w-full rounded-lg border border-sand bg-cream px-4 py-2.5 outline-none focus:border-sea focus:ring-1 focus:ring-sea"
          placeholder="••••••••"
        />
      </div>

      {state.error && (
        <p className="rounded-lg bg-terracotta/15 px-4 py-2.5 text-sm text-terracotta-dark">
          {state.error}
        </p>
      )}
      {state.message && (
        <p className="rounded-lg bg-sea-light px-4 py-2.5 text-sm text-sea-dark">
          {state.message}
        </p>
      )}

      <SubmitButton label={isSignup ? "Créer mon compte" : "Se connecter"} />

      <p className="pt-2 text-center text-sm text-stone">
        {isSignup ? (
          <>
            Déjà un compte ?{" "}
            <Link href="/login" className="font-semibold text-sea hover:underline">
              Se connecter
            </Link>
          </>
        ) : (
          <>
            Pas encore de compte ?{" "}
            <Link href="/signup" className="font-semibold text-sea hover:underline">
              Créer un compte
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
