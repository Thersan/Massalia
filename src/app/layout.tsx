import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Massalia — Villas d'exception à Marseille",
    template: "%s · Massalia",
  },
  description:
    "Massalia gère une collection de villas d'exception à Marseille. Vue mer, calanques et art de vivre méditerranéen.",
  keywords: [
    "villa Marseille",
    "location villa luxe Marseille",
    "Massalia",
    "calanques",
    "villa vue mer",
  ],
  openGraph: {
    title: "Massalia — Villas d'exception à Marseille",
    description:
      "Une collection de villas d'exception au cœur de la Méditerranée.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
