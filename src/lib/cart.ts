import { CartItem } from './../types/general.types';

const KEY = "wolfstore:cart:v1";

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function total(items: CartItem[]) {
  return items.reduce((acc, it) => acc + it.price * it.qty, 0);
}