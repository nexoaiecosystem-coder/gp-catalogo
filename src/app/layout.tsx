import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { CONTACT } from "@/lib/constants";
import { ShareButton } from "./_components/ShareButton";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catálogo de productos | G Packing",
  description:
    "Catálogo de G Packing: packaging, descartables, limpieza y papelería. Cada producto con su medida y código.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
      data-theme="light"
    >
      <body className="flex min-h-full flex-col">
        {/* Catálogo en blanco: un solo tema, colores fijos */}
        <div className="flex min-h-full flex-1 flex-col bg-white text-[#17191b] [color-scheme:light]">
          <header className="sticky top-0 z-20 border-b border-[#e6e6e1] bg-white">
            <div className="mx-auto flex h-[60px] max-w-[1080px] items-center gap-4 px-4">
              <Link href="/" className="flex shrink-0 items-center gap-4 leading-none">
                <span className="font-display text-xl font-bold tracking-tight text-[#0d3d22]">
                  G<span className="text-[#4f7a2e]">PACKING</span>
                </span>
                <span className="hidden border-l border-[#e6e6e1] pl-4 text-xs uppercase tracking-[0.12em] text-[#868a84] sm:inline">
                  Catálogo 2026
                </span>
              </Link>
              <div className="flex-1" />
              <ShareButton title="Catálogo G Packing" />
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-[#e6e6e1]">
            <div className="mx-auto flex max-w-[1080px] flex-wrap gap-x-7 gap-y-1.5 px-4 py-6 text-[13.5px] text-[#4b4f52]">
              <span>
                <b className="font-semibold text-[#17191b]">WhatsApp</b> {CONTACT.whatsappDisplay}
              </span>
              <span>
                <b className="font-semibold text-[#17191b]">Instagram</b> {CONTACT.instagramHandle}
              </span>
              <span>
                <b className="font-semibold text-[#17191b]">Email</b> {CONTACT.email}
              </span>
              <span>
                <b className="font-semibold text-[#17191b]">Dirección</b> {CONTACT.address}
              </span>
            </div>
          </footer>
        </div>

      </body>
    </html>
  );
}
