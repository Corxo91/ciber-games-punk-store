"use client";
import { useMemo, useState } from "react";
import { gamesData } from "@/data/home.data";

export function useGameSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return gamesData.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.category.some((c) => c.toLowerCase().includes(q))
    );
  }, [query]);
  return { query, setQuery, results };
}
