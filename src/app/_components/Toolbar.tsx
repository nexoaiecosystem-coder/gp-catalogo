"use client";

import { useEffect, useState } from "react";
import { Download, Search, X } from "lucide-react";
import { ShareButton } from "./ShareButton";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Minúsculas y sin tildes, para que "higienico" encuentre "Higiénico". */
function normalize(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

type Props = { sections: { slug: string; name: string }[] };

/** Barra fija: índice de categorías, buscador y descarga del PDF. */
export function Toolbar({ sections }: Props) {
  const [query, setQuery] = useState("");

  // Filtra las tarjetas (data-search) y oculta las láminas que quedan vacías.
  useEffect(() => {
    const q = normalize(query.trim());
    document.documentElement.toggleAttribute("data-searching", q.length > 0);
    document.querySelectorAll<HTMLElement>("[data-search]").forEach((el) => {
      el.hidden = q.length > 0 && !normalize(el.dataset.search ?? "").includes(q);
    });
    document.querySelectorAll<HTMLElement>("[data-section]").forEach((sec) => {
      sec.hidden = q.length > 0 && !sec.querySelector("[data-search]:not([hidden])");
    });
  }, [query]);

  return (
    <div className="toolbar">
      <div className="toolbar-inner">
        <a href="#portada" className="toolbar-brand" aria-label="Ir a la portada">
          {/* eslint-disable-next-line @next/next/no-img-element -- export estático */}
          <img src={`${BASE}/logo-gpacking-2026.png`} alt="G Packing" />
        </a>
        <select
          aria-label="Ir a una categoría"
          className="toolbar-select"
          value=""
          onChange={(e) => {
            const el = document.getElementById(e.target.value);
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          <option value="" disabled>
            Categorías
          </option>
          {sections.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
          <option value="personalizado">Packaging personalizado</option>
        </select>
        <div className="toolbar-search">
          <Search size={16} aria-hidden />
          <input
            id="buscar"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            enterKeyHint="search"
            placeholder="Buscar producto o código"
            aria-label="Buscar producto o código"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Borrar búsqueda">
              <X size={15} />
            </button>
          )}
        </div>
        <a className="toolbar-pdf" href={`${BASE}/catalogo-gpacking.pdf`} download="Catalogo-G-Packing.pdf">
          <Download size={16} aria-hidden />
          <span>Descargar PDF</span>
        </a>
        <ShareButton title="Catálogo G Packing" />
      </div>
    </div>
  );
}
