// Genera public/catalogo-gpacking.pdf a partir del sitio compilado (out/).
// Uso: npm run build && node scripts/pdf.js && npm run build
const { chromium } = require("playwright");
const http = require("http");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "out");

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".txt": "text/plain" };

(async () => {
  // Sirve out/ bajo el basePath del sitio (/gp-catalogo) para que las rutas funcionen.
  const basePath = process.env.BASE_PATH ?? "/gp-catalogo";
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p.startsWith(basePath)) p = p.slice(basePath.length) || "/";
    let f = path.join(OUT, p);
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
    if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" });
    fs.createReadStream(f).pipe(res);
  }).listen(4789);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1100, height: 1400 } });
  await page.goto(`http://localhost:4789${basePath}/`, { waitUntil: "networkidle" });
  await page.evaluate(async () => { for (const img of document.images) { img.loading = "eager"; if (!img.complete) await new Promise((r) => { img.onload = img.onerror = r; }); } });
  // Para que el PDF pese poco: imágenes de producto a JPEG sobre el fondo de la tarjeta.
  await page.evaluate(() => {
    for (const img of document.querySelectorAll(".card-img img, .index-img img")) {
      const c = document.createElement("canvas"); c.width = c.height = 300;
      const x = c.getContext("2d"); const g = x.createRadialGradient(150, 126, 0, 150, 150, 212); g.addColorStop(0, "#f7faf5"); g.addColorStop(0.55, "#e4eddf"); g.addColorStop(1, "#ccdcc4"); x.fillStyle = g; x.fillRect(0, 0, 300, 300);
      x.drawImage(img, 0, 0, 300, 300); img.src = c.toDataURL("image/jpeg", 0.8);
    }
  });
  await page.emulateMedia({ media: "print" });
  await page.pdf({ path: path.join(__dirname, "..", "public", "catalogo-gpacking.pdf"), format: "A4", printBackground: true, preferCSSPageSize: true });
  await browser.close();
  server.close();
  console.log("PDF generado en public/catalogo-gpacking.pdf");
})();
