"use client";

import Image from "next/image";
import Container from "@/components/Ui/Container/Container";
import NeonTitle from "@/components/Ui/NeonTitle/NeonTitle";
import Reveal from "@/components/Ui/Reveal/Reveal";
import { featured } from "@/lib/data";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Featured() {
  return (
    <section className="py-12 sm:py-14 lg:py-16">
      <Container>
        <Reveal>
          <div id="fullgame"></div>
          <NeonTitle className="mb-6 sm:mb-8 lg:mb-10" >Juegos Destacados</NeonTitle>
        </Reveal>

        <Reveal>
          {/* wrapper más ancho para que entren 4–5 cartas sin cambiar su tamaño */}
          <div className="w-full mx-auto px-4 sm:px-6 md:px-2 lg:px-8">
            <Swiper
              modules={[Navigation, Pagination, A11y, Keyboard]}
              navigation
              pagination={{ clickable: true }}
              keyboard={{ enabled: true }}
              spaceBetween={14}
              centeredSlides={false}
              breakpoints={{
                0:    { slidesPerView: 1, spaceBetween: 12 },
                640:  { slidesPerView: 2, spaceBetween: 14 }, // móvil grande / tablet chica
                1024: { slidesPerView: 3, spaceBetween: 16 },
                1280: {slidesPerView: 3, spaceBetween: 16} ,
                1440: {slidesPerView: 4, spaceBetween: 16},
                1920: { slidesPerView: 5, spaceBetween: 16 }, // desktop ancho → 5 cartas
              }}
              className="!pb-10 "
              loop={true}
            >
              {featured.map((p) => (
                <SwiperSlide key={p.id} className="!h-auto">
                  {/* Carta con alto fijo (no tocamos tamaño) */}
                  <article className="cp-card overflow-hidden h-[420px] sm:h-[460px] lg:h-[500px] flex flex-col">
                    {/* Imagen fija en altura */}
                    <div className="relative h-40 sm:h-48 lg:h-56 w-full">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMScgaGVpZ2h0PScxJy8+"
                      />
                    </div>

                    {/* Contenido con clamp y footer al fondo */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <h3 className="text-3xl line-clamp-3 sm:text-2xl px-3 font-bold text-center">{p.title}</h3>

                      {/* Máximo 4 líneas + ellipsis */}
                      <p className="cp-paragraph mt-2 px-6 text-center text-xl line-clamp-3">
                        {p.desc}
                      </p>

                      <div className="mt-auto pt-4 flex gap-3 items-center justify-between">
                        <span className="text-2xl font-bold text-[var(--cp-magenta)]">
                          {p.price}
                        </span>
                        <button className="cp-button px-2 sm:px-2 py-2 rounded-lg text-md  font-bold">
                          Al carrito
                        </button>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
