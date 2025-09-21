"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/container/Container";

export default function StatusHero() {
  return (
    <section className="relative hero py-14 sm:py-18 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-magenta-500/5" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl" />
      </div>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center relative z-10"
        >
          <motion.h1 className="!mb-2 text-[2.2rem] sm:text-4xl lg:text-6xl font-bold">Estado del Servicimotionio</motion.h1>
          <p className="cp-paragraph text-xl sm:text-2xl max-w-3xl mx-auto">
            Transparencia total. Aquí ves la salud de nuestros sistemas de entrega, pagos y notificaciones.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
