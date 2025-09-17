import Categories from "@/components/Home/Categorias/Categorias";
import Featured from "@/components/Home/Feature/Feature";
import Hero from "@/components/Home/Hero/Hero";

export default function Page() {
  return (
    <main>
      <Hero />
      <Featured />
      <Categories />
    </main>
  );
}