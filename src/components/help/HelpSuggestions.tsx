"use client";

import { faqData } from "@/data/help.data";
import { fuzzyMatch, normalize } from "@/lib/fuzzy";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaQuestion } from "react-icons/fa";
import { useHelp } from "./HelpContext";

type Props = {
  anchorRef: React.RefObject<HTMLDivElement>;
  focused: boolean;
};

export default function HelpSuggestions({ anchorRef, focused }: Props) {
  const { searchTerm, setSearchTerm, setActiveCategory, setExpandedId } = useHelp();
  const router = useRouter();

  const boxRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null);

  const results = useMemo(() => {
    const q = normalize(searchTerm);
    if (!q) return [];
    return faqData.filter(f => fuzzyMatch(q, `${f.question} ${f.answer}`)).slice(0, 8);
  }, [searchTerm]);

  // Montaje para portal
  useEffect(() => setMounted(true), []);

  // Seguir abriendo/cerrando según el término
  useEffect(() => {
    // Si hay término, mantenemos open según haya foco o estuviera ya abierto
    if (searchTerm) {
      setOpen((prev) => prev || focused); // reabre al enfocar con texto
    } else {
      setOpen(false); // sin texto, no mostramos nada
    }
  }, [searchTerm, focused]);

  // Recalcular posición en scroll/resize (queda pegado al input)
  useEffect(() => {
    if (!open) return;

    let raf = 0;
    const update = () => {
      const el = anchorRef.current;
      if (!el) return setPos(null);
      const r = el.getBoundingClientRect();
      setPos({
        top: r.bottom + window.scrollY + 8,
        left: r.left + window.scrollX,
        width: r.width,
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [anchorRef, open]);

  // Cerrar al click fuera (sin borrar el término)
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (boxRef.current && !boxRef.current.contains(target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  if (!mounted || !open || !pos) return null;

  const hasResults = results.length > 0;

  const dropdown = (
    <AnimatePresence>
      <motion.div
        ref={boxRef}
        style={{
          position: "absolute",
          top: pos.top,
          left: pos.left,
          width: pos.width,
          zIndex: 9999,
        }}
        initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute left-0 right-0 mt-2 rounded-lg border border-[rgba(0,229,255,0.2)] bg-[rgba(10,10,15,0.95)] backdrop-blur-md shadow-[0_0_20px_rgba(255,0,229,0.25)] max-h-[320px] overflow-auto z-20"
        onWheel={(e) => e.stopPropagation()}
      >
        {hasResults ? (
          <ul className="py-1">
            {results.map((f) => (
              <li key={f.id}>
                <button
                  className="w-full text-left flex items-center gap-3 p-3 hover:bg-[rgba(255,0,229,0.05)] transition"
                  onClick={() => {
                    setActiveCategory(f.category);
                    setExpandedId(f.id);
                    router.push("#faq");
                    setSearchTerm("");   // limpia input
                    setOpen(false);      // cierra dropdown
                  }}
                >
                  <FaQuestion className="text-[var(--cp-cyan)] shrink-0" />
                  <span className="font-semibold">{f.question}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center">
            <p className="cp-paragraph text-base text-gray-300">
              No hay preguntas semejantes.
            </p>
            <a
              href="/contacto"
              className="inline-block mt-2 cp-button px-4 py-2 rounded-lg font-bold"
              onClick={() => setOpen(false)}
            >
              Contacte directamente a soporte
            </a>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(dropdown, document.body);
}
