import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Esteban Ramírez | Terminal Portfolio",
  description: "Full Stack Developer - Interactive terminal portfolio",
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
      </head>
      <body>{children}</body>
    </html>
  );
}
