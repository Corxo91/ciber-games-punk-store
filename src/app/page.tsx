import Categories from "@/components/home/categorias/Categorias";
import Featured from "@/components/home/feature/Feature";
import Hero from "@/components/home/hero/Hero";

export default function Page() {
  return (
    <main>
      <Hero />
      <Featured />
      <Categories />
    </main>
  );
}