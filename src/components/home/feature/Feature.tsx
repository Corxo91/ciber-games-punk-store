"use client";

import { useMemo } from "react"; // ← NUEVO
import { useCart } from "@/components/cart/CartProvider";
import Container from "@/components/ui/container/Container";
import NeonTitle from "@/components/ui/neonTitle/NeonTitle";
import Reveal from "@/components/ui/reveal/Reveal";
import { gamesData } from "@/data/home.data";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { prefix } from "@/lib/prefix";

export default function Featured() {
  // ← SOLO DESTACADOS
  const featuredGames = useMemo(() => gamesData.filter((g) => g.featured === true), []);

  return (
    <section className="py-12 sm:py-14 lg:py-16">
      <Container>
        <Reveal>
          <div id="fullgame"></div>
          <NeonTitle className="mb-6 sm:mb-8 lg:mb-10">Juegos Destacados</NeonTitle>
        </Reveal>

        <Reveal>
          <div className="w-full mx-auto md:max-w-[100vw] xl:max-w-[1200px] 2xl:max-w-[1600px]">
            <Swiper
              modules={[Navigation, Pagination, A11y, Keyboard]}
              navigation
              pagination={{ clickable: true }}
              keyboard={{ enabled: true }}
              spaceBetween={14}
              centeredSlides={false}
              breakpoints={{
                0:    { slidesPerView: 1, spaceBetween: 12 },
                640:  { slidesPerView: 2, spaceBetween: 14 },
                1024: { slidesPerView: 4, spaceBetween: 16 },
              }}
              className="!pb-10"
              loop
            >
              {featuredGames.map((p) => (  // ← AQUÍ EL CAMBIO
                <SwiperSlide key={p.id} className="!h-auto">
                  <article className="cp-card overflow-hidden h-[450px] sm:h-[460px] lg:h-[500px] flex flex-col">
                    <Link href={`/catalogo/${p.slug}`} className="block">
                      <div className="relative h-40 sm:h-48 lg:h-56 w-full">
                        <Image
                          src={`${prefix}/${p.image}`}
                          alt={p.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                          className="object-fill"
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMScgaGVpZ2h0PScxJy8+"
                        />
                      </div>
                    </Link>

                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <Link href={`/catalogo/${p.slug}`} className="block">
                        <h3 className="text-3xl line-clamp-3 sm:text-2xl px-3 font-bold text-center">{p.title}</h3>
                        <p className="cp-paragraph mt-2 px-6 text-center text-xl line-clamp-3">
                          {p.description}
                        </p>
                      </Link>

                      <div className="mt-auto pt-4 flex gap-3 items-center justify-between">
                        <Link href={`/catalogo/${p.slug}`} className="block">
                          <span className="text-2xl font-bold text-[var(--cp-magenta)]">
                            €{p.price.toFixed(2)}
                          </span>
                        </Link>

                        <AddToCartButton
                          item={{ id: p.id, title: p.title, price: p.price, image: p.image, slug: p.slug }}
                        />
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

function AddToCartButton({ item }: { item: { id: number; title: string; price: number; image: string; slug: string } }) {
  const { add } = useCart();
  return (
    <button
      className="cp-button px-2 sm:px-2 py-2 rounded-lg text-md font-bold"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); add(item, 1); }}
    >
      Al carrito
    </button>
  );
}
