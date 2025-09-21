// src/data/help.data.ts
import type { FAQItem, HelpCategory } from "@/types/help.types";
import {
  FaGamepad,
  FaShoppingCart,
  FaCreditCard,
  FaShippingFast,
  FaHeadset,
  FaShieldAlt,
} from "react-icons/fa";

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "¿Cómo puedo realizar un pedido?",
    answer:
      "Navega por nuestro catálogo, agrega al carrito y procede al checkout para completar tu orden digital.",
    category: "compras",
  },
  {
    id: 2,
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Tarjeta, PayPal y criptomonedas seleccionadas. Todas las transacciones usan cifrado TLS.",
    category: "pagos",
  },
  {
    id: 3,
    question: "¿Cuánto tarda la entrega digital?",
    answer:
      "Entrega inmediata tras confirmar el pago. Recibirás tu clave por correo.",
    category: "entrega",
  },
  {
    id: 4,
    question: "¿Puedo solicitar reembolso?",
    answer:
      "Sí, dentro de 14 días si la clave no fue canjeada ni hubo descarga del contenido.",
    category: "devoluciones",
  },
  {
    id: 5,
    question: "¿Los juegos funcionan en mi región?",
    answer:
      "Las claves son globales salvo se indique lo contrario en la descripción del producto.",
    category: "compatibilidad",
  },
  {
    id: 6,
    question: "¿Cómo contacto con soporte técnico?",
    answer:
      "Abre un ticket con captura del error y tu ID de pedido. Respondemos < 24h hábiles.",
    category: "soporte",
  },
];

export const helpCategories: HelpCategory[] = [
  {
    id: 1,
    title: "Catálogo de Juegos",
    description: "Explora nuestra colección de los mejores títulos",
    icon: FaGamepad,
    color: "var(--cp-cyan)",
    gradient: "from-cyan-500/20 to-blue-500/20",
    category: "compatibilidad",
  },
  {
    id: 2,
    title: "Proceso de Compra",
    description: "Guía paso a paso para adquirir tus juegos",
    icon: FaShoppingCart,
    color: "var(--cp-magenta)",
    gradient: "from-pink-500/20 to-purple-500/20",
    category: "compras",
  },
  {
    id: 3,
    title: "Métodos de Pago",
    description: "Opciones seguras y encriptadas",
    icon: FaCreditCard,
    color: "var(--cp-lime)",
    gradient: "from-green-500/20 to-emerald-500/20",
    category: "pagos",
  },
  {
    id: 4,
    title: "Entrega Digital",
    description: "Claves al instante, sin demoras",
    icon: FaShippingFast,
    color: "var(--cp-yellow)",
    gradient: "from-yellow-500/20 to-orange-500/20",
    category: "entrega",
  },
  {
    id: 5,
    title: "Soporte Técnico",
    description: "Asistencia 24/7 por expertos",
    icon: FaHeadset,
    color: "var(--cp-cyan)",
    gradient: "from-blue-500/20 to-indigo-500/20",
    category: "soporte",
  },
  {
    id: 6,
    title: "Seguridad",
    description: "Protegemos tus datos",
    icon: FaShieldAlt,
    color: "var(--cp-magenta)",
    gradient: "from-red-500/20 to-pink-500/20",
    category: "compras",
  },
];
