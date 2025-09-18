"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Ui/Container/Container";
import { FaBolt, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence, cubicBezier, Variants } from "framer-motion";
import Reveal from "@/components/Ui/Reveal/Reveal";
import { headerData } from "@/data/home.data";
import CartButton from "@/components/Cart/CartButton";
import CartDropdown from "@/components/Cart/CartDropdown";

const links = headerData;
const easeCyber = cubicBezier(0.2, 0.65, 0.3, 0.9);

const panelVariants: Variants = {
  hidden: { opacity: 0, y: -16, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22, ease: easeCyber } },
  exit: { opacity: 0, y: -12, filter: "blur(4px)", transition: { duration: 0.18, ease: easeCyber } },
};

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(0,229,255,0.2)] bg-[rgba(10,10,15,0.7)] backdrop-blur-md">
      <Reveal>
        <Container className="h-16">
          {/* Flex en una sola línea, centrado vertical/horizontal */}
          <div className="flex h-full items-center justify-between">
            {/* IZQUIERDA: Hamburguesa (mobile) + Logo (desktop) */}
            <div className="flex items-center gap-3">
              <button
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="md:hidden grid place-items-center h-10 w-10 rounded-lg border border-[rgba(0,229,255,0.35)] bg-[rgba(10,10,15,0.6)] active:scale-95 transition text-[var(--cp-cyan)]"
              >
                {open ? <FaTimes /> : <FaBars />}
              </button>

              <Link
                href="/"
                className="hidden md:flex items-center gap-2 text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold degradedBlue cp-glow"
              >
                <FaBolt className="cp-glow" />
                <Image src="/assets/logo.png" alt="Logo" width={72} height={36} priority />
                <span>Wolfs Store</span>
              </Link>
            </div>

            {/* CENTRO: Brand (mobile) / Nav (desktop) */}
            <div className="flex items-center justify-center">
              <Link href="/" className="md:hidden flex items-center gap-2 text-2xl font-bold degradedBlue cp-glow">
                <FaBolt className="cp-glow" />
                <Image src="/assets/logo.png" alt="Logo" width={56} height={28} />
                <span>Wolfs</span>
              </Link>

              <nav className="hidden md:flex items-center gap-4 lg:gap-6">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-base lg:text-lg xl:text-xl font-semibold hover:text-[var(--cp-lime)] transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* DERECHA: Carrito */}
            <div className="relative flex items-center justify-end">
              <CartButton />
              {/* Render SIEMPRE el dropdown (mobile = fixed, desktop = absolute) */}
              <CartDropdown />
            </div>
          </div>
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
            className="md:hidden border-t border-[rgba(0,229,255,0.2)] bg-[rgba(10,10,15,0.92)] backdrop-blur-md absolute left-0 right-0 top-16 z-40"
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
