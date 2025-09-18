"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type CartItem = {
  id: number;        // <-- NUMÉRICO
  title: string;
  price: number;
  image: string;
  qty: number;
  slug: string;
};

const KEY = "wolfstore:cart:v1";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}
function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
}

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  inc: (id: number) => void;
  dec: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());
  const [isOpen, setOpen] = useState(false);

  const setAndPersist = (updater: CartItem[] | ((prev: CartItem[]) => CartItem[])) => {
    setItems(prev => {
      const next = typeof updater === "function" ? (updater as (p: CartItem[]) => CartItem[])(prev) : updater;
      saveCart(next);
      return next;
    });
  };

  const add: CartCtx["add"] = useCallback((it, qty = 1) => {
    setAndPersist(prev => {
      const ix = prev.findIndex(p => p.id === it.id);
      if (ix >= 0) {
        const copy = [...prev];
        copy[ix] = { ...copy[ix], qty: copy[ix].qty + qty };
        return copy;
      }
      return [...prev, { ...it, qty }];
    });
    setOpen(true);
  }, []);

  const inc = useCallback((id: number) => {
    setAndPersist(prev => prev.map(p => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));
  }, []);
  const dec = useCallback((id: number) => {
    setAndPersist(prev => prev.map(p => (p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p)));
  }, []);
  const remove = useCallback((id: number) => {
    setAndPersist(prev => prev.filter(p => p.id !== id));
  }, []);
  const clear = useCallback(() => setAndPersist([]), []);

  const value = useMemo<CartCtx>(() => {
    const total = items.reduce((acc, it) => acc + it.price * it.qty, 0);
    const count = items.reduce((acc, it) => acc + it.qty, 0);
    return { items, count, total, add, inc, dec, remove, clear, isOpen, setOpen };
  }, [items, add, inc, dec, remove, clear, isOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
