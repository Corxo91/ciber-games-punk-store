"use client";

import { useCart } from "@/components/cart/CartProvider";
import { prefix } from "@/lib/prefix";
import { GamesProps as Game } from "@/types/home.types";
import Image from "next/image";
import Link from "next/link";


export default function GameCardFeatured({ game }: { game: Game }) {

  return (
    <article className="cp-card w-full mx-auto overflow-hidden h-[450px] sm:h-[460px] lg:h-[500px] flex flex-col md:max-w-[95vw] xl:max-w-[1200px] 2xl:max-w-[1400px]">
      <Link href={`/catalogo/${game.slug}`} className="block">
        <div className="relative h-40 sm:h-48 lg:h-56 w-full">
          <Image
            src={`${prefix}${game.image}`}
            alt={game.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-fill"
            priority={false}
          />
        </div>
      </Link>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <Link href={`/catalogo/${game.slug}`} className="block">
          {/* Título igual que Featured */}
          <h3 className="text-3xl sm:text-2xl font-bold text-center line-clamp-3 px-3">
            {game.title}
          </h3>
        </Link>

        <Link href={`/catalogo/${game.slug}`} className="block flex-1">
          {/* Descripción igual que Featured */}
          <p className="cp-paragraph mt-2 px-6 text-center text-xl line-clamp-3">
            {game.description}
          </p>
        </Link>

        <div className="mt-auto pt-4 flex gap-3 items-center justify-between">
          <Link href={`/catalogo/${game.slug}`} className="block">
            <span className="text-2xl font-bold text-[var(--cp-magenta)]">
              €{game.price.toFixed(2)}
            </span>
          </Link>

          <AddToCartButton
            item={{ id: game.id, title: game.title, price: game.price, image: game.image, slug: game.slug }}
          />
        </div>
      </div>
    </article>
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
