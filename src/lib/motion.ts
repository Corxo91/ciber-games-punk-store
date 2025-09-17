import { Variants, cubicBezier } from "framer-motion";

export const easeCyber = cubicBezier(0.2, 0.65, 0.3, 0.9);

export const fadeInUp: Variants = {
  hidden: { y: 16, opacity: 0, filter: "blur(2px)" },
  show: { y: 0, opacity: 1, filter: "blur(0)", transition: { duration: 0.5, ease: easeCyber } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const slideIn = (dir: "left" | "right" | "up" | "down" = "up"): Variants => {
  const map = { left: { x: -24 }, right: { x: 24 }, up: { y: 24 }, down: { y: -24 } } as const;
  const axis = map[dir];
  return {
    hidden: { ...axis, opacity: 0, filter: "blur(4px)" },
    show: { x: 0, y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: easeCyber } },
  };
};
