export type HeaderProps = {
  label: string,
  href: string
}[]

export type GamesProps = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  slug: string;
  category: string[];
  images?: string[];
  featured: boolean;
};


export type CategoryProps = { 
  id: number; 
  name: string; 
  image: string; 
  slug: string 
}[];

export type FooterProps = {
    id: number
    title: string
    data : {
      subtitle: string
      link: string
    }[]
}[];
