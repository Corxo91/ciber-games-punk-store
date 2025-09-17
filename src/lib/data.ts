export type Product = { id: string; title: string; desc: string; price: string; image: string; };
export type Category = { id: string; name: string; image: string; };

export const featured: Product[] = [
  {
    id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    desc: "Aventura futurista en mundo abierto.",
    price: "€59.99",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "fifa-23",
    title: "FIFA 23",
    desc: "Simulador de fútbol con los mejores equipos.",
    price: "€49.99",
    image: "https://images.unsplash.com/photo-1602673221577-0b56d7ce446b?auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "ac-valhalla",
    title: "Assassin's Creed: Valhalla",
    desc: "Acción épica en la era vikinga.",
    price: "€54.99",
    image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "elden-ring",
    title: "Elden Ring",
    desc: "RPG de mundo abierto brutal, FromSoftware style.",
    price: "€59.99",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1350&q=80",
  },
   {
    id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    desc: "Aventura futurista en mundo abierto.",
    price: "€59.99",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "fifa-23",
    title: "FIFA 23",
    desc: "Simulador de fútbol con los mejores equipos.",
    price: "€49.99",
    image: "https://images.unsplash.com/photo-1602673221577-0b56d7ce446b?auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "ac-valhalla",
    title: "Assassin's Creed: Valhalla",
    desc: "Acción épica en la era vikinga.",
    price: "€54.99",
    image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "elden-ring",
    title: "Elden Ring",
    desc: "RPG de mundo abierto brutal, FromSoftware style.",
    price: "€59.99",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1350&q=80",
  },
];

export const categories: Category[] = [
  { id: "accion", name: "Acción", image: "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=1350&q=80" },
  { id: "aventura", name: "Aventura", image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?auto=format&fit=crop&w=1350&q=80" },
  { id: "deportes", name: "Deportes", image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=1350&q=80" },
  { id: "rpg", name: "RPG", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1350&q=80" },
  { id: "estrategia", name: "Estrategia", image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1350&q=80" },
  { id: "moba", name: "Moba", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1350&q=80" },
];
