"use client";

import Container from "@/components/ui/container/Container";
import GameCard from "@/components/ui/gameCard/GameCard";
import { gamesData } from "@/data/home.data";
import { filterGames } from "@/lib/searchUtils";
import { GamesProps as Game } from "@/types/home.types";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaSearch } from "react-icons/fa";

import Reveal from "@/components/ui/reveal/Reveal";
import { cubicBezier, motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { A11y, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const easeCyber = cubicBezier(0.2, 0.65, 0.3, 0.9);

export default function CatalogoPage() {
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [maxPriceInput, setMaxPriceInput] = useState<string>("");

  // Lee ?categoria=... SOLO cliente
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const initial = params.get("categoria") || undefined;
      setCategory(initial);
    } catch {}
  }, []);

  // Altura dinámica del header fijo
  const [headerH, setHeaderH] = useState(64);
  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;
    const setH = () => setHeaderH(Math.round(header.getBoundingClientRect().height || 64));
    setH();
    const ro = new ResizeObserver(setH);
    ro.observe(header);
    window.addEventListener("resize", setH);
    window.addEventListener("orientationchange", setH);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setH);
      window.removeEventListener("orientationchange", setH);
    };
  }, []);

  // Parseo robusto precio máx
  const maxPrice = useMemo(() => {
    if (!maxPriceInput.trim()) return undefined;
    const n = Number(maxPriceInput.replace(",", "."));
    return Number.isFinite(n) && n >= 0 ? n : undefined;
  }, [maxPriceInput]);

  // Data & filtros
  const categories = Array.from(new Set(gamesData.flatMap((g) => g.category)));
  const results: Game[] = filterGames(gamesData, term, category, maxPrice);

  const textMatchesNoPrice: Game[] = useMemo(
    () => filterGames(gamesData, term, category, undefined),
    [term, category]
  );

  const overBudgetMatches: Game[] = useMemo(() => {
    if (typeof maxPrice !== "number") return [];
    return textMatchesNoPrice.filter((g) => g.price > maxPrice);
  }, [textMatchesNoPrice, maxPrice]);

  const blockedByBudget = useMemo(
    () => typeof maxPrice === "number" && results.length === 0 && textMatchesNoPrice.length > 0,
    [maxPrice, results.length, textMatchesNoPrice.length]
  );

  const minOverBudgetPrice = useMemo(() => {
    if (overBudgetMatches.length === 0) return undefined;
    return overBudgetMatches.reduce((m, g) => Math.min(m, g.price), overBudgetMatches[0].price);
  }, [overBudgetMatches]);

  // Sentinel + stuck (para clonar en fixed)
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { root: null, threshold: 0, rootMargin: `-${headerH}px 0px 0px 0px` }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [headerH]);

  // Medir altura real de la barra "en flujo"
  const flowBarWrapRef = useRef<HTMLDivElement | null>(null);
  const [flowBarH, setFlowBarH] = useState(56);
  useEffect(() => {
    const el = flowBarWrapRef.current;
    if (!el) return;
    const setBH = () => setFlowBarH(Math.round(el.getBoundingClientRect().height || 56));
    setBH();
    const ro = new ResizeObserver(setBH);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Portal listo
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // --- Ancla visual del listado para evitar que quede "debajo" de la barra ---
  const resultsTopRef = useRef<HTMLDivElement | null>(null);

  // Auto-ajuste del scroll cuando cambia el filtro/búsqueda o el estado pegado
  useEffect(() => {
    if (!resultsTopRef.current) return;
    // Usa scrollMarginTop que seteamos abajo
    resultsTopRef.current.scrollIntoView({ block: "start", behavior: "instant" });
  }, [term, category, maxPrice, stuck]);

  return (
    <main className="pt-24 py-10">
      <Container>
        {/* Disparador: cuando esto cruza el header, fijamos */}
        <div ref={sentinelRef} className="h-0" aria-hidden />

        {/* Barra original (en flujo) — la envolvemos con ref para medir altura */}
        <div ref={flowBarWrapRef}>
          <FilterBar
            term={term}
            setTerm={setTerm}
            category={category}
            setCategory={setCategory}
            categories={categories}
            maxPriceInput={maxPriceInput}
            setMaxPriceInput={setMaxPriceInput}
            badgeText="Precio máximo (€)"
          />
        </div>

        {/* Barra clonada en FIXED via portal (debajo del header) */}
        {mounted && stuck &&
          createPortal(
            <motion.div
              initial={{ opacity: 0, y: -8, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22, ease: easeCyber } }}
              exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
              className="fixed left-0 right-0 z-40 border-b border-[rgba(0,229,255,0.20)] bg-[rgba(10,10,15,0.80)] backdrop-blur-md"
              style={{ top: headerH }}
            >
              <Container>
                <FilterBar
                  term={term}
                  setTerm={setTerm}
                  category={category}
                  setCategory={setCategory}
                  categories={categories}
                  maxPriceInput={maxPriceInput}
                  setMaxPriceInput={setMaxPriceInput}
                  badgeText="Precio máx (€)"
                />
              </Container>
            </motion.div>,
            document.body
          )
        }

        {/* ===== Aviso presupuesto ===== */}
        {blockedByBudget && (
          <Reveal>
            <div className="mt-6 mb-6 rounded-lg border border-[rgba(0,229,255,0.25)] bg-[rgba(10,10,15,0.75)] p-4 shadow-[0_0_20px_rgba(255,0,229,0.15)]">
              <p className="text-center text-[var(--cp-cyan)] text-lg mb-2 sm:mb-0">
                Hay resultados para tu búsqueda, pero{" "}
                <span className="text-[var(--cp-magenta)] font-bold">superan tu fondo</span>.
              </p>
              {typeof minOverBudgetPrice === "number" && (
                <p className="text-center text-sm sm:text-base text-gray-300 mb-3 sm:mb-0">
                  La existencia cuesta…{" "}
                  <span className="font-bold text-[var(--cp-magenta)]">€{minOverBudgetPrice.toFixed(2)}</span>
                </p>
              )}
              <div className="mt-1 sm:mt-3 flex items-center justify-center">
                <button
                  className="cp-button px-4 py-2 rounded-lg text-base font-bold"
                  onClick={() => setMaxPriceInput("")}
                >
                  Ver igual
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {/* ===== Listados ===== */}
        {/* Empujamos el contenido cuando la barra está fija y definimos scrollMarginTop */}
        <div
          style={{
            paddingTop: stuck ? flowBarH : 0,
            scrollMarginTop: `${headerH + (stuck ? flowBarH : 0)}px`,
          }}
        >
          {/* Ancla exacta del inicio del listado para scrollIntoView */}
          <div
            ref={resultsTopRef}
            style={{ scrollMarginTop: `${headerH + (stuck ? flowBarH : 0)}px` }}
          />

          <Reveal>
            <div className="block sm:hidden">
              {results.length === 0 && !blockedByBudget ? (
                <p className="cp-paragraph text-center text-2xl">No se encontraron juegos.</p>
              ) : results.length === 0 && blockedByBudget ? (
                <div />
              ) : (
                <Swiper
                  modules={[Pagination, A11y, Keyboard]}
                  pagination={{ clickable: true }}
                  keyboard={{ enabled: true }}
                  spaceBetween={14}
                  slidesPerView={1}
                  className="!pb-8"
                  loop
                >
                  {results.map((g) => (
                    <SwiperSlide key={g.id} className="!h-auto">
                      <GameCard game={g} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </Reveal>

          <Reveal>
            <div className="hidden sm:block">
              {results.length === 0 && !blockedByBudget ? (
                <p className="cp-paragraph text-center text-5xl">No se encontraron juegos.</p>
              ) : results.length === 0 && blockedByBudget ? (
                <div />
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {results.map((g) => (
                    <GameCard key={g.id} game={g} />
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </main>
  );
}

/* ====================== Subcomponente reutilizable ====================== */

function FilterBar({
  term,
  setTerm,
  category,
  setCategory,
  categories,
  maxPriceInput,
  setMaxPriceInput,
  badgeText,
}: {
  term: string;
  setTerm: (v: string) => void;
  category?: string;
  setCategory: (v?: string) => void;
  categories: string[];
  maxPriceInput: string;
  setMaxPriceInput: (v: string) => void;
  badgeText: string;
}) {
  return (
    <>
      {/* Desktop/Tablet */}
      <div className="hidden sm:flex flex-row gap-4 items-center py-3">
        {/* Search */}
        <div className="relative w-[45%]">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--cp-cyan)]" />
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Buscar juegos..."
            className="
              w-full rounded-lg bg-[rgba(10,10,15,0.8)]
              border border-[rgba(0,229,255,0.4)]
              px-10 py-3 text-base
              outline-none focus:outline-none focus-visible:outline-none
              focus:ring-0 focus-visible:ring-0
              focus:border-[rgba(0,229,255,0.6)]
              shadow-[0_0_15px_rgba(255,0,229,0.3)]
            "
          />
        </div>

        {/* Categoría */}
        <select
          value={category || ""}
          onChange={(e) => setCategory(e.target.value || undefined)}
          className="
            w-[28%]
            rounded-lg bg-[rgba(10,10,15,0.7)]
            border border-[rgba(0,229,255,0.3)]
            px-4 py-3 text-base
            outline-none focus:outline-none focus-visible:outline-none
            focus:ring-0 focus-visible:ring-0
            focus:border-[rgba(0,229,255,0.6)]
            shadow-[0_0_15px_rgba(255,0,229,0.3)]
          "
        >
          <option value="">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Precio máximo */}
        <div className="relative w-[27%]">
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step="0.01"
            value={maxPriceInput}
            onChange={(e) => setMaxPriceInput(e.target.value)}
            placeholder="Precio máximo (€)"
            className="
              w-full rounded-lg bg-[rgba(10,10,15,0.8)]
              border border-[rgba(0,229,255,0.4)]
              px-4 py-3 text-base
              outline-none focus:outline-none focus-visible:outline-none
              focus:ring-0 focus-visible:ring-0
              focus:border-[rgba(0,229,255,0.6)]
              shadow-[0_0_15px_rgba(255,0,229,0.3)]
            "
          />
          {maxPriceInput.trim() && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--cp-cyan)] opacity-80">
              {badgeText}
            </span>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden py-3">
        {/* Search */}
        <div className="relative w-full mb-4">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--cp-cyan)]" />
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Buscar juegos..."
            className="
              w-full rounded-lg bg-[rgba(10,10,15,0.8)]
              border border-[rgba(0,229,255,0.4)]
              px-10 py-3 text-base
              outline-none focus:outline-none focus-visible:outline-none
              focus:ring-0 focus-visible:ring-0
              focus:border-[rgba(0,229,255,0.6)]
              shadow-[0_0_15px_rgba(255,0,229,0.3)]
            "
          />
        </div>

        {/* Categoría + Precio lado a lado */}
        <div className="grid grid-cols-2 gap-4">
          <select
            value={category || ""}
            onChange={(e) => setCategory(e.target.value || undefined)}
            className="
              rounded-lg bg-[rgba(10,10,15,0.7)]
              border border-[rgba(0,229,255,0.3)]
              px-4 py-3 text-base
              outline-none focus:outline-none focus-visible:outline-none
              focus:ring-0 focus-visible:ring-0
              focus:border-[rgba(0,229,255,0.6)]
              shadow-[0_0_15px_rgba(255,0,229,0.3)]
            "
          >
            <option value="">Categorías</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              placeholder="Precio máx (€)"
              className="
                w-full rounded-lg bg-[rgba(10,10,15,0.8)]
                border border-[rgba(0,229,255,0.4)]
                px-4 py-3 text-base
                outline-none focus:outline-none focus-visible:outline-none
                focus:ring-0 focus-visible:ring-0
                focus:border-[rgba(0,229,255,0.6)]
                shadow-[0_0_15px_rgba(255,0,229,0.3)]
              "
            />
            {maxPriceInput.trim() && (
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[var(--cp-cyan)] opacity-80">
                {badgeText}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
