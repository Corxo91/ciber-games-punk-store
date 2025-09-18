"use client";
import { useCart } from "@/components/cart/CartProvider";

export function AddToCartClient({ game }: { game: { id: number; title: string; price: number; image: string; slug: string } }) {
  const { add } = useCart();
  return (
    <button
      className="cp-button px-2 py-2 rounded-lg text-xl sm:text-2xl font-semibold"
      onClick={() => add({ id: game.id, title: game.title, price: game.price, image: game.image, slug: game.slug })}
    >
      Añadir al carrito
    </button>
  );
}
