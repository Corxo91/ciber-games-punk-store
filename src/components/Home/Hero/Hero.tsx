"use client";
import { motion } from "framer-motion";
import Container from "@/components/Ui/Container/Container";
import { slideIn, staggerContainer } from "@/lib/motion";
import NeonButton from "@/components/Ui/NeonButton/NeonButton";

export default function Hero() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[65vh] lg:min-h-[70vh] grid place-items-center">
      <div className="hero pointer-events-none absolute inset-0 h-[500px]" />
      <Container className="flex flex-col justify-center relative z-10 py-20 sm:py-24 lg:py-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
          className="text-center"
        >
          <motion.h1 variants={slideIn("up")} className="cp-glow text-[2.2rem] sm:text-4xl lg:text-6xl font-bold">
            Tu portal de videojuegos
          </motion.h1>
          <motion.p variants={slideIn("up")} className="cp-paragraph mt-3 sm:mt-4 max-w-xl sm:max-w-2xl mx-auto text-2xl sm:text-2xl lg:text-3xl text-center">
            Descubre los mejores títulos al mejor precio. Entregas inmediatas y soporte top.
          </motion.p>
          <motion.div variants={slideIn("up")} className="mt-6 sm:mt-8">
            <NeonButton className="text-2xl">Explorar juegos</NeonButton>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
