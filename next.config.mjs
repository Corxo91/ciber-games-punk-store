/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" }, // para tus <Image/>
    ],
  },
  // experimental: { instrumentationHook: true }, // solo si usas src/instrumentation.ts
};

export default nextConfig;
