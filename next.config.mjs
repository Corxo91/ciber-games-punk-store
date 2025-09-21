/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",                 
  basePath: isProd ? "/ciber-games-punk-store" : "", 
  assetPrefix: isProd ? "/ciber-games-punk-store/" : "",                                              
  trailingSlash: true,               
  reactStrictMode: false,          
  images: {
    unoptimized: true,              
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" }, 
    ],
  },

};

export default nextConfig;

