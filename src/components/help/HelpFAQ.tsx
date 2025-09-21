// src/components/help/HelpFAQ.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import { FaChevronDown, FaQuestion, FaStar } from "react-icons/fa";
import { faqData } from "@/data/help.data";
import { useHelp } from "./HelpContext";
import type { FAQItem } from "@/types/help.types";
import { fuzzyMatch, normalize } from "@/lib/fuzzy";

const ease = cubicBezier(0.2, 0.65, 0.3, 0.9);

export default function HelpFAQ() {
  const { searchTerm, activeCategory, setActiveCategory, expandedId, setExpandedId } = useHelp();
  const [expanded, setExpanded] = useState<number | null>(null);

  // Sincroniza petición externa (desde sugerencias) para abrir un ítem
  useEffect(() => {
    if (expandedId != null) {
      setExpanded(expandedId);
      // opcional: limpiar el expandedId para futuras interacciones
      // setExpandedId(null);
    }
  }, [expandedId]);

  const filtered: FAQItem[] = useMemo(() => {
    const list = faqData.filter((f) => activeCategory === "all" || f.category === activeCategory);
    const term = normalize(searchTerm);
    if (!term) return list;
    return list.filter((f) => fuzzyMatch(term, `${f.question} ${f.answer}`));
  }, [searchTerm, activeCategory]);

  const categories = ["all", "compras", "pagos", "entrega", "devoluciones", "compatibilidad", "soporte"] as const;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Filtro por categoría */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === c
                ? "bg-[var(--cp-cyan)] text-black cp-glow"
                : "bg-[rgba(10,10,15,0.6)] text-white border border-[rgba(0,229,255,0.3)] hover:border-[var(--cp-cyan)]"
            }`}
            aria-pressed={activeCategory === c}
          >
            {c === "all" ? "Todas" : c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {/* Lista FAQ */}
      <div className="space-y-4">
        <AnimatePresence>
          {filtered.map((faq) => {
            const isOpen = expanded === faq.id;
            return (
              <motion.article
                key={faq.id}
                layout
                initial={{ opacity: 0, y: 20, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22, ease } }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.18, ease } }}
                className="cp-card overflow-hidden"
              >
                <button
                  onClick={() => {
                    const next = isOpen ? null : faq.id;
                    setExpanded(next);
                    setExpandedId(next); // mantener sincronía con contexto
                  }}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-[rgba(0,229,255,0.05)] transition-all duration-300"
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${faq.id}`}
                >
                  <div className="flex items-center gap-4">
                    <FaQuestion className="text-[var(--cp-cyan)] text-lg shrink-0" />
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease }}
                    className="text-[var(--cp-cyan)]"
                  >
                    <FaChevronDown />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-content-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1, transition: { duration: 0.22, ease } }}
                      exit={{ height: 0, opacity: 0, transition: { duration: 0.18, ease } }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-[rgba(0,229,255,0.2)]">
                        <div className="flex items-start gap-4 pt-4">
                          <FaStar className="text-[var(--cp-magenta)] text-sm mt-1 shrink-0" />
                          <p className="cp-paragraph text-gray-300">{faq.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="cp-paragraph text-center text-xl">
            Nada por aquí. Prueba con otras palabras clave o reduce los filtros.
          </p>
        )}
      </div>
    </div>
  );
}

