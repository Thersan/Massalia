import Image from "next/image";
import Link from "next/link";
import type { Villa } from "@/lib/types";
import { formatEuro } from "@/lib/format";

export default function VillaCard({ villa }: { villa: Villa }) {
  return (
    <Link
      href={`/villas/${villa.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand transition-base hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={villa.heroImage}
          alt={`${villa.name} — ${villa.neighborhood}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-sea-dark">
          {villa.neighborhood}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-ink">{villa.name}</h3>
        <p className="mt-1 text-sm italic text-terracotta-dark">
          {villa.tagline}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-stone">
          {villa.shortDescription}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-sand pt-4">
          <span className="text-sm text-stone">
            {villa.bedrooms} ch · {villa.guests} pers · {villa.area} m²
          </span>
          <span className="text-sm font-semibold text-sea-dark">
            {formatEuro(villa.pricePerNight)}
            <span className="font-normal text-stone"> /nuit</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
