import type { Metadata } from "next";
import { Young_Serif, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const display = Young_Serif({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const body = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-body" });

const SITE_URL = "https://thanyushotelmontalvania.vercel.app";
const SITE_TITLE = "Thanyu’s Hotel | Hospedagem no Centro de Montalvânia, MG";
const SITE_DESCRIPTION =
  "Portaria 24h, quartos térreos com ar-condicionado, café da manhã mineiro feito pelo Sr. Agostinho e estacionamento seguro na Avenida Confúcio, 215, Centro de Montalvânia, MG.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Thanyu’s Hotel",
    locale: "pt_BR",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Thanyu’s Hotel",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Confúcio, 215, Centro",
    addressLocality: "Montalvânia",
    addressRegion: "MG",
    postalCode: "39495-000",
    addressCountry: "BR",
  },
  telephone: "+5538999617978",
  openingHours: "Mo-Su 00:00-23:59",
  amenityFeature: ["Recepção 24h", "Wi-Fi", "Ar-condicionado", "Frigobar", "Café da manhã", "Estacionamento"].map((n) => ({
    "@type": "LocationFeatureSpecification",
    name: n,
    value: true,
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}