import type { Reservation } from "@/lib/types";
import { formatEuro, formatDate } from "@/lib/format";
import StatusBadge from "./StatusBadge";

export default function ReservationsTable({
  reservations,
  villaNames,
  showVilla = true,
}: {
  reservations: Reservation[];
  villaNames: Record<string, string>;
  showVilla?: boolean;
}) {
  if (reservations.length === 0) {
    return (
      <p className="rounded-xl bg-white p-8 text-center text-sm text-stone ring-1 ring-sand">
        Aucune réservation pour le moment.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-sand">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-sand text-xs uppercase tracking-wider text-stone">
            <th className="px-5 py-3 font-medium">Voyageur</th>
            {showVilla && <th className="px-5 py-3 font-medium">Villa</th>}
            <th className="px-5 py-3 font-medium">Séjour</th>
            <th className="px-5 py-3 font-medium">Nuits</th>
            <th className="px-5 py-3 font-medium">Montant</th>
            <th className="px-5 py-3 font-medium">Statut</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr
              key={r.id}
              className="border-b border-sand/60 last:border-0 hover:bg-cream/60"
            >
              <td className="px-5 py-4 font-medium text-ink">{r.guest_name}</td>
              {showVilla && (
                <td className="px-5 py-4 text-stone">
                  {villaNames[r.villa_slug] ?? r.villa_slug}
                </td>
              )}
              <td className="px-5 py-4 text-stone">
                {formatDate(r.check_in)} → {formatDate(r.check_out)}
              </td>
              <td className="px-5 py-4 text-stone">{r.nights}</td>
              <td className="px-5 py-4 font-semibold text-sea-dark">
                {formatEuro(Number(r.amount))}
              </td>
              <td className="px-5 py-4">
                <StatusBadge status={r.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
