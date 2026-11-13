import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// DM Sans guardada en el repo (no depende de Google Fonts al compilar).
const dmSans = localFont({
  src: "./fonts/dm-sans-latin.woff2",
  weight: "400 800",
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Catálogo de productos | G Packing",
  description:
    "Catálogo de G Packing: packaging, descartables, limpieza y papelería. Todo en empaque y limpieza.",
  openGraph: {
    title: "Catálogo de productos | G Packing",
    description: "Todo en empaque y limpieza. Packaging, descartables, limpieza y papelería.",
    type: "website",
    locale: "es_UY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} antialiased`} data-theme="light">
      <body className="catalog-body">{children}</body>
    </html>
  );
}
