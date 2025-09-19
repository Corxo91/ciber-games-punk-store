/** @type {import('next').NextConfig} */

const isProd = process.env.NEXT_PUBLIC_REPO_NAME === 'production'; 

const nextConfig = {
  output: "export",                 
  basePath: isProd ? "/ciber-games-punk-store" : "", 
  assetPrefix: isProd ? "/ciber-games-punk-store/" : "",                                              
  trailingSlash: true,               
  reactStrictMode: true,          
  images: {
    unoptimized: true,              
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" }, 
    ],
  },

};

export default nextConfig;

