// src/components/layout/Header.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Ui/Container/Container";
import { FaBolt } from "react-icons/fa";
import { motion, AnimatePresence, cubicBezier, Variants } from "framer-motion";
import Reveal from "@/components/Ui/Reveal/Reveal";
const links = [
  { href: "#fullgame", label: "Juegos Destacados" },
  { href: "#category", label: "Categorias" },
  { href: "/store", label: "Catalogo" },
  { href: "#contact", label: "Contacto" },
];

const easeCyber = cubicBezier(0.2, 0.65, 0.3, 0.9);

const panelVariants: Variants = {
  hidden: { opacity: 0, y: -16, filter: "blur(6px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.22, ease: easeCyber },
  },
  exit: {
    opacity: 0, y: -12, filter: "blur(4px)",
    transition: { duration: 0.18, ease: easeCyber },
  },
};

export default function Header() {
  const [open, setOpen] = useState(false);

  // Bloquea scroll al abrir
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(0,229,255,0.2)] bg-[rgba(10,10,15,0.7)] backdrop-blur-md">
      <Reveal>
        <Container className="flex h-16 items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-bold degradedBlue cp-glow">
          <FaBolt className="cp-glow" />
          <Image src="/assets/logo.png" alt="Logo" width={72} height={36} priority />
          <span>Wolfs Store</span>
        </Link>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-lg lg:text-2xl font-semibold hover:text-[var(--cp-lime)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile trigger (centrado perfecto) */}
        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden grid place-items-center h-10 w-10 rounded-lg border border-[rgba(0,229,255,0.35)] bg-[rgba(10,10,15,0.6)] active:scale-95 transition"
        >
          {/* Elimina el fondo si quieres: quita bg-... y border-... de la clase de arriba */}
          <div className="relative h-6 w-6">
            {/* Todas las líneas parten del centro geométrico */}
            <motion.span
              initial={false}
              animate={open ? { rotate: 45 } : { rotate: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="absolute left-1/2 top-1/2 block h-[2px] w-6 -translate-x-1/2 -translate-y-1/2 bg-[var(--cp-cyan)] cp-glow"
            />
            <motion.span
              initial={false}
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.12 }}
              className="absolute left-1/2 top-1/2 block h-[2px] w-6 -translate-x-1/2 -translate-y-1/2 bg-[var(--cp-magenta)] cp-glow"
            />
            <motion.span
              initial={false}
              animate={open ? { rotate: -45 } : { rotate: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="absolute left-1/2 top-1/2 block h-[2px] w-6 -translate-x-1/2 -translate-y-1/2 bg-[var(--cp-cyan)] cp-glow"
            />
          </div>
        </button>
      </Container>
      </Reveal>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-panel"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="md:hidden border-t border-[rgba(0,229,255,0.2)] bg-[rgba(10,10,15,0.92)] backdrop-blur-md absolute top-16 left-0 w-full z-30"
          >
            <nav className="px-4 py-4">
              <ul className="divide-y divide-[rgba(0,229,255,0.12)]">
                {links.map((l, idx) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx, duration: 0.18, ease: easeCyber }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 text-lg sm:text-xl tracking-wide hover:text-[var(--cp-lime)] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-[var(--cp-magenta)] via-[var(--cp-cyan)] to-[var(--cp-lime)] shadow-[0_0_18px_rgba(0,229,255,0.45)]" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
