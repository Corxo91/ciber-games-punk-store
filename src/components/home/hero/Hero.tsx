"use client";

import Container from "@/components/ui/container/Container";
import { slideIn, staggerContainer } from "@/lib/motion";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaBolt, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { filterGames } from "@/lib/searchUtils";
import { GamesProps as Game } from "@/types/home.types";
import Image from "next/image";
import { prefix } from "@/lib/prefix";
import { gamesData } from "@/data/games.data";
import { FaGamepad } from "react-icons/fa6";

const ease = cubicBezier(0.2, 0.65, 0.3, 0.9);

export default function Hero() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false); // controla visibilidad del dropdown
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results: Game[] = filterGames(gamesData, term);

  // Cerrar al click fuera (sin limpiar el término)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      const el = wrapperRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setOpen(false); // solo cierra
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside as EventListener, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside as EventListener);
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="relative min-h-[60vh] sm:min-h-[65vh] lg:min-h-[70vh] grid place-items-center">
      <div className="hero pointer-events-none absolute inset-0 h-[500px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-magenta-500/5" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <Container className="flex flex-col justify-center relative z-10 py-20 sm:py-24 lg:py-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          className="text-center"
        >
          <motion.h1 variants={slideIn("up")} className="cp-glow text-[2.2rem] sm:text-4xl lg:text-6xl font-bold">
            Tu portal de videojuegos
          </motion.h1>

          <motion.p variants={slideIn("up")} className="cp-paragraph mt-3 sm:mt-4 max-w-xl sm:max-w-2xl mx-auto text-2xl sm:text-2xl lg:text-3xl text-center">
            Descubre los mejores títulos al mejor precio. Entregas inmediatas y soporte top.
          </motion.p>

          <motion.div variants={slideIn("up")} className="mt-6 sm:mt-8">
            <Link
            href="/catalogo"
            className="cp-button inline-flex items-center gap-3 px-8 py-4 text-lg font-bold bg-gradient-to-r from-[var(--cp-cyan)] to-[var(--cp-magenta)] text-black rounded-xl hover:scale-105 transition-all duration-300"
          >
            <FaGamepad />
            Explorar Catálogo
            <FaBolt />
          </Link>
          </motion.div>

          {/* Search */}
          <motion.div
            variants={slideIn("up")}
            className="relative mt-8 max-w-xl mx-auto"
            ref={wrapperRef}
          >
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--cp-cyan)]" />
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onFocus={() => setOpen(true)}     // al enfocar, abre
                onClick={() => setOpen(true)}     // al click dentro, abre
                placeholder="Buscar juegos..."
                className={[
                  "w-full rounded-lg bg-[rgba(10,10,15,0.8)] border border-[rgba(0,229,255,0.4)] px-10 py-3 text-lg",
                  // sin outlines ni rings (lo pediste global, lo refuerzo aquí)
                  "outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus:border-[rgba(0,229,255,0.6)]",
                  "shadow-[0_0_15px_rgba(255,0,229,0.3)] font-bold",
                ].join(" ")}
              />
            </div>

            {/* Dropdown resultados */}
            <AnimatePresence>
              {open && term && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease } }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute left-0 right-0 mt-2 rounded-lg border border-[rgba(0,229,255,0.2)] bg-[rgba(10,10,15,0.95)] backdrop-blur-md shadow-[0_0_20px_rgba(255,0,229,0.25)] max-h-[320px] overflow-auto z-20"
                >
                  {results.length === 0 ? (
                    <p className="p-4 text-3xl text-center text-gray-300">Sin resultados</p>
                  ) : (
                    results.map((g) => (
                      <Link
                        key={g.id}
                        href={`/catalogo/${g.slug}`}
                        className="flex items-center gap-3 p-3 hover:bg-[rgba(255,0,229,0.05)] transition"
                        onClick={() => {
                          // navegamos y limpiamos la UI del dropdown, pero NO el término si no quieres
                          setOpen(false);
                          setTerm(""); // si quieres mantener el texto, elimina esta línea
                        }}
                      >
                        <div className="relative h-24 w-24 overflow-hidden rounded border border-[rgba(0,229,255,0.25)]">
                          <Image
                            src={`${prefix}${g.image}`}
                            alt={g.title}
                            width={96}
                            height={96}
                            className="h-full w-full object-fill"
                          />
                        </div>

                        <div className="flex-1 text-left">
                          <h1 className="font-bold text-xl">{g.title}</h1>
                          <span className="text-sm text-gray-400">{g.category.join(", ")}</span>
                          {/* descripción 2 líneas */}
                          <p className="mt-1 text-md text-gray-300 line-clamp-2">
                            {g.description}
                          </p>
                        </div>

                        {/* precio a la derecha */}
                        <span className="ml-3 shrink-0 text-3xl font-bold text-[var(--cp-magenta)]">
                          €{g.price.toFixed(2)}
                        </span>
                      </Link>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
