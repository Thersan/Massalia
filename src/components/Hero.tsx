import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1512699355324-f07e3106dae5?auto=format&fit=crop&w=2000&q=80"
        alt="Le littoral de Marseille et la Méditerranée"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink/70" />

      <div className="relative mx-auto max-w-3xl px-6 text-center text-cream">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-cream/80">
          Marseille · Méditerranée
        </p>
        <h1 className="text-balance text-4xl font-bold leading-tight sm:text-6xl">
          Des villas d&apos;exception, face à la mer
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-cream/90">
          Massalia gère une collection privée de six villas d&apos;exception à
          Marseille. Vue calanques, piscines à débordement et art de vivre du Sud.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#villas"
            className="rounded-full bg-terracotta px-8 py-3 font-semibold text-cream transition-base hover:bg-terracotta-dark"
          >
            Découvrir les villas
          </Link>
          <Link
            href="#services"
            className="rounded-full border border-cream/60 px-8 py-3 font-semibold text-cream transition-base hover:bg-cream hover:text-ink"
          >
            Confier ma villa
          </Link>
        </div>
      </div>
    </section>
  );
}
