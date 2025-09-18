import { GamesProps as Game } from "@/types/home.types";

export function normalize(str: string) {
  return str
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Filtra por término (título + categorías), categoría exacta y precio máximo.
 * Si maxPrice es undefined o NaN, no aplica filtro de precio.
 */
export function filterGames(
  games: Game[],
  term: string,
  category?: string,
  maxPrice?: number
): Game[] {
  const q = normalize(term.trim());
  const byCategory = (g: Game) => !category || g.category.includes(category);
  const byPrice = (g: Game) => (typeof maxPrice === "number" && !Number.isNaN(maxPrice)) ? g.price <= maxPrice : true;

  if (!q) {
    return games.filter((g) => byCategory(g) && byPrice(g));
  }
  
  return games.filter((g) => {
    if (!byCategory(g) || !byPrice(g)) return false;
    const haystack = `${g.title} ${g.category.join(" ")}`;
    return normalize(haystack).includes(q);
  });
}
