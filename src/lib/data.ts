import { Wrench, Home, ShieldCheck, Store, Gem, CheckCircle, User, MapPin, Sparkles as SparklesIcon } from 'lucide-react';

export type ProjectCategory = 'portails' | 'barrieres' | 'rampes' | 'installations' | 'expositions';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  imageUrl: string;
  imageHint: string;
  featured: boolean;
  year: number;
  location: string;
}

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Portail "Élégance"',
    description: 'Un portail coulissant moderne avec des motifs découpés au laser.',
    category: 'portails',
    imageUrl: 'https://picsum.photos/600/400',
    imageHint: 'modern steel gate',
    featured: true,
    year: 2023,
    location: 'Douala',
  },
  {
    id: 'b1',
    title: 'Barrière de Sécurité "Rempart"',
    description: 'Barrière robuste pour une protection optimale de votre propriété.',
    category: 'barrieres',
    imageUrl: 'https://picsum.photos/600/400',
    imageHint: 'strong metal fence',
    featured: true,
    year: 2022,
    location: 'Yaoundé',
  },
  {
    id: 'r1',
    title: 'Rampe d\'escalier "Volute"',
    description: 'Design artistique et fluide pour un escalier intérieur.',
    category: 'rampes',
    imageUrl: 'https://picsum.photos/600/400',
    imageHint: 'artistic railing',
    featured: true,
    year: 2023,
    location: 'Bafoussam',
  },
  {
    id: 'i1',
    title: 'Verrière d\'atelier',
    description: 'Installation d\'une verrière pour séparer les espaces avec style.',
    category: 'installations',
    imageUrl: 'https://picsum.photos/600/400',
    imageHint: 'indoor glass partition',
    featured: false,
    year: 2023,
    location: 'Yaoundé',
  },
  {
    id: 'e1',
    title: 'Sculpture "L\'Envol"',
    description: 'Pièce maîtresse pour l\'exposition "Art en Fusion".',
    category: 'expositions',
    imageUrl: 'https://picsum.photos/600/400',
    imageHint: 'metal sculpture',
    featured: false,
    year: 2021,
    location: 'Douala',
  },
  {
    id: 'p2',
    title: 'Portail Battant "Tradition"',
    description: 'Portail à deux battants avec des finitions en fer forgé.',
    category: 'portails',
    imageUrl: 'https://picsum.photos/600/400',
    imageHint: 'classic wrought iron gate',
    featured: false,
    year: 2022,
    location: 'Limbé',
  },
  {
    id: 'b2',
    title: 'Clôture de Jardin',
    description: 'Clôture périmétrique alliant sécurité et esthétisme.',
    category: 'barrieres',
    imageUrl: 'https://picsum.photos/600/400',
    imageHint: 'garden metal fence',
    featured: false,
    year: 2023,
    location: 'Kribi',
  },
];

export const categories: { key: ProjectCategory | 'tous'; label: string }[] = [
    { key: 'tous', label: 'Tous' },
    { key: 'portails', label: 'Portails' },
    { key: 'barrieres', label: 'Barrières' },
    { key: 'rampes', label: 'Rampes' },
    { key: 'installations', label: 'Installations Maison' },
    { key: 'expositions', label: 'Expositions' },
];

export const services = [
  {
    icon: Wrench,
    title: 'Conception sur mesure',
    description: 'Nous transformons vos idées en créations métalliques uniques, adaptées à vos besoins et à votre style.',
  },
  {
    icon: Home,
    title: 'Installation à domicile',
    description: 'Notre équipe assure une pose parfaite et sécurisée de vos ouvrages directement chez vous.',
  },
  {
    icon: ShieldCheck,
    title: 'Réparation & Entretien',
    description: 'Nous prolongeons la vie de vos installations métalliques grâce à notre service de réparation et de maintenance.',
  },
  {
    icon: Store,
    title: 'Expositions en Boutique',
    description: 'Découvrez nos pièces artistiques et nos créations prêtes à l\'emploi dans notre espace d\'exposition.',
  },
];

export const values = [
    { icon: ShieldCheck, title: "Solidité", description: "Des ouvrages conçus pour durer, résistant au temps et aux intempéries." },
    { icon: Gem, title: "Élégance", description: "Un design soigné et des finitions impeccables pour valoriser votre propriété." },
    { icon: CheckCircle, title: "Fiabilité", description: "Respect des délais et un service client à votre écoute à chaque étape." },
];

export const testimonials = [
    {
        quote: "Un travail exceptionnel ! Le portail est encore plus beau que ce que j'imaginais. Un vrai professionnel à l'écoute.",
        author: "M. Tchamda",
        city: "Yaoundé"
    },
    {
        quote: "La rampe d'escalier a complètement transformé mon salon. La qualité est irréprochable. Je recommande vivement.",
        author: "Mme. Ekoa",
        city: "Douala"
    }
];

export const navLinks = [
  { href: '/realisations', icon: Wrench, title: 'Réalisations', description: 'Voir mes créations' },
  { href: '/services', icon: SparklesIcon, title: 'Services', description: 'Découvrir ce que je propose' },
  { href: '/a-propos', icon: User, title: 'À propos', description: 'Qui suis-je ?' },
  { href: '/contact', icon: MapPin, title: 'Contact', description: 'Me joindre facilement' }
];
