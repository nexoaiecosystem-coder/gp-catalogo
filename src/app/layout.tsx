import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
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
