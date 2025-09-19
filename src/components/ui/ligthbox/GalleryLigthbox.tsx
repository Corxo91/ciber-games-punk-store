"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import { prefix } from "@/lib/prefix";

const ease = cubicBezier(0.2, 0.65, 0.3, 0.9);

export function GalleryLightbox({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  // ESC para cerrar
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  if (!images?.length) return null;

  return (
    <>
      {/* Full-bleed wrapper: ocupa ancho completo */}
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen mt-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <Swiper
            modules={[A11y, Keyboard]}
            keyboard={{ enabled: true }}
            spaceBetween={12}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 14 },
              1024: { slidesPerView: 5, spaceBetween: 16 },
              1440: { slidesPerView: 6, spaceBetween: 16 },
            }}
            className="!pb-4"
          >
            {images.map((src, i) => (
              <SwiperSlide key={src}>
                <button
                  className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-[rgba(0,229,255,0.25)] hover:border-[var(--cp-cyan)] transition"
                  onClick={() => { setIdx(i); setOpen(true); }}
                  aria-label={`Ver imagen ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt={`Imagen ${i + 1}`}
                    fill
                    className="object-fill"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-gradient-to-br from-[rgba(0,229,255,0.25)] via-[rgba(0,0,0,0.6)] to-[rgba(255,0,229,0.25)] backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.2, ease } }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15, ease } }}
              className="fixed inset-0 z-[85] grid place-items-center p-4"
              role="dialog"
              aria-label="Lightbox"
            >
              <div className="relative w-full max-w-5xl aspect-[16/9] rounded-2xl overflow-hidden border border-[rgba(0,229,255,0.35)] bg-black">
                <Image
                  key={images[idx]}
                  src={`${prefix}/${images[idx]}`}
                  alt={`Imagen ${idx + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
                {/* Controles */}
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-[rgba(10,10,15,0.6)] border border-[rgba(0,229,255,0.35)]"
                  onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length); }}
                  aria-label="Anterior"
                >
                  <FaChevronLeft />
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-[rgba(10,10,15,0.6)] border border-[rgba(0,229,255,0.35)]"
                  onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length); }}
                  aria-label="Siguiente"
                >
                  <FaChevronRight />
                </button>
                <button
                  className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-[rgba(10,10,15,0.7)] border border-[rgba(0,229,255,0.35)]"
                  onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                  aria-label="Cerrar"
                  title="Cerrar"
                >
                  <FaTimes />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
