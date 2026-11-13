"use client";

import { useEffect } from "react";

const TOOLBAR_OFFSET = 70;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Marca una lámina como "recién llegada": replay de la animación de despliegue. */
function land(target: HTMLElement) {
  // Todo lo que quedó por encima ya se "vio": se marca como visible y se sale del modo desplazamiento.
  const bottom = window.innerHeight;
  document.querySelectorAll(".reveal, .card, .index-grid > li, .custom, .sec-band").forEach((el) => {
    if (el.getBoundingClientRect().top < bottom) el.classList.add("in-view");
  });
  document.documentElement.classList.remove("jumping");
  target.classList.remove("landed");
  void target.offsetWidth; // reinicia la animación
  target.classList.add("landed");
  window.setTimeout(() => target.classList.remove("landed"), 1600);
}

/** Desplazamiento animado hasta una sección, con duración según la distancia. */
export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const startY = window.scrollY;
  const endY = target.getBoundingClientRect().top + window.scrollY - (id === "portada" ? 0 : TOOLBAR_OFFSET);
  const distance = endY - startY;
  history.replaceState(null, "", `#${id}`);
  if (reducedMotion() || Math.abs(distance) < 4) {
    window.scrollTo(0, endY);
    land(target);
    return;
  }
  const duration = Math.min(1400, 450 + Math.abs(distance) * 0.12);
  // Mientras se desplaza, todo se ve (sin esperar a que cada elemento aparezca).
  document.documentElement.classList.add("jumping");
  const t0 = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / duration);
    window.scrollTo(0, startY + distance * easeInOutCubic(t));
    if (t < 1) requestAnimationFrame(step);
    else land(target);
  };
  requestAnimationFrame(step);
}

/**
 * Animaciones del catálogo:
 * - aparición de láminas, tarjetas y bandas al entrar en pantalla (en cascada)
 * - navegación animada en los links internos (#seccion)
 * Sin JavaScript, con "reducir movimiento" o al imprimir, todo se ve estático.
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    // Alto real de la barra superior: la portada ocupa exactamente la pantalla que queda.
    const toolbar = document.querySelector<HTMLElement>(".toolbar");
    const setToolbarH = () => root.style.setProperty("--tb-h", `${toolbar?.offsetHeight ?? 0}px`);
    setToolbarH();
    window.addEventListener("resize", setToolbarH);
    // Al abrir sin #seccion, siempre arranca en la portada.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!location.hash) window.scrollTo(0, 0);
    if (reducedMotion()) return () => window.removeEventListener("resize", setToolbarH);
    root.classList.add("anim");

    // Índice de cascada dentro de cada grupo
    document.querySelectorAll(".cards, .index-grid, .custom-grid").forEach((grid) => {
      Array.from(grid.children).forEach((el, i) => (el as HTMLElement).style.setProperty("--i", String(i % 12)));
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll(".card, .index-grid > li, .custom, .sec-band").forEach((el) => io.observe(el));
    // Las láminas se preparan antes de entrar en pantalla, para que al desplazarse nunca se vea vacío.
    const ioSheets = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in-view"); ioSheets.unobserve(e.target); }
      },
      { rootMargin: "0px 0px 35% 0px", threshold: 0 }
    );
    document.querySelectorAll(".reveal").forEach((el) => ioSheets.observe(el));

    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id || !document.getElementById(id)) return;
      ev.preventDefault();
      scrollToSection(id);
    };
    document.addEventListener("click", onClick);

    // Si se abre con #seccion, llegar animado
    const hash = decodeURIComponent(location.hash.slice(1));
    if (hash && document.getElementById(hash)) {
      window.scrollTo(0, 0);
      window.setTimeout(() => scrollToSection(hash), 350);
    }

    return () => {
      window.removeEventListener("resize", setToolbarH);
      io.disconnect();
      ioSheets.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
