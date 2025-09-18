"use client";

import { useCart } from "@/components/Cart/CartProvider";
import { useClickOutside } from "@/hooks/useClickOutside";
import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { FaBroom, FaMinus, FaPlus, FaTimes, FaTrash } from "react-icons/fa";

const ease = cubicBezier(0.2, 0.65, 0.3, 0.9);

export default function CartDropdown() {
  const { items, inc, dec, remove, total, clear, isOpen, setOpen } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(panelRef, () => setOpen(false));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay para mobile/desktop: click para cerrar */}
          {/* Overlay para mobile/desktop: click para cerrar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[55] bg-gradient-to-br from-[rgba(0,229,255,0.25)] via-[rgba(0,0,0,0.6)] to-[rgba(255,0,229,0.25)] backdrop-blur-[2px]"
          />
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22, ease } }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)", transition: { duration: 0.18, ease } }}
            className={[
              "z-[60] max-h-[70vh] overflow-auto rounded-xl",
              "border border-[rgba(0,229,255,0.20)]",
              "bg-[rgba(10,10,15,0.92)] backdrop-blur-md shadow-[0_0_24px_rgba(0,229,255,0.25)]",
              "p-3 sm:p-4",
              "fixed md:absolute",
              "right-2 md:right-0",
              "top-[4.5rem] md:top-12",
              "w-[92vw] sm:w-[420px]",
            ].join(" ")}
            role="dialog"
            aria-label="Carrito"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-2xl font-bold">Tu carrito</h4>
              <button
                className="grid place-items-center h-8 w-8 rounded hover:text-[var(--cp-lime)]"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                title="Cerrar"
              >
                <FaTimes />
              </button>
            </div>

            {items.length === 0 ? (
              <p className="cp-paragraph text-xl">Carrito vacío.</p>
            ) : (
              <ul className="space-y-3">
                {items.map(it => (
                  <li key={it.id} className="flex gap-3 items-center">
                    <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded border border-[rgba(0,229,255,0.25)]">
                      <Image src={it.image} alt={it.title} fill className="object-fill" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xl font-semibold line-clamp-1">{it.title}</p>
                      <div className="mt-1 flex items-center gap-2 text-sm">
                        <button
                          className="grid place-items-center h-8 w-8 rounded border border-[rgba(0,229,255,0.4)] text-[var(--cp-cyan)]"
                          onClick={() => dec(it.id)}
                          aria-label="Disminuir"
                          title="Disminuir"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="text-xl">{it.qty}</span>
                        <button
                          className="grid place-items-center h-8 w-8 rounded border border-[rgba(0,229,255,0.4)] text-[var(--cp-cyan)]"
                          onClick={() => inc(it.id)}
                          aria-label="Aumentar"
                          title="Aumentar"
                        >
                          <FaPlus size={12} />
                        </button>
                        <span className="ml-auto font-bold text-2xl text-[var(--cp-magenta)]">
                          €{(it.price * it.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      className="grid place-items-center h-14 w-14 rounded hover:text-[var(--cp-lime)]"
                      onClick={() => remove(it.id)}
                      aria-label="Quitar"
                      title="Quitar"
                    >
                      <FaTrash size={20} />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 border-t border-[rgba(0,229,255,0.2)] pt-3 flex items-center justify-between">
              <button
                className="grid place-items-center h-14 w-14 rounded hover:text-[var(--cp-lime)]"
                onClick={clear}
                aria-label="Vaciar"
                title="Vaciar"
              >
                <FaBroom size={30}/>
              </button>
              <div className="flex items-center gap-3">
                <span className="font-bold text-2xl">Total: €{total.toFixed(2)}</span>
                <button className="cp-button px-3 py-2 rounded-lg font-bold text-xl">Pagar</button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
