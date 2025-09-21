"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/container/Container";
import { FaHeadset, FaShieldAlt } from "react-icons/fa";

export default function SupportHero() {
  return (
    <section className="relative py-14 sm:py-18 lg:py-20 overflow-hidden">
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
          <div className="flex items-center justify-center gap-4 mb-4">
            <FaHeadset className="text-4xl text-[var(--cp-cyan)] cp-glow" />
            <FaShieldAlt className="text-4xl text-[var(--cp-magenta)] cp-glow" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold cp-glow">Soporte Técnico</h1>
          <p className="cp-paragraph text-xl sm:text-2xl max-w-3xl mx-auto mt-2">
            Resolvemos rápido. Seguridad primero. Dilo sin pena y con logs si tienes.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
