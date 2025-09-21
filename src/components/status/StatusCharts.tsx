"use client";

import { responseData, uptimeData } from "@/data/status.data";
import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const palette = {
  grid: "rgba(0,229,255,0.12)",
  axis: "rgba(255,255,255,0.7)",
  cyan: "var(--cp-cyan)",
  magenta: "var(--cp-magenta)",
  lime: "var(--cp-lime)",
  text: "#ffffff",
};

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="cp-card p-4 sm:p-6"
    >
      <div className="mb-4">
        <h3 className="text-xl sm:text-2xl font-bold">{title}</h3>
        {subtitle && <p className="cp-paragraph opacity-80">{subtitle}</p>}
      </div>
      <div className="h-[260px] sm:h-[320px]">
        {children}
      </div>
    </motion.div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-[rgba(0,229,255,0.25)] bg-[rgba(10,10,15,0.95)] p-3 shadow-[0_0_20px_rgba(255,0,229,0.2)]">
      <p className="text-sm font-bold">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-sm">
          <span style={{ color: p.color }} className="font-semibold">{p.dataKey}</span>: {p.value}
          {p.dataKey.includes("uptime") && "%"}
          {p.dataKey.includes("p") && " ms"}
        </p>
      ))}
    </div>
  );
}

export default function StatusCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Línea: Uptime vs Incidentes */}
      <Card title="Uptime semanal" subtitle="Meta ≥ 99.9%. Incidentes registrados por día">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={uptimeData} margin={{ top: 10, right: 12, bottom: 0, left: -16 }}>
            <CartesianGrid stroke={palette.grid} strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke={palette.axis} />
            <YAxis
              yAxisId="left"
              domain={[99.7, 100]}
              tickFormatter={(v) => `${v}%`}
              stroke={palette.axis}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              allowDecimals={false}
              width={30}
              stroke={palette.axis}
            />
            <Tooltip content={<CustomTooltip active={true} payload={uptimeData} label={<span>Uptime semanal</span>} />} />
            <Legend />
            <ReferenceLine yAxisId="left" y={99.9} stroke={palette.lime} strokeDasharray="4 4" />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="uptime"
              stroke={palette.cyan}
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
              name="uptime"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="incidents"
              stroke={palette.magenta}
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
              name="incidents"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Barras: P95/P50 response time (ms) */}
      <Card title="Latencia (p50 / p95)" subtitle="Tiempo de respuesta del core (ms)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={responseData} margin={{ top: 10, right: 12, bottom: 0, left: -16 }}>
            <CartesianGrid stroke={palette.grid} strokeDasharray="3 3" />
            <XAxis dataKey="hour" stroke={palette.axis} />
            <YAxis stroke={palette.axis} />
            <Tooltip content={<CustomTooltip active={true} payload={responseData} label={<span>Latencia (p50 / p95)</span>} />} />
            <Legend />
            <Bar dataKey="p50" fill={palette.cyan} name="p50" radius={[6, 6, 0, 0]} />
            <Bar dataKey="p95" fill={palette.magenta} name="p95" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
