import Container from "@/components/Ui/Container/Container";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="mt-24 border-t border-[rgba(0,229,255,0.15)] bg-[rgba(10,10,15,0.7)]">
      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-xl font-bold degradedBlue">GameStore</h3>
          <p className="cp-paragraph mt-3">
            Tu tienda de confianza para los mejores videojuegos. Envíos rápidos, soporte de primera.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold">Enlaces</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/" className="hover:text-[var(--cp-lime)]">Inicio</Link></li>
            <li><Link href="/catalogo" className="hover:text-[var(--cp-lime)]">Catálogo</Link></li>
            <li><Link href="/ofertas" className="hover:text-[var(--cp-lime)]">Ofertas</Link></li>
            <li><Link href="/novedades" className="hover:text-[var(--cp-lime)]">Novedades</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold">Soporte</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/ayuda" className="hover:text-[var(--cp-lime)]">Centro de ayuda</Link></li>
            <li><Link href="/envios" className="hover:text-[var(--cp-lime)]">Envíos</Link></li>
            <li><Link href="/devoluciones" className="hover:text-[var(--cp-lime)]">Devoluciones</Link></li>
            <li><Link href="/contacto" className="hover:text-[var(--cp-lime)]">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/terminos" className="hover:text-[var(--cp-lime)]">Términos</Link></li>
            <li><Link href="/privacidad" className="hover:text-[var(--cp-lime)]">Privacidad</Link></li>
            <li><Link href="/cookies" className="hover:text-[var(--cp-lime)]">Cookies</Link></li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-[rgba(0,229,255,0.1)] py-6 text-center text-xs text-[var(--cp-fg)]/70">
        © {new Date().getFullYear()} GameStore. Todos los derechos reservados.
      </div>
    </footer>
  );
}
