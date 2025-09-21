// src/components/help/HelpCategories.tsx
"use client";

import { helpCategories } from "@/data/help.data";
import { staggerContainer } from "@/lib/motion";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/reveal/Reveal";
import { useHelp } from "./HelpContext";
import { useRouter } from "next/navigation";

export default function HelpCategories() {
  const { setActiveCategory } = useHelp();
  const router = useRouter();

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {helpCategories.map((c) => (
        <Reveal key={c.id}>
          <button
            onClick={() => {
              setActiveCategory(c.category);
              router.push("#faq");
            }}
            className={`w-full cp-card group cursor-pointer bg-gradient-to-br ${c.gradient} hover:border-[${c.color}] transition-all duration-500 variants={slideIn("up")}`}
          >
            <div className="p-6 text-center">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500" />
                <c.icon
                  className="relative z-10 text-5xl mx-auto mb-4 transition-all duration-500 group-hover:scale-110"
                  style={{ color: c.color }}
                />
              </div>
              <h3 className="text-xl font-bold mb-3 cp-glow">{c.title}</h3>
              <p className="cp-paragraph text-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                {c.description}
              </p>
            </div>
          </button>
        </Reveal>
      ))}
    </motion.div>
  );
}
