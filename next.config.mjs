/** @type {import('next').NextConfig} */

const isProd = process.env.NEXT_PUBLIC_REPO_NAME === 'production'; 

const nextConfig = {
  utput: "export",                 
  basePath: isProd ? "/cpa-bank-project" : "", 
  assetPrefix: isProd ? "/cpa-bank-project/" : "",                                              
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

