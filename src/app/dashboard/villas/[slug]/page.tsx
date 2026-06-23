import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import ReservationsTable from "@/components/dashboard/ReservationsTable";
import {
  getOwnerData,
  activeReservations,
  revenueByMonth,
} from "@/lib/dashboard";
import { getVilla } from "@/data/villas";
import { formatEuro } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const villa = getVilla(slug);
  return { title: villa ? `Gestion · ${villa.name}` : "Villa" };
}

export default async function DashboardVillaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const villa = getVilla(slug);
  if (!villa) notFound();

  const data = await getOwnerData();
  // L'utilisateur ne gère pas cette villa
  if (!data || !data.slugs.includes(slug)) notFound();

  const villaReservations = data.reservations.filter(
    (r) => r.villa_slug === slug,
  );
  const active = activeReservations(villaReservations);
  const revenue = active.reduce((sum, r) => sum + Number(r.amount), 0);
  const nights = active.reduce((sum, r) => sum + r.nights, 0);
  const villaNames = { [slug]: villa.name };

  return (
    <div className="space-y-10">
      <div>
        <Link
          href="/dashboard"
          className="text-sm text-stone transition-base hover:text-sea"
        >
          ← Tableau de bord
        </Link>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">{villa.name}</h1>
            <p className="text-stone">{villa.neighborhood}</p>
          </div>
          <Link
            href={`/villas/${slug}`}
            className="rounded-full border border-sand px-4 py-2 text-sm font-medium text-sea-dark transition-base hover:bg-sand"
          >
            Voir la page publique →
          </Link>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Revenu total" value={formatEuro(revenue)} />
        <StatCard label="Réservations actives" value={String(active.length)} />
        <StatCard label="Nuits réservées" value={String(nights)} />
        <StatCard
          label="Tarif"
          value={formatEuro(villa.pricePerNight)}
          hint="par nuit"
        />
      </div>

      <section>
        <h2 className="mb-4 text-xl font-bold">Revenus par mois</h2>
        <RevenueChart data={revenueByMonth(villaReservations)} />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Toutes les réservations</h2>
        <ReservationsTable
          reservations={villaReservations}
          villaNames={villaNames}
          showVilla={false}
        />
      </section>
    </div>
  );
}
