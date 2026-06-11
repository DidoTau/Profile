import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Esteban Ramírez Fuenzalida — Full Stack Developer",
  description: "Esteban Ramírez Fuenzalida — Líder TI & Full Stack Developer. Ex-astrónomo, ahora construyo software. Santiago, Chile.",
  openGraph: {
    title: "Esteban Ramírez Fuenzalida",
    description: "Líder TI & Full Stack Developer · del cosmos al código",
    url: "https://eramirezfuenzalida.com",
    images: [{ url: "https://avatars.githubusercontent.com/u/43161063?v=4" }],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Esteban Ramírez Fuenzalida",
  url: "https://eramirezfuenzalida.com",
  image: "https://avatars.githubusercontent.com/u/43161063?v=4",
  jobTitle: "Líder TI & Full Stack Developer",
  worksFor: { "@type": "Organization", name: "ChileConverge" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad de Chile" },
  address: { "@type": "PostalAddress", addressLocality: "Santiago", addressCountry: "CL" },
  sameAs: [
    "https://github.com/DidoTau",
    "https://www.linkedin.com/in/estebanjramirezfuenzalida/",
    "https://didotau.github.io",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="canonical" href="https://eramirezfuenzalida.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
