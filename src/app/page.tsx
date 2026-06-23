import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import VillaCard from "@/components/VillaCard";
import { villas } from "@/data/villas";

const services = [
  {
    title: "Conciergerie & accueil",
    text: "Accueil personnalisé des voyageurs, remise des clés, assistance 24/7 et recommandations sur mesure pour un séjour parfait.",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    title: "Entretien & ménage",
    text: "Ménage hôtelier, blanchisserie, entretien de la piscine et du jardin, maintenance technique : votre villa toujours impeccable.",
    icon: "M5 13l4 4L19 7",
  },
  {
    title: "Commercialisation",
    text: "Photographie professionnelle, annonces optimisées, gestion des plateformes et tarification dynamique pour maximiser vos revenus.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    title: "Gestion & reporting",
    text: "Suivi des réservations et des revenus en temps réel depuis votre espace propriétaire privé, en toute transparence.",
    icon: "M9 17v-6h2v6H9zm4 0V7h2v10h-2zM5 17v-2h2v2H5zM3 21h18",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />

        {/* À propos */}
        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-terracotta">
            La maison Massalia
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            L&apos;art de recevoir, à la marseillaise
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-stone">
            Des Goudes au Roucas Blanc, nous gérons une sélection confidentielle
            de villas d&apos;exception. Chacune a son caractère, son panorama, son
            histoire — mais toutes partagent la même exigence d&apos;élégance et de
            confort. Massalia accompagne propriétaires et voyageurs avec le sens
            du détail et l&apos;hospitalité du Sud.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { n: "6", l: "Villas d'exception" },
              { n: "100%", l: "Bord de mer" },
              { n: "24/7", l: "Conciergerie" },
              { n: "13", l: "Marseille" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif text-4xl font-bold text-sea">{s.n}</p>
                <p className="mt-1 text-sm text-stone">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Villas */}
        <section id="villas" className="bg-sand/60 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-terracotta">
                Notre collection
              </p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Les six villas Massalia
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {villas.map((villa) => (
                <VillaCard key={villa.slug} villa={villa} />
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-terracotta">
              Pour les propriétaires
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Confiez-nous votre villa
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-stone">
              Une gestion clé en main, transparente et rentable. Vous gardez la
              main, nous nous occupons de tout le reste.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sea-light text-sea">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d={s.icon} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-sea-dark">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center text-cream">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Parlons de votre projet
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream/80">
              Que vous cherchiez à louer une villa d&apos;exception ou à confier la
              vôtre à Massalia, notre équipe vous répond avec plaisir.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:contact@massalia-villas.fr"
                className="rounded-full bg-terracotta px-8 py-3 font-semibold text-cream transition-base hover:bg-terracotta-dark"
              >
                contact@massalia-villas.fr
              </a>
              <Link
                href="/login"
                className="rounded-full border border-cream/50 px-8 py-3 font-semibold text-cream transition-base hover:bg-cream hover:text-ink"
              >
                Accéder à mon espace
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
