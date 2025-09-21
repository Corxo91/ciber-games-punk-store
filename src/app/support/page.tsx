"use client";

import Container from "@/components/ui/container/Container";
import NeonTitle from "@/components/ui/neonTitle/NeonTitle";
import Reveal from "@/components/ui/reveal/Reveal";
import SupportHero from "@/components/support/SupportHero";
import SupportForm from "@/components/support/SupportForm";

export default function ContactPage() {
  return (
    <main className="pt-24 min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#151521] to-[#0a0a0f]">
      <SupportHero />

      <section className="py-12 sm:py-16">
        <Container>
          <Reveal>
            <NeonTitle className="text-center mb-10">Abrir Ticket</NeonTitle>
          </Reveal>
          <SupportForm />
        </Container>
      </section>
    </main>
  );
}