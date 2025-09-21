// src/components/help/HelpContact.tsx
import Link from "next/link";
import { FaHeadset, FaCog, FaUser } from "react-icons/fa";

export default function HelpContact() {
  return (
    <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
      {/* Soporte directo */}
      <div className="cp-card bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
        <div className="p-8 text-center">
          <FaHeadset className="text-5xl text-[var(--cp-cyan)] mx-auto mb-6 cp-glow" />
          <h3 className="text-2xl font-bold mb-4">Soporte Directo</h3>
          <p className="cp-paragraph mb-6">
            Conecta con nuestro equipo de expertos para resolver cualquier problema específico.
          </p>
          <Link
            href="/support"
            className="cp-button inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-[var(--cp-cyan)] text-black font-bold hover:bg-[var(--cp-cyan)]/80 transition-all duration-300"
          >
            <FaUser />
            Contactar Soporte
          </Link>
        </div>
      </div>

      {/* Enlaces rápidos */}
      <div className="cp-card bg-gradient-to-br from-magenta-500/10 to-purple-500/10">
        <div className="p-8">
          <FaCog className="text-5xl text-[var(--cp-magenta)] mx-auto mb-6 cp-glow" />
          <h3 className="text-2xl font-bold mb-6 text-center">Enlaces Rápidos</h3>
          <nav className="space-y-3">
            {[
              { name: "Términos de Servicio", href: "/terminos" },
              { name: "Política de Privacidad", href: "/privacidad" },
              { name: "Política de Devoluciones", href: "/devoluciones" },
              { name: "Eventos y Promociones", href: "/events" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block p-3 rounded-lg border border-[rgba(255,0,229,0.3)] hover:border-[var(--cp-magenta)] hover:bg-[rgba(255,0,229,0.05)] transition-all duration-300 cp-paragraph"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
