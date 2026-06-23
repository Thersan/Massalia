import { formatEuro } from "@/lib/format";

export default function RevenueChart({
  data,
}: {
  data: { month: string; label: string; amount: number }[];
}) {
  if (data.length === 0) {
    return (
      <p className="rounded-xl bg-white p-8 text-center text-sm text-stone ring-1 ring-sand">
        Pas encore de revenus à afficher.
      </p>
    );
  }

  const max = Math.max(...data.map((d) => d.amount));

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sand">
      <div className="flex h-56 items-end gap-3">
        {data.map((d) => (
          <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-[0.65rem] font-medium text-stone">
              {(d.amount / 1000).toFixed(1)}k
            </span>
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-sea-dark to-sea transition-all"
                style={{ height: `${Math.max((d.amount / max) * 100, 4)}%` }}
                title={formatEuro(d.amount)}
              />
            </div>
            <span className="text-xs capitalize text-stone">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
