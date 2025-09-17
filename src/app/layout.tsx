import type { Metadata } from "next";
import { Orbitron, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", display: "swap" });
const shareTechMono = Share_Tech_Mono({ subsets: ["latin"], weight: "400", variable: "--font-sharetech", display: "swap" });

const base = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: "Cyber Games Punk Store",
  description: "Todos los videojuegos al alcance de todos.",
  metadataBase: new URL(base?.startsWith("http") ? base : "http://localhost:3000"),
  icons: {
    icon: [{ url: "/icons/favicon.png", type: "image/png", sizes: "32x32" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${orbitron.variable} ${shareTechMono.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh antialiased" suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
