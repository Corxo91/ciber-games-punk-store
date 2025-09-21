// src/components/help/HelpCTA.tsx
import Container from "@/components/ui/container/Container";
import Link from "next/link";
import { FaBolt, FaGamepad } from "react-icons/fa";

export default function HelpCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-[rgba(0,229,255,0.1)] via-transparent to-[rgba(255,0,229,0.1)]">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 cp-glow">
            ¿Listo para sumergirte en el futuro del gaming?
          </h2>
          <p className="cp-paragraph text-xl mb-8 max-w-2xl mx-auto">
            Explora nuestro catálogo cyberpunk y descubre los mejores juegos del universo digital.
          </p>
          <Link
            href="/catalogo"
            className="cp-button inline-flex items-center gap-3 px-8 py-4 text-lg font-bold bg-gradient-to-r from-[var(--cp-cyan)] to-[var(--cp-magenta)] text-black rounded-xl hover:scale-105 transition-all duration-300"
          >
            <FaGamepad />
            Explorar Catálogo
            <FaBolt />
          </Link>
        </div>
      </Container>
    </section>
  );
}
