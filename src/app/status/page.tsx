"use client";

import Container from "@/components/ui/container/Container";
import NeonTitle from "@/components/ui/neonTitle/NeonTitle";
import Reveal from "@/components/ui/reveal/Reveal";
import StatusHero from "@/components/status/StatusHero";
import StatusBadges from "@/components/status/StatusBadges";
import StatusWidget from "@/components/status/StatusWidget";
import { incidentsData } from "@/data/status.data";
import { useMemo, useState } from "react";
import IncidentItem from "@/components/status/IncidentItem";
import StatusCharts from "@/components/status/StatusCharts";


// Mock de incidentes (luego lo cableamos a una API real)
export default function StatusPage() {
  const [filter, setFilter] = useState<"todos"|"abiertos"|"resueltos">("todos");

  const stats = useMemo(() => {
    const open = incidentsData.filter(i => i.status !== "resuelto").length;
    const resolved = incidentsData.filter(i => i.status === "resuelto").length;
    return { open, resolved, total: incidentsData.length };
  }, []);

  const items = useMemo(() => {
    if (filter === "abiertos") return incidentsData.filter(i => i.status !== "resuelto");
    if (filter === "resueltos") return incidentsData.filter(i => i.status === "resuelto");
    return incidentsData;
  }, [filter]);

  return (
    <main className="pt-24 min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#151521] to-[#0a0a0f]">
      <StatusHero />

      <section className="py-8 border-b border-[rgba(0,229,255,0.2)]">
        <Container>
          <Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              <StatusWidget
                label="Estado General"
                value={stats.open === 0 ? "Operativo" : "Parcial"}
                tone={stats.open === 0 ? "ok" : "warn"}
              />
              <StatusWidget label="Incidentes Abiertos" value={String(stats.open)} tone={stats.open === 0 ? "ok" : "warn"} />
              <StatusWidget label="Incidentes Resueltos" value={String(stats.resolved)} tone="info" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <Reveal>
            <NeonTitle className="text-center mb-8">Componentes del Sistema</NeonTitle>
          </Reveal>
          <StatusBadges />
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container>
          <Reveal>
            <NeonTitle className="text-center mb-8">Tendencias</NeonTitle>
          </Reveal>
          <StatusCharts />
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <NeonTitle className="!mb-0">Historial de Incidentes</NeonTitle>
            <div className="flex gap-2">
              {(["todos","abiertos","resueltos"] as const).map(k => (
                <button
                  key={k}
                  onClick={() => setFilter(k)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    filter===k
                      ? "bg-[var(--cp-cyan)] text-black cp-glow"
                      : "bg-[rgba(10,10,15,0.6)] text-white border border-[rgba(0,229,255,0.3)] hover:border-[var(--cp-cyan)]"
                  }`}
                >
                  {k.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {items.map((inc) => (
              <IncidentItem key={inc.id} incident={inc} />
            ))}
            {items.length === 0 && (
              <p className="cp-paragraph text-center text-xl opacity-80">
                Sin incidentes con ese filtro. Todo chill.
              </p>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
