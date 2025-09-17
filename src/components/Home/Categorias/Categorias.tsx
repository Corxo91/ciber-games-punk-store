"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/Ui/Container/Container";
import { categories } from "@/lib/data";
import { staggerContainer } from "@/lib/motion";
import NeonTitle from "@/components/Ui/NeonTitle/NeonTitle";
import Reveal from "@/components/Ui/Reveal/Reveal";

export default function Categories() {
  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-[rgba(21,21,32,0.5)]">
      <Container>
        <div id="category"></div>
        <NeonTitle className="mb-6 sm:mb-8 lg:mb-10">Categorías</NeonTitle>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"

        >
          {categories.map((c) => (
            <Reveal key={c.id}>
              <div className="relative h-32 sm:h-40 w-full overflow-hidden rounded-xl border border-[rgba(0,229,255,0.25)]">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 sm:p-3">
                  <p className="font-bold uppercase tracking-wider text-xs sm:text-sm">{c.name}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
