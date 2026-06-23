import { createClient } from "@/lib/supabase/server";
import type { Reservation } from "@/lib/types";

export type OwnerData = {
  email: string | null;
  fullName: string | null;
  slugs: string[];
  reservations: Reservation[];
};

/** Récupère les villas et réservations du propriétaire connecté (RLS appliqué). */
export async function getOwnerData(): Promise<OwnerData | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [ownership, reservations, profile] = await Promise.all([
    supabase.from("villa_ownership").select("villa_slug").eq("owner_id", user.id),
    supabase
      .from("reservations")
      .select("*")
      .eq("owner_id", user.id)
      .order("check_in", { ascending: false }),
    supabase.from("profiles").select("full_name").eq("id", user.id).single(),
  ]);

  return {
    email: user.email ?? null,
    fullName: profile.data?.full_name ?? null,
    slugs: (ownership.data ?? []).map((o) => o.villa_slug as string),
    reservations: (reservations.data ?? []) as Reservation[],
  };
}

/** Réservations actives (hors annulées). */
export function activeReservations(reservations: Reservation[]): Reservation[] {
  return reservations.filter((r) => r.status !== "annulee");
}

/** Revenu total des réservations non annulées. */
export function totalRevenue(reservations: Reservation[]): number {
  return activeReservations(reservations).reduce(
    (sum, r) => sum + Number(r.amount),
    0,
  );
}

/** Agrège le revenu par mois (clé "YYYY-MM") sur les réservations non annulées. */
export function revenueByMonth(
  reservations: Reservation[],
): { month: string; label: string; amount: number }[] {
  const months: Record<string, number> = {};
  for (const r of activeReservations(reservations)) {
    const key = r.check_in.slice(0, 7); // YYYY-MM
    months[key] = (months[key] ?? 0) + Number(r.amount);
  }
  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, amount]) => {
      const d = new Date(`${month}-01T00:00:00`);
      const label = new Intl.DateTimeFormat("fr-FR", {
        month: "short",
      }).format(d);
      return { month, label, amount };
    });
}
