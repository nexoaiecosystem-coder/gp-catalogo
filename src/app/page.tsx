import { CONTACT } from "@/lib/constants";
import { customizableProducts } from "@/lib/personalizado";
import { getCatalog, type Family, type Section } from "./_lib";
import { illustrationFor } from "./_illustrations";
import { Illustration } from "./_components/Illustration";
import { Toolbar } from "./_components/Toolbar";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const pad = (n: number) => String(n).padStart(2, "0");

function Picture({ family, className }: { family: Family; className?: string }) {
  return (
    <div className={className}>
      {family.photo ? (
        // eslint-disable-next-line @next/next/no-img-element -- export estático sin optimizador de imágenes
        <img src={family.photo} alt={family.name} loading="lazy" />
      ) : (
        <Illustration spec={illustrationFor(family.name)} id={`il-${family.id}`} />
      )}
    </div>
  );
}

/** Encabezado y pie de cada lámina, como en la lista de precios impresa. */
function SheetChrome({ page, children }: { page: number; children: React.ReactNode }) {
  return (
    <>
      <div className="sheet-top">
        <span>GPACKING</span>
        <span>PACKAGING Y LIMPIEZA</span>
      </div>
      {children}
      <div className="sheet-foot">
        <span>
          <a href={`https://wa.me/${CONTACT.whatsappNumber}`} target="_blank" rel="noopener noreferrer">WhatsApp {CONTACT.whatsappDisplay}</a> · <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer">{CONTACT.instagramHandle}</a> ·{" "}
          {CONTACT.address}
        </span>
        <span className="sheet-num">{pad(page)}</span>
      </div>
    </>
  );
}

function Cover({ total, sections }: { total: number; sections: number }) {
  return (
    <section id="portada" className="sheet sheet-cover">
      <div className="cover-ring" aria-hidden />
      <div className="cover-ring cover-ring-2" aria-hidden />
      <div className="cover-logo">
        {/* eslint-disable-next-line @next/next/no-img-element -- export estático */}
        <img src={`${BASE}/logo-gpacking.png`} alt="G Packing" />
      </div>
      <p className="cover-kicker">Catálogo de productos · 2026</p>
      <h1 className="cover-title">
        Todo en empaque
        <br />y limpieza
      </h1>
      <p className="cover-sub">
        {total} productos en {sections} categorías para gastronomía, comercios y empresas.
      </p>
      <div className="cover-contact">
        <a href={`https://wa.me/${CONTACT.whatsappNumber}`} target="_blank" rel="noopener noreferrer">WhatsApp {CONTACT.whatsappDisplay}</a>
        <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram {CONTACT.instagramHandle}</a>
        <span>{CONTACT.address}</span>
      </div>
    </section>
  );
}

function Index({ catalog }: { catalog: Section[] }) {
  return (
    <section className="sheet sheet-index">
      <SheetChrome page={2}>
        <h2 className="index-title">
          <span>Índice</span>
          Categorías
        </h2>
        <ol className="index-grid">
          {catalog.map((s, i) => {
            const cover = s.families.find((f) => f.photo) ?? s.families[0];
            return (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="index-tile">
                  <Picture family={cover} className="index-img" />
                  <span className="index-num">{pad(i + 1)}</span>
                  <span className="index-name">{s.name}</span>
                  <span className="index-meta">
                    {s.count} productos · {s.prefix}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </SheetChrome>
    </section>
  );
}

function SectionSheet({ section, index }: { section: Section; index: number }) {
  return (
    <section id={section.slug} className="sheet" data-section>
      <SheetChrome page={index + 3}>
        <header className="sec-band">
          <span className="sec-num">{pad(index + 1)}</span>
          <div>
            <h2 className="sec-name">{section.name}</h2>
            <p className="sec-meta">
              {section.count} productos · códigos <b>{section.prefix}</b>
            </p>
          </div>
        </header>
        <div className="cards">
          {section.families.map((f) => (
            <article
              key={f.id}
              className="card"
              data-search={`${f.name} ${f.rows.map((r) => `${r.detail} ${r.code}`).join(" ")}`}
            >
              <Picture family={f} className="card-img" />
              <h3 className="card-name">{f.name}</h3>
              <ul className="card-rows">
                {f.rows.map((r) => (
                  <li key={r.code}>
                    <span>{r.detail || "—"}</span>
                    <b>{r.code}</b>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </SheetChrome>
    </section>
  );
}

function BackCover({ page }: { page: number }) {
  return (
    <>
      <section className="sheet" data-section>
        <SheetChrome page={page}>
          <header className="sec-band sec-band-teal">
            <span className="sec-num">★</span>
            <div>
              <h2 className="sec-name">Packaging personalizado</h2>
              <p className="sec-meta">Tu marca en cajas, bolsas, vasos y papel antigrasa</p>
            </div>
          </header>
          <div className="custom-grid">
            {customizableProducts.map((c) => (
              <article key={c.id} className="custom" data-search={`${c.name} personalizado ${c.description}`}>
                <h3>{c.name}</h3>
                <p>{c.description}</p>
                <dl>
                  <div>
                    <dt>Impresión</dt>
                    <dd>{c.printColors}</dd>
                  </div>
                  <div>
                    <dt>Mínimo</dt>
                    <dd>{c.minQty}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </SheetChrome>
      </section>
      <section className="sheet sheet-cover sheet-back">
        <div className="cover-ring" aria-hidden />
        <div className="cover-logo">
          {/* eslint-disable-next-line @next/next/no-img-element -- export estático */}
          <img src={`${BASE}/logo-gpacking.png`} alt="G Packing" />
        </div>
        <p className="back-text">
          Somos una empresa dedicada a la venta de <b>productos de limpieza y packaging</b> para todos
          los rubros. Realizamos también <b>trabajos personalizados</b> adaptados a la imagen de tu
          negocio. Si no encontrás algún producto, <b>consultanos</b>: contamos con una amplia red de
          proveedores.
        </p>
        <p className="back-claim">¡Hacemos que tu presentación se destaque!</p>
        <div className="cover-contact">
          <a href={`https://wa.me/${CONTACT.whatsappNumber}`} target="_blank" rel="noopener noreferrer">WhatsApp {CONTACT.whatsappDisplay}</a>
          <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram {CONTACT.instagramHandle}</a>
          <span>{CONTACT.email}</span>
          <span>{CONTACT.address}</span>
        </div>
      </section>
    </>
  );
}

export default function CatalogoPage() {
  const catalog = getCatalog();
  const total = catalog.reduce((n, s) => n + s.count, 0);

  return (
    <>
      <Toolbar sections={catalog.map((s) => ({ slug: s.slug, name: s.name }))} />
      <main className="sheets">
        <Cover total={total} sections={catalog.length} />
        <Index catalog={catalog} />
        {catalog.map((s, i) => (
          <SectionSheet key={s.slug} section={s} index={i} />
        ))}
        <p className="no-results">
          No encontramos productos con esa búsqueda. Consultanos: trabajamos con una amplia red de
          proveedores.
        </p>
        <BackCover page={catalog.length + 3} />
      </main>
    </>
  );
}
