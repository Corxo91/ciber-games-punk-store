// src/components/help/fuzzy.ts
export function normalize(s: string) {
  return (s ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function tokenize(s: string): string[] {
  return normalize(s).split(/[^a-z0-9]+/g).filter((t) => t.length > 1);
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  ) as number[][];
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[a.length][b.length];
}

function tokenHits(token: string, hayTokens: string[]): boolean {
  for (const w of hayTokens) {
    if (w.includes(token) || token.includes(w)) return true;
    if (w.startsWith(token) || w.endsWith(token)) return true;
    if (token.length >= 4 && w.length >= 4 && levenshtein(token, w) <= 1) return true;
  }
  return false;
}

export function fuzzyMatch(query: string, base: string): boolean {
  const qTokens = tokenize(query);
  if (qTokens.length === 0) return true;
  const hayTokens = tokenize(base);
  if (hayTokens.length === 0) return false;

  let matched = 0;
  for (const t of qTokens) {
    if (tokenHits(t, hayTokens)) matched++;
  }
  return matched / qTokens.length >= 0.6; // umbral 60%
}
