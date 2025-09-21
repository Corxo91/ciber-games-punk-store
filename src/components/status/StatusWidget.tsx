"use client";

import { motion } from "framer-motion";

export default function StatusWidget({
  label,
  value,
  tone = "ok",
}: {
  label: string;
  value: string;
  tone?: "ok" | "warn" | "info";
}) {
  const border =
    tone === "ok"
      ? "border-[rgba(0,229,255,0.35)]"
      : tone === "warn"
      ? "border-[rgba(255,200,0,0.35)]"
      : "border-[rgba(255,0,229,0.35)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className={`cp-card border ${border}`}
    >
      <div className="p-6">
        <p className="uppercase tracking-widest text-sm opacity-70">{label}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
    </motion.div>
  );
}
