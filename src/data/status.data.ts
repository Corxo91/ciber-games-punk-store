import { Incident, UptimeEntry, ResponseEntry } from "@/types/status.types";

export const incidentsData: Incident[] = [
  {
    id: "inc-2025-09-18-1",
    status: "resuelto",
    title: "Retrasos en entrega de claves Steam",
    startedAt: "2025-09-18T10:20:00Z",
    resolvedAt: "2025-09-18T11:05:00Z",
    impact: "menor",
    notes: [
      "Se degradó un proveedor secundario de claves.",
      "Failover automático aplicado. Tiempos normalizados.",
    ],
  },
  {
    id: "inc-2025-09-15-1",
    status: "monitorizando",
    title: "Intermitencia en notificaciones de correo",
    startedAt: "2025-09-15T18:40:00Z",
    impact: "bajo",
    notes: [
      "SPF/DKIM ajustados. Seguimos trackeando tasas de rebote.",
    ],
  },
];

// === DATOS MOCK (cámbialos luego por API) ===
export const uptimeData: UptimeEntry[] = [
  { day: "Lun", uptime: 99.95, incidents: 0 },
  { day: "Mar", uptime: 99.92, incidents: 1 },
  { day: "Mié", uptime: 99.99, incidents: 0 },
  { day: "Jue", uptime: 99.80, incidents: 2 },
  { day: "Vie", uptime: 99.97, incidents: 0 },
  { day: "Sáb", uptime: 99.90, incidents: 1 },
  { day: "Dom", uptime: 100.0, incidents: 0 },
];

export const responseData: ResponseEntry[] = [
  { hour: "00h", p95: 210, p50: 90 },
  { hour: "04h", p95: 190, p50: 85 },
  { hour: "08h", p95: 320, p50: 110 },
  { hour: "12h", p95: 280, p50: 100 },
  { hour: "16h", p95: 340, p50: 120 },
  { hour: "20h", p95: 260, p50: 95  },
];
