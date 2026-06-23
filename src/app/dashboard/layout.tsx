import Link from "next/link";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase/server";
import { signout } from "@/app/auth/actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  if (!supabase) redirect("/login");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="border-b border-sand bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <Logo />
            <nav className="hidden items-center gap-5 sm:flex">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-ink transition-base hover:text-sea"
              >
                Tableau de bord
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-stone transition-base hover:text-sea"
              >
                Voir le site
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-stone sm:inline">
              {user.email}
            </span>
            <form action={signout}>
              <button
                type="submit"
                className="rounded-full border border-sand px-4 py-2 text-sm font-medium text-sea-dark transition-base hover:bg-sand"
              >
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        {children}
      </main>
    </div>
  );
}
