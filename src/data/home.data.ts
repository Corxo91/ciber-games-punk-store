import {HeaderProps, gamesProps, CategoryProps, FooterProps} from '@/types/home.types'

export const headerData: HeaderProps = [
  {label: "Inicio", href: "/"},
  { label: "Destacados", href: "/#fullgame" },
  { label: "Categorias", href: "/#category" },
  { label: "Catalogo", href: "/"},
  { label: "Ayuda", href: "/" },
]

export const gamesData: gamesProps = [
  {
    id: 1,
    title: 'Cyberpunk 2077',
    description: 'Embárcate en el futuro distópico de Cyberpunk 2077, un RPG de acción y aventura en mundo abierto. Juegas como V, un mercenario que busca un implante único que te da la clave para la inmortalidad. La historia se desarrolla en Night City, una megalópolis obsesionada con el poder, el glamour y la modificación corporal.\n Explora este vasto mundo abierto, lleno de historias secundarias, actividades y personajes con los que interactuar. Con la libertad de personalizar a tu personaje, sus habilidades y tu estilo de juego, puedes abordar las misiones de diferentes maneras, ya sea a través de la fuerza bruta, el sigilo o la piratería. Cada decisión que tomes impactará la narrativa, llevándote a múltiples finales. En Cyberpunk 2077, el peligro y la acción te esperan en cada esquina.',
    image: '/assets/games-images/cyberpunk.jpeg',
    price: 59.99,
    slug:'cyberpunk-2077',
    category: ['Acción', 'Aventura', 'RPG'],
    images: [
      '/assets/games-images/cyberpunk1.jpeg',
      '/assets/games-images/cyberpunk2.jpeg',
      '/assets/games-images/cyberpunk3.jpeg',
      ]
    },
    {
      id: 2,
    title: 'FC 25',
    description: 'FC 25 marca una nueva era en el fútbol virtual. Construye el equipo de tus sueños con las estrellas del fútbol masculino y femenino, y compite en modos de juego innovadores como Ultimate Team. Con tecnologías de vanguardia como HyperMotionV, cada movimiento en el campo se siente más auténtico que nunca. El juego captura la esencia del deporte con animaciones realistas, jugadas estratégicas y la emoción de cada partido. Adéntrate en la experiencia más cercana a la de un partido real y define tu propia historia en el campo.',
    image: '/assets/games-images/fc25.jpeg',
    price: 49.99,
    slug:'fc25',
    category: ['Deportes'],
    images: [
      '/assets/games-images/fc251.jpeg',
      '/assets/games-images/fc252.jpeg',
      '/assets/games-images/fc253.jpeg',
      ]
  },
  {
    id: 3,
    title: 'Assassin\'s Creed Valhalla',
    description: 'Conviértete en Eivor, una legendaria asaltante vikinga que busca la gloria. Explora los misteriosos y brutales reinos de la Inglaterra del siglo IX en un vasto mundo abierto. Dirige a tu clan desde las gélidas orillas de Noruega hasta un nuevo hogar en el corazón de los reinos de Inglaterra. Lanza asaltos épicos contra fortalezas sajonas, saquea asentamientos y expande tu poder. Cada decisión que tomes influirá en el futuro de tu clan y de Inglaterra. Forja tu propia saga en Assassin\'s Creed Valhalla, un mundo de mitos y leyendas.',
    image: '/assets/games-images/acv.jpeg',
    price: 54.99,
    slug:'assassins-creed-valhalla',
    category: ['Acción', 'Aventura', 'RPG'],
    images: [
      '/assets/games-images/acv1.jpeg',
      '/assets/games-images/acv2.jpeg',
      '/assets/games-images/acv3.jpeg',
      ]
  },
  {
    id: 4,
    title: 'Elden Ring',
    description: 'Adéntrate en las Tierras Intermedias, un nuevo mundo de fantasía oscura creado por Hidetaka Miyazaki (creador de Dark Souls) y el aclamado autor George R. R. Martin. Como un Tarnished exiliado, te embarcarás en una épica búsqueda para convertirte en el Señor del Círculo de Elden. Explora vastos paisajes y laberínticas mazmorras, donde te esperan criaturas colosales y enemigos temibles. Utiliza un vasto arsenal de armas, habilidades mágicas y herramientas para enfrentarte a desafíos que pondrán a prueba tu ingenio y tu paciencia. Elden Ring es un RPG de acción profundo y desafiante que te invita a descubrir la grandeza de este mundo a tu propio ritmo.',
    image: '/assets/games-images/elden.jpeg',
    price: 71.99,
    slug:'elden-ring',
    category: ['Acción', 'Aventura', 'RPG'],
    images: [
      '/assets/games-images/elden1.jpeg',
      '/assets/games-images/elden2.jpeg',
      '/assets/games-images/elden3.jpeg',
      ]
  },
  {
    id: 5,
    title: 'Far Cry 6',
    description: 'Bienvenido a Yara, un paraíso tropical congelado en el tiempo. Juegas como Dani Rojas, un lugareño que se une a la lucha por la libertad contra el tirano dictador Antón Castillo. Explora junglas, playas y la capital de Yara, Esperanza, en un mundo abierto masivo y envolvente. Utiliza un arsenal de armas, vehículos y aliados de la fauna para unirte a la guerrilla y derrocar al régimen. En Far Cry 6, la revolución ha comenzado y depende de ti liberarla.',
    image: '/assets/games-images/fc6.jpeg',
    price: 34.99,
    slug:'far-cry-6',
    category: ['Acción', 'Aventura'],
    images: [
      '/assets/games-images/fc61.jpeg',
      '/assets/games-images/fc62.jpeg',
      '/assets/games-images/fc63.jpeg',
      ]
  },
  {
    id: 6,
    title: 'Red Dead Redemption II',
    description: 'Adéntrate en el salvaje oeste americano en Red Dead Redemption II. Juega como Arthur Morgan, un forajido y miembro de la banda de Dutch van der Linde. Explora un mundo abierto lleno de vida, donde cada decisión cuenta. Participa en tiroteos, caza, pesca y actividades del viejo oeste mientras intentas sobrevivir en un mundo que cambia rápidamente. La historia profunda y emocional de Red Dead Redemption II te llevará a través de la lealtad, la traición y la lucha por la supervivencia.',
    image: '/assets/games-images/rdr2.jpeg',
    price: 89.99,
    slug:'red-dead-redemption-2',
    category: ['Acción', 'Aventura', 'RPG'],
    images: [
      '/assets/games-images/rdr21.jpeg',
      '/assets/games-images/rdr22.jpeg',
      '/assets/games-images/rdr23.jpeg',
      ]
  },
  {
    id: 7,
    title: 'Sekiro: Shadows Die Twice',
    description: 'Adéntrate en un mundo de fantasía oscura y desafiante en Sekiro: Shadows Die Twice. Juega como un shinobi en busca de venganza en un Japón feudal lleno de peligros y enemigos formidables. Utiliza un sistema de combate preciso y estratégico que combina habilidades de sigilo, exploración y enfrentamientos épicos. Con una narrativa rica y un diseño de mundo interconectado, Sekiro ofrece una experiencia única que desafiará tus habilidades y te sumergirá en su atmósfera cautivadora.',
    image: '/assets/games-images/sekiro.jpeg',
    price: 51.99,
    slug:'sekiro-shadows-die-twice',
    category: ['Acción', 'Aventura', 'RPG'],
    images: [
      '/assets/games-images/sekiro1.jpeg',
      '/assets/games-images/sekiro2.jpeg',
      '/assets/games-images/sekiro3.jpeg',
      ]
  }
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
      {subtitle: "Contacto", link: "/contacto"},
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