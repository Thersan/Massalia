import type { ReservationStatus } from "@/lib/types";

const styles: Record<ReservationStatus, { label: string; cls: string }> = {
  confirmee: {
    label: "Confirmée",
    cls: "bg-sea-light text-sea-dark",
  },
  en_cours: {
    label: "En cours",
    cls: "bg-terracotta/15 text-terracotta-dark",
  },
  annulee: {
    label: "Annulée",
    cls: "bg-stone/15 text-stone line-through",
  },
};

export default function StatusBadge({ status }: { status: ReservationStatus }) {
  const s = styles[status];
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${s.cls}`}
    >
      {s.label}
    </span>
  );
}
