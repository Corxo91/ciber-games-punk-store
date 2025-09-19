// next.config.mjs
/** @type {import('next').NextConfig} */

// Toma el nombre real del repo desde el workflow (ver abajo)
const repo = process.env.NEXT_PUBLIC_REPO_NAME || ""; // ej: "ciber-games-punk-store"
const basePath = repo ? `/${repo}` : "";
const assetPrefix = repo ? `https://corxo91.github.io/${repo}/` : undefined;

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true, // imprescindible en GH Pages
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  env: {
    NEXT_PUBLIC_SITE_URL: assetPrefix ? assetPrefix.replace(/\/$/, "") : "http://localhost:3000",
  },
};

export default nextConfig;
