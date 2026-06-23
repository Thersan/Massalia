import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { getVilla, villaSlugs, villas } from "@/data/villas";
import { formatEuro } from "@/lib/format";

export function generateStaticParams() {
  return villaSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const villa = getVilla(slug);
  if (!villa) return { title: "Villa introuvable" };
  return {
    title: `${villa.name} — ${villa.neighborhood}`,
    description: villa.shortDescription,
    openGraph: {
      title: `${villa.name} · Massalia`,
      description: villa.shortDescription,
      images: [villa.heroImage],
    },
  };
}

const facts = (villa: NonNullable<ReturnType<typeof getVilla>>) => [
  { label: "Chambres", value: villa.bedrooms },
  { label: "Salles de bain", value: villa.bathrooms },
  { label: "Voyageurs", value: villa.guests },
  { label: "Surface", value: `${villa.area} m²` },
];

export default async function VillaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const villa = getVilla(slug);
  if (!villa) notFound();

  const others = villas.filter((v) => v.slug !== villa.slug).slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* En-tête */}
        <section className="mx-auto max-w-6xl px-6 pt-12">
          <Link
            href="/#villas"
            className="text-sm text-stone transition-base hover:text-sea"
          >
            ← Toutes les villas
          </Link>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-terracotta">
                {villa.neighborhood}
              </p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
                {villa.name}
              </h1>
              <p className="mt-2 text-lg italic text-stone">{villa.tagline}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-sea-dark">
                {formatEuro(villa.pricePerNight)}
                <span className="text-base font-normal text-stone"> /nuit</span>
              </p>
            </div>
          </div>
        </section>

        {/* Galerie */}
        <section className="mx-auto max-w-6xl px-6 py-8">
          <Gallery images={villa.images} name={villa.name} />
        </section>

        {/* Contenu */}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4 border-y border-sand py-6 sm:grid-cols-4">
              {facts(villa).map((f) => (
                <div key={f.label}>
                  <p className="text-2xl font-bold text-sea">{f.value}</p>
                  <p className="text-sm text-stone">{f.label}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-2xl font-bold">La villa</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-stone">
              {villa.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <h2 className="mt-10 text-2xl font-bold">Équipements & services</h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {villa.amenities.map((a) => (
                <li key={a} className="flex items-center gap-3 text-stone">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0 text-terracotta"
                  >
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Encart réservation */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand">
              <p className="text-3xl font-bold text-sea-dark">
                {formatEuro(villa.pricePerNight)}
                <span className="text-base font-normal text-stone"> / nuit</span>
              </p>
              <p className="mt-2 text-sm text-stone">
                {villa.bedrooms} chambres · jusqu&apos;à {villa.guests} voyageurs
              </p>
              <a
                href={`mailto:contact@massalia-villas.fr?subject=Réservation ${encodeURIComponent(
                  villa.name,
                )}`}
                className="mt-6 block rounded-full bg-terracotta px-6 py-3 text-center font-semibold text-cream transition-base hover:bg-terracotta-dark"
              >
                Demander une réservation
              </a>
              <a
                href="tel:+33491000000"
                className="mt-3 block rounded-full border border-sand px-6 py-3 text-center font-semibold text-sea-dark transition-base hover:bg-sand"
              >
                +33 4 91 00 00 00
              </a>
              <p className="mt-4 text-center text-xs text-stone">
                Réponse sous 24 h · Conciergerie Massalia
              </p>
            </div>
          </aside>
        </section>

        {/* Autres villas */}
        <section className="bg-sand/60 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-8 text-center text-3xl font-bold">
              Découvrir aussi
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {others.map((v) => (
                <Link
                  key={v.slug}
                  href={`/villas/${v.slug}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand transition-base hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className="aspect-[4/3] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${v.heroImage})` }}
                  />
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wider text-terracotta">
                      {v.neighborhood}
                    </p>
                    <h3 className="mt-1 text-lg font-bold">{v.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
