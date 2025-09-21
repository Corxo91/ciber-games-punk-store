// src/app/ayuda/page.tsx
import type { Metadata } from "next";
import Container from "@/components/ui/container/Container";
import NeonTitle from "@/components/ui/neonTitle/NeonTitle";
import Reveal from "@/components/ui/reveal/Reveal";
import HelpHero from "@/components/help/HelpHero";
import HelpSearch from "@/components/help/HelpSearch";
import HelpCategories from "@/components/help/HelpCategories";
import HelpFAQ from "@/components/help/HelpFAQ";
import HelpContact from "@/components/help/HelpContact";
import HelpCTA from "@/components/help/HelpCTA";
import { HelpProvider } from "@/components/help/HelpContext";

export const metadata: Metadata = {
  title: "Ayuda | Wolfs Store",
  description: "Centro de ayuda. FAQ, soporte técnico y contacto.",
};

export default function HelpPage() {
  return (
    <main className="pt-24 min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#151521] to-[#0a0a0f]">
      <HelpProvider>
        <HelpHero />

        {/* Buscador */}
        <section className="py-8 border-b border-[rgba(0,229,255,0.2)]">
          <Container>
            <Reveal>
              <HelpSearch />
            </Reveal>
          </Container>
        </section>

        {/* Categorías */}
        <section className="py-12 sm:py-16">
          <Container>
            <Reveal>
              <NeonTitle className="text-center mb-12">Categorías de Soporte</NeonTitle>
            </Reveal>
            <HelpCategories />
          </Container>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-12 sm:py-16 bg-[rgba(21,21,32,0.3)]">
          <Container>
            <Reveal>
              <NeonTitle className="text-center mb-12">Preguntas Frecuentes</NeonTitle>
            </Reveal>
            <HelpFAQ />
          </Container>
        </section>

        {/* Contacto */}
        <section className="py-12 sm:py-16">
          <Container>
            <Reveal>
              <NeonTitle className="text-center mb-12">¿Necesitas Más Ayuda?</NeonTitle>
            </Reveal>
            <HelpContact />
          </Container>
        </section>

        {/* CTA final */}
        <HelpCTA />
      </HelpProvider>
    </main>
  );
}
