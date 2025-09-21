"use client";

import { motion } from "framer-motion";
import { Incident } from "@/types/status.types";

export default function IncidentItem({ incident }: { incident: Incident }) {
  const tone =
    incident.status === "resuelto"
      ? "border-[rgba(0,229,255,0.3)]"
      : incident.status === "monitorizando"
      ? "border-[rgba(255,0,229,0.3)]"
      : "border-[rgba(255,200,0,0.35)]";

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      className={`cp-card overflow-hidden border ${tone}`}
    >
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl sm:text-2xl font-bold">{incident.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            incident.status === "resuelto"
              ? "bg-[rgba(0,229,255,0.15)] text-[var(--cp-cyan)]"
              : incident.status === "monitorizando"
              ? "bg-[rgba(255,0,229,0.15)] text-[var(--cp-magenta)]"
              : "bg-[rgba(255,200,0,0.15)] text-yellow-300"
          }`}>
            {incident.status.toUpperCase()}
          </span>
        </div>

        <div className="mt-3 grid gap-2 text-sm opacity-80">
          <p>
            <b>Inicio:</b>{" "}
            {new Date(incident.startedAt).toLocaleString("es-ES")}
          </p>
          {incident.resolvedAt && (
            <p>
              <b>Resuelto:</b>{" "}
              {new Date(incident.resolvedAt).toLocaleString("es-ES")}
            </p>
          )}
          <p><b>Impacto:</b> {incident.impact.toUpperCase()}</p>
        </div>

        <ul className="mt-4 list-disc pl-5 space-y-1 text-sm">
          {incident.notes.map((n, idx) => <li key={idx}>{n}</li>)}
        </ul>
      </div>
    </motion.article>
  );
}
