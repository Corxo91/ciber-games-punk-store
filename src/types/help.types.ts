// src/types/help.types.ts
export type Category =
  | "all"
  | "compras"
  | "pagos"
  | "entrega"
  | "devoluciones"
  | "compatibilidad"
  | "soporte";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: Exclude<Category, "all">;
}

export interface HelpCategory {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }>;
  color: string;    // CSS var o color tailwind
  gradient: string; // clases tailwind para bg-gradient
  category: Exclude<Category, "all">;
}
