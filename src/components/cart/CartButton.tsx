"use client";

import { useCart } from "@/components/cart/CartProvider";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function CartButton() {
  const { count, isOpen, setOpen } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative">
      <button
        aria-label="Carrito"
        onClick={() => setOpen(!isOpen)}
        className={[
          "grid place-items-center h-10 w-10 rounded-lg border border-[rgba(0,229,255,0.35)] bg-[rgba(10,10,15,0.6)] active:scale-95 transition text-[var(--cp-cyan)]",
          "md:h-auto md:w-auto md:rounded-none md:border-0 md:bg-transparent md:active:scale-100"
        ].join(" ")}
      >
        <FaShoppingCart className="cp-glow text-xl md:text-2xl" />
        {mounted && count > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 min-w-5 h-5 px-1 grid place-items-center rounded-full bg-[var(--cp-magenta)] text-[10px] font-bold"
          >
            {count}
          </motion.span>
        )}
      </button>
    </div>
  );
}
