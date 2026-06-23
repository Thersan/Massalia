import Link from "next/link";
import Logo from "./Logo";
import { villas } from "@/data/villas";

export default function Footer() {
  return (
    <footer className="mt-24 bg-sea-dark text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="max-w-xs text-sm text-cream/70">
            Gestion et location de villas d&apos;exception à Marseille. L&apos;art de
            vivre méditerranéen, sans compromis.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream/60">
            Nos villas
          </h4>
          <ul className="space-y-2 text-sm">
            {villas.map((v) => (
              <li key={v.slug}>
                <Link
                  href={`/villas/${v.slug}`}
                  className="text-cream/80 transition-base hover:text-terracotta"
                >
                  {v.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream/60">
            Massalia
          </h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>
              <Link href="/#services" className="hover:text-terracotta">
                Nos services
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-terracotta">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-terracotta">
                Espace propriétaires
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cream/60">
            Contact
          </h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>Vieux-Port, 13007 Marseille</li>
            <li>
              <a href="tel:+33491000000" className="hover:text-terracotta">
                +33 4 91 00 00 00
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@massalia-villas.fr"
                className="hover:text-terracotta"
              >
                contact@massalia-villas.fr
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Massalia Villas. Tous droits réservés.</p>
          <p>Marseille · Méditerranée</p>
        </div>
      </div>
    </footer>
  );
}
