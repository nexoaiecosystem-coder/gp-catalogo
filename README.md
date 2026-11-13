# G Packing — Catálogo de productos

Catálogo web de G Packing para **mostrar los productos**: sin precios, sin carrito y sin botones de compra.
Es un sitio independiente de la tienda (`gp-core`).

En línea: https://nexoaiecosystem-coder.github.io/gp-catalogo/

## Cómo correrlo

```bash
npm install
npm run dev
```

## Contenido

- **Productos y códigos:** `src/lib/catalogo-productos.ts` (301 productos, 14 categorías). Código = 3 letras de la categoría + número (`LIM-001`, `BOL-014`); reemplaza al código del sistema del local. Un producto nuevo va al final de su categoría con el número siguiente. Filas consecutivas con el mismo nombre se muestran como un producto con varias variantes.
- **Imágenes:** `public/fotos/<CÓDIGO>.webp`, renders 3D generados con `scripts/renders/` (ver su README). Sin imagen se muestra una ilustración (`src/app/_illustrations.ts`).
- **Contacto y packaging personalizado:** `src/lib/constants.ts` y `src/lib/personalizado.ts`.

## Publicación

Cada push a `main` se publica solo en GitHub Pages (`.github/workflows/deploy.yml`).
Con dominio propio: crear `public/CNAME` con el dominio y en `next.config.ts` dejar `basePath` vacío.
