import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group inline-flex flex-col leading-none">
      <span
        className={`font-serif text-2xl font-bold tracking-wide ${
          light ? "text-cream" : "text-sea-dark"
        }`}
      >
        Massalia
      </span>
      <span
        className={`text-[0.65rem] uppercase tracking-[0.3em] ${
          light ? "text-cream/70" : "text-terracotta"
        }`}
      >
        Villas · Marseille
      </span>
    </Link>
  );
}
