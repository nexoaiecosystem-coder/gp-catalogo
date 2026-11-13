import type { NextConfig } from "next";

// En producción el sitio vive en https://nexoaiecosystem-coder.github.io/gp-catalogo/
// (GitHub Pages, subcarpeta = nombre del repo). En desarrollo (`next dev`) no se
// aplica basePath, así que localhost sigue funcionando en la raíz.
const isProd = process.env.NODE_ENV === "production";
const repo = "gp-catalogo";
const basePath = isProd ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Las imágenes en <img>/next/image con src en string no llevan el basePath
  // automáticamente; lo exponemos para armar las rutas de /public a mano.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
