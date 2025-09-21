import {HeaderProps, CategoryProps, FooterProps} from '@/types/home.types'

export const headerData: HeaderProps = [
  {label: "Inicio", href: "/"},
  { label: "Destacados", href: "/#fullgame" },
  { label: "Categorias", href: "/#category" },
  { label: "Catalogo", href: "/catalogo/"},
  { label: "Ayuda", href: "/help" },
]

export const categoriesData: CategoryProps = [
  { 
    id: 1, 
    name: "Acción", 
    image: "/assets/categories/shooter.jpeg", 
    slug:"accion" 
  },
  { 
    id: 2, 
    name: "Aventura", 
    image: "/assets/categories/aventura.jpeg", 
    slug:"aventura" 
  },
  { 
    id: 3, 
    name: "RPG", 
    image: "/assets/categories/rpg.jpeg", 
    slug:"rpg" 
  },
  { 
    id: 4, 
    name: "Deportes", 
    image: "/assets/categories/deportes.jpeg", 
    slug:"deportes" 
  },
  { 
    id: 5, 
    name: "Estrategia", 
    image: "/assets/categories/estrategia.jpeg", 
    slug:"estrategia" 
  },
  { 
    id: 6, 
    name: "Moba", 
    image: "/assets/categories/moba.jpeg", 
    slug:"moba" 
  },
  /*{ 
    id: 6, 
    name: "MMORPG", 
    image: "/assets/categories/moba.jpeg", 
    slug:"moba" 
  },*/
  /*{ 
    id: 6, 
    name: "Terror", 
    image: "/assets/categories/moba.jpeg", 
    slug:"moba" 
  },*/
  /*{ 
    id: 6, 
    name: "Supervivencia", 
    image: "/assets/categories/moba.jpeg", 
    slug:"moba" 
  },*/
  /*{ 
    id: 6, 
    name: "Battle Royale", 
    image: "/assets/categories/moba.jpeg", 
    slug:"moba" 
  },*/
  /*{ 
    id: 6, 
    name: "Mobile", 
    image: "/assets/categories/moba.jpeg", 
    slug:"moba" 
  },*/
  /*{ 
    id: 6, 
    name: "Exploración", 
    image: "/assets/categories/moba.jpeg", 
    slug:"moba" 
  },*/
];

export const footerData: FooterProps = [
  {
    id: 1,
    title: "Enlaces",
    data: [
      {subtitle: "Inicio", link: "/"},
      {subtitle: "Catálogo", link: "/catalogo"},
      {subtitle: "Ofertas", link: "/ofertas"},
      {subtitle: "Novedades", link: "/novedades"},
    ]
  },
  {
    id: 2,
    title: "Soporte",
    data: [
      {subtitle: "Centro de ayuda", link: "/help"},
      {subtitle: "Eventos", link: "/events"},
      {subtitle: "Devoluciones", link: "/devoluciones"},
      {subtitle: "Contacto", link: "/support"},
    ]
  },
  {
    id: 3,
    title: "Legal",
    data: [
      {subtitle: "Términos", link: "/terminos"},
      {subtitle: "Privacidad", link: "/privacidad"},
      {subtitle: "Cookies", link: "/cookies"},
    ]
  }
]