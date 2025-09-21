// src/components/help/HelpContext.tsx
"use client";

import { createContext, useContext, useMemo, useState } from "react";

type Category = "all" | "compras" | "pagos" | "entrega" | "devoluciones" | "compatibilidad" | "soporte";

type HelpState = {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  activeCategory: Category;
  setActiveCategory: (c: Category) => void;
  expandedId: number | null;
  setExpandedId: (id: number | null) => void;
};

const Ctx = createContext<HelpState | null>(null);

export function HelpProvider({ children }: { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const value = useMemo(
    () => ({ searchTerm, setSearchTerm, activeCategory, setActiveCategory, expandedId, setExpandedId }),
    [searchTerm, activeCategory, expandedId]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useHelp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useHelp debe usarse dentro de HelpProvider");
  return ctx;
}
