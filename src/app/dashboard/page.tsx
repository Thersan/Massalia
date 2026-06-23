import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import ReservationsTable from "@/components/dashboard/ReservationsTable";
import {
  getOwnerData,
  totalRevenue,
  activeReservations,
  revenueByMonth,
} from "@/lib/dashboard";
import { getVilla } from "@/data/villas";
import { formatEuro } from "@/lib/format";

export const metadata: Metadata = { title: "Tableau de bord" };

export default async function DashboardPage() {
  const data = await getOwnerData();

  if (!data) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-sand">
        <p className="text-stone">Impossible de charger vos données.</p>
      </div>
    );
  }

  const { fullName, slugs, reservations } = data;
  const active = activeReservations(reservations);
  const villaNames = Object.fromEntries(
    slugs.map((s) => [s, getVilla(s)?.name ?? s]),
  );

  const thisMonth = new Date().toISOString().slice(0, 7);
  const revenueThisMonth = active
    .filter((r) => r.check_in.slice(0, 7) === thisMonth)
    .reduce((sum, r) => sum + Number(r.amount), 0);
  const nightsBooked = active.reduce((sum, r) => sum + r.nights, 0);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">
          Bonjour{fullName ? `, ${fullName}` : ""} 👋
        </h1>
        <p className="mt-1 text-stone">
          Voici la performance de {slugs.length === 0 ? "vos" : slugs.length} villa
          {slugs.length > 1 ? "s" : ""}.
        </p>
      </div>

      {slugs.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-sand">
          <p className="text-stone">
            Aucune villa n&apos;est encore rattachée à votre compte. Contactez
            l&apos;équipe Massalia ou exécutez le script de démonstration
            (<code>supabase/seed.sql</code>).
          </p>
        </div>
      ) : (
        <>
          {/* KPIs */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Revenu total"
              value={formatEuro(totalRevenue(reservations))}
              hint="Réservations non annulées"
            />
            <StatCard
              label="Revenu ce mois"
              value={formatEuro(revenueThisMonth)}
              hint={new Intl.DateTimeFormat("fr-FR", {
                month: "long",
                year: "numeric",
              }).format(new Date())}
            />
            <StatCard
              label="Réservations actives"
              value={String(active.length)}
              hint={`${reservations.length} au total`}
            />
            <StatCard
              label="Nuits réservées"
              value={String(nightsBooked)}
              hint="Sur l'ensemble des séjours"
            />
          </div>

          {/* Revenus par mois */}
          <section>
            <h2 className="mb-4 text-xl font-bold">Revenus par mois</h2>
            <RevenueChart data={revenueByMonth(reservations)} />
          </section>

          {/* Villas */}
          <section>
            <h2 className="mb-4 text-xl font-bold">Mes villas</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {slugs.map((slug) => {
                const villa = getVilla(slug);
                if (!villa) return null;
                const villaRes = active.filter((r) => r.villa_slug === slug);
                const villaRevenue = villaRes.reduce(
                  (sum, r) => sum + Number(r.amount),
                  0,
                );
                return (
                  <Link
                    key={slug}
                    href={`/dashboard/villas/${slug}`}
                    className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand transition-base hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={villa.heroImage}
                        alt={villa.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold">{villa.name}</h3>
                      <p className="text-xs text-stone">{villa.neighborhood}</p>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="text-stone">
                          {villaRes.length} réserv.
                        </span>
                        <span className="font-semibold text-sea-dark">
                          {formatEuro(villaRevenue)}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Réservations récentes */}
          <section>
            <h2 className="mb-4 text-xl font-bold">Réservations récentes</h2>
            <ReservationsTable
              reservations={reservations.slice(0, 8)}
              villaNames={villaNames}
            />
          </section>
        </>
      )}
    </div>
  );
}
