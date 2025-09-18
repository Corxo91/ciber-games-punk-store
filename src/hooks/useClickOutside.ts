"use client";
import { useEffect } from "react";

export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  onClickOutside: () => void
) {
  useEffect(() => {
    function handler(e: MouseEvent | TouchEvent) {
      const el = ref.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) onClickOutside();
    }
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [ref, onClickOutside]);
}
