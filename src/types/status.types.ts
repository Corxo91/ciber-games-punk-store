export type Incident = {
  id: string;
  status: "abierto" | "monitorizando" | "resuelto";
  title: string;
  startedAt: string;         
  resolvedAt?: string;      
  impact: "bajo" | "menor" | "medio" | "alto";
  notes: string[];
};

export type UptimeEntry = {
  day: string;    
  uptime: number;
  incidents: number;
};

export type ResponseEntry = {
  hour: string;  
  p95: number;   
  p50: number;   
};