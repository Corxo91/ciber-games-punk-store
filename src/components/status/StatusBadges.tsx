"use client";

import { motion } from "framer-motion";

const COMPONENTS = [
  { name: "Catálogo", status: "operativo" },
  { name: "Pagos", status: "operativo" },
  { name: "Entrega de Claves", status: "operativo" },
  { name: "Correo/Notifs", status: "degradado" },
  { name: "Carrito", status: "operativo" },
  { name: "CDN Imágenes", status: "operativo" },
] as const;

export default function StatusBadges() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {COMPONENTS.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, delay: i * 0.05 }}
          className="cp-card p-4 flex items-center justify-between"
        >
          <span className="font-bold">{c.name}</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-bold ${
              c.status === "operativo"
                ? "bg-[rgba(0,229,255,0.15)] text-[var(--cp-cyan)]"
                : "bg-[rgba(255,200,0,0.15)] text-yellow-300"
            }`}
          >
            {c.status.toUpperCase()}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
