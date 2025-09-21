// src/components/ui/status/StatusIndicator.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// Simulación sencilla; luego se conecta a /estado o a un JSON remoto
type S = "ok" | "warn" | "down";

export default function StatusIndicator() {
  const [status, setStatus] = useState<S>("ok");

  useEffect(() => {
    // Aquí podrías hacer un fetch a un endpoint y setear status real
    const t = setTimeout(() => setStatus("ok"), 300);
    return () => clearTimeout(t);
  }, []);

  const label = status === "ok" ? "Online" : status === "warn" ? "Inestable" : "Caído";
  const color =
    status === "ok" ? "bg-[var(--cp-lime)] shadow-[0_0_14px_rgba(0,255,170,0.7)]" :
    status === "warn" ? "bg-yellow-400 shadow-[0_0_14px_rgba(250,204,21,0.7)]" :
    "bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.7)]";

  return (
    <Link href="/status" className="inline-flex items-center gap-3 px-4 py-2 rounded-lg border border-[rgba(0,229,255,0.25)] bg-[rgba(10,10,15,0.6)]">
      <span className={`h-3 w-3 rounded-full animate-pulse ${color}`} />
      <span className="text-xs tracking-wider uppercase">{label}</span>
    </Link>
  );
}
