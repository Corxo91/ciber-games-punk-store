"use client";

import Container from "@/components/ui/container/Container";
import { FaBolt, FaRocket } from "react-icons/fa";
import StatusIndicator from "@/components/ui/status/StatusIndicator";
import { motion } from "framer-motion";
import { staggerContainer, slideIn } from "@/lib/motion";

export default function HelpHero() {
  return (
    <section className="relative hero py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-magenta-500/5" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Container>
        <div className="text-center relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
            className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div variants={slideIn("up")}>
                <FaBolt className="text-4xl text-[var(--cp-cyan)] cp-glow animate-pulse" />
              </motion.div>
              <motion.h1 variants={slideIn("up")} className="!mb-0 cp-glow text-[2.2rem] sm:text-4xl lg:text-6xl font-bold">Centro de Ayuda Cyberpunk</motion.h1>
              <motion.div variants={slideIn("up")}>
                <FaRocket className="text-4xl text-[var(--cp-cyan)] cp-glow animate-pulse" />
              </motion.div>
            </div>
            
            <motion.p variants={slideIn("up")} className="cp-paragraph text-xl sm:text-2xl max-w-3xl mx-auto">
              Bienvenido al nexus de información donde resolvemos todas tus dudas sobre nuestra tienda de videojuegos del futuro.
              <span className="block mt-2 text-[var(--cp-cyan)]">¡Tu misión gaming comienza aquí!</span>
            </motion.p>
            
            {/* Widget de estado (enlace a /estado) */}
            <div className="mt-6 flex justify-center">
              <motion.div variants={slideIn("left")}>
                <StatusIndicator />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
