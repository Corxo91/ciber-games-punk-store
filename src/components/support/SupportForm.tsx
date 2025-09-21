"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaBroom, FaBug, FaInfoCircle, FaPaperPlane } from "react-icons/fa";
import { categoryLabels, priorityLabels } from "@/data/support.data";


type TicketDraft = {
  email: string;
  subject: string;
  category: string;
  priority: string;
  message: string;
  orderId?: string;
  // honeypot
  website?: string;
};

// Helpers
const initialDraft: TicketDraft = {
  email: "",
  subject: "",
  category: "Seleccione categoría",
  priority: "Seleccione prioridad",
  message: "",
  orderId: "",
  website: "",
};

const required = (s: string) => s.trim().length > 0;
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export default function SupportForm() {
  const [draft, setDraft] = useState<TicketDraft>(initialDraft);
  const [submitting, setSubmitting] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  // Cargar/guardar borrador en localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("support:draft");
      if (raw) setDraft({ ...initialDraft, ...JSON.parse(raw) });
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("support:draft", JSON.stringify(draft));
    } catch {}
  }, [draft]);

  const disabled = useMemo(() => {
    return (
      !isEmail(draft.email) ||
      !required(draft.subject) ||
      !required(draft.message) ||
      submitting
    );
  }, [draft, submitting]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOkMsg(null); setErrMsg(null);

    // Honeypot
    if (draft.website && draft.website.trim().length > 0) {
      setErrMsg("Detección anti-spam: formulario inválido.");
      return;
    }

    if (disabled) return;

    try {
      setSubmitting(true);

      // Simular POST (a futuro: POST a /api/support o a tu backend)
      const ticket = {
        id: `ticket-${Date.now()}`,
        ...draft,
        createdAt: new Date().toISOString(),
      };
      // Persistimos localmente un histórico mínimo:
      const prev = JSON.parse(localStorage.getItem("support:tickets") || "[]");
      prev.unshift(ticket);
      localStorage.setItem("support:tickets", JSON.stringify(prev));

      setOkMsg("Ticket enviado. Te contactaremos por email. Revisa tu bandeja de entrada y spam.");
      setDraft(initialDraft);
      localStorage.removeItem("support:draft");
    } catch (err) {
      setErrMsg("No pudimos enviar el ticket ahora mismo. Intenta en un rato o escríbenos por redes.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setDraft(initialDraft);
    localStorage.removeItem("support:draft");
    setOkMsg(null);
    setErrMsg(null);
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="cp-card p-5 sm:p-6 max-w-3xl mx-auto"
    >
      {/* Tips inline */}
      <div className="mb-4 flex items-start gap-3 text-sm opacity-90">
        <FaInfoCircle className="mt-1 text-[var(--cp-cyan)]" />
        <p>
          Describa su interrogante <b>detalladamente</b> para agilizar la compresión y resolución por parte del equipo de soporte. Reduce <b>significativamente</b> el tiempo de resolución
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm mb-2">Correo</label>
          <input
            type="email"
            required
            value={draft.email}
            onChange={(e) => setDraft(d => ({ ...d, email: e.target.value }))}
            className="w-full rounded-lg bg-[rgba(10,10,15,0.8)] border border-[rgba(0,229,255,0.35)] px-4 py-3 outline-none focus:border-[rgba(0,229,255,0.7)]"
            placeholder="tu@correo.com"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm mb-2">Asunto</label>
          <input
            type="text"
            required
            value={draft.subject}
            onChange={(e) => setDraft(d => ({ ...d, subject: e.target.value }))}
            className="w-full rounded-lg bg-[rgba(10,10,15,0.8)] border border-[rgba(0,229,255,0.35)] px-4 py-3 outline-none focus:border-[rgba(0,229,255,0.7)]"
            placeholder="Ej: Problema con entrega de clave"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Categoría</label>
          <select
            value={draft.category}
            onChange={(e) => setDraft(d => ({ ...d, category: e.target.value }))}
            className="w-full rounded-lg bg-[rgba(10,10,15,0.8)] border border-[rgba(0,229,255,0.35)] px-4 py-3 outline-none focus:border-[rgba(0,229,255,0.7)]"
          >
            {categoryLabels.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2">Prioridad</label>
          <select
            value={draft.priority}
            onChange={(e) => setDraft(d => ({ ...d, priority: e.target.value}))}
            className="w-full rounded-lg bg-[rgba(10,10,15,0.8)] border border-[rgba(0,229,255,0.35)] px-4 py-3 outline-none focus:border-[rgba(0,229,255,0.7)]"
          >
            {priorityLabels.map((pri) => (
              <option key={pri} value={pri}>
                {pri}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm mb-2">ID de pedido (opcional)</label>
          <input
            type="text"
            value={draft.orderId}
            onChange={(e) => setDraft(d => ({ ...d, orderId: e.target.value }))}
            className="w-full rounded-lg bg-[rgba(10,10,15,0.8)] border border-[rgba(0,229,255,0.35)] px-4 py-3 outline-none focus:border-[rgba(0,229,255,0.7)]"
            placeholder="WOLFS-123456"
          />
        </div>

        {/* Honeypot anti-spam */}
        <div className="hidden">
          <label>Website</label>
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={draft.website}
            onChange={(e) => setDraft(d => ({ ...d, website: e.target.value }))}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm mb-2">Descripción</label>
          <textarea
            required
            rows={6}
            value={draft.message}
            onChange={(e) => setDraft(d => ({ ...d, message: e.target.value }))}
            className="w-full rounded-lg bg-[rgba(10,10,15,0.8)] border border-[rgba(0,229,255,0.35)] px-4 py-3 outline-none focus:border-[rgba(0,229,255,0.7)]"
            placeholder="Cuéntanos exactamente qué pasa. Si es bug, agrega pasos para reproducir y entorno."
          />
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
        <button
          type="button"
          onClick={resetForm}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-[rgba(255,0,229,0.3)] hover:border-[var(--cp-magenta)] hover:bg-[rgba(255,0,229,0.06)] transition"
        >
          <FaBroom /> Limpiar
        </button>

        <div className="flex items-center gap-3">
          <span className="text-sm opacity-70 flex items-center gap-2">
            <FaBug className="text-[var(--cp-magenta)]" /> Anti-spam activo
          </span>
          <button
            type="submit"
            disabled={disabled}
            className={`cp-button inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold ${
              disabled ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            <FaPaperPlane />
            Enviar Ticket
          </button>
        </div>

        <div className="mb-4 flex items-start gap-3 text-sm opacity-90">
          <p>
            Puede contactarnos a <Link
              href="mailto:support@cibergames.com"
              className="text-[var(--cp-cyan)] underline"
            >
              support@cibergames.com
            </Link>
            
          </p>
        </div>
      </div>
      {/* Mensajes */}
      {okMsg && (
        <p className="mt-4 text-[var(--cp-cyan)] font-bold">{okMsg}</p>
      )}
      {errMsg && (
        <p className="mt-4 text-red-400 font-bold">{errMsg}</p>
      )}
    </motion.form>
  );
}
