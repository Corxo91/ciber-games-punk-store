import Container from "@/components/Ui/Container/Container";
import { footerData } from "@/data/home.data";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="mt-24 border-t border-[rgba(0,229,255,0.15)] bg-[rgba(10,10,15,0.7)]">
      <Container className="grid gap-8 py-12  sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-5xl font-bold">Wolfs Store</h3>
          <p className="cp-paragraph mt-3 text-2xl">
            Tu tienda de confianza para los mejores videojuegos. Envíos rápidos, soporte de primera.
          </p>
        </div>
        {footerData.map(({ id, title, data }) => (
          <div key={id}>
            <h4 className="text-2xl font-bold">{title}</h4>
            <ul className="mt-3 space-y-2 text-lg">
              {data.map(({ subtitle, link }) => (
                <li key={link}>
                  <Link href={link} className="hover:text-[var(--cp-lime)]">
                    {subtitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-[rgba(0,229,255,0.1)] py-6 text-center text-sm text-[var(--cp-fg)]/70">
        © {new Date().getFullYear()} Wolfs Store. Todos los derechos reservados.
      </div>
    </footer>
  );
}
