"use client";
import { motion, useInView } from "framer-motion";
import { PropsWithChildren, useRef } from "react";
import { fadeInUp } from "@/lib/motion";

type Props = PropsWithChildren<{ delay?: number; className?: string }>;

export default function Reveal({ children, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeInUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay, duration: .5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
