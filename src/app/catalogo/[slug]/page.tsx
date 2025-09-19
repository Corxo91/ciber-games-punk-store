import { Categories } from "@/components/ui/badgets";
import Container from "@/components/ui/container/Container";
import { GalleryLightbox } from "@/components/ui/ligthbox";
import { gamesData } from "@/data/home.data";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartClient } from "./shared";
import { prefix } from "@/lib/prefix";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return gamesData.map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = gamesData.find(g => g.slug === params.slug);
  if (!game) return {};
  return {
    title: `${game.title} | Wolfs Store`,
    description: game.description,
  };
}

export default function GamePage({ params }: Props) {
  const game = gamesData.find(g => g.slug === params.slug);
  if (!game) notFound();

  return (
    <main className="pt-24 py-10">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Portada */}
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border border-[rgba(0,229,255,0.25)]">
            <Image src={`${prefix}/${game.image}`} alt={game.title} fill className="object-fill" />
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold cp-glow">{game.title}</h1>
            <Categories items={game.category} />

            <p className="cp-paragraph mt-4 text-xl sm:text-3xl">{game.description}</p>

            <div className="mt-6 flex items-center justify-end gap-6">
              <span className="text-5xl font-bold text-[var(--cp-magenta)]">€{game.price.toFixed(2)}</span>
              <AddToCartClient game={game} />
            </div>
          </div>
        </div>
      </Container>

      {/* Galería full-bleed con lightbox */}
      <GalleryLightbox images={game.images || []} />
    </main>
  );
}
