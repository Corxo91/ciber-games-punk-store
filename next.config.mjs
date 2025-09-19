/** @type {import('next').NextConfig} */

const repo = process.env.NEXT_PUBLIC_REPO_NAME || "";              // ej: "ciber-games-punk-store"
const basePath = repo ? `/${repo}` : "";
const assetPrefix = repo ? `https://corxo91.github.io/${repo}/` : undefined;

const nextConfig = {
  utput: "export",                 // <- GitHub Pages necesita export estático (carpeta /out)
  basePath,                         // <- rutas como /catalogo quedan servidas bajo /<repo>/catalogo
  assetPrefix,                      // <- assets referenciados absolutmente
  trailingSlash: true,             // <- GitHub Pages sirve index.html en carpetas    
  reactStrictMode: true,          
  images: {
    unoptimized: true,              // <- next/image no funciona con export estático
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" }, 
    ],
  },
  // si usas site url pública en metadata:
  env: {
    NEXT_PUBLIC_SITE_URL: assetPrefix ? assetPrefix.replace(/\/$/, "") : "http://localhost:3000",
  },
};

export default nextConfig;
