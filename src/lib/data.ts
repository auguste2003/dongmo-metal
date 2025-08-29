import { Wrench, Home, ShieldCheck, Store, Gem, CheckCircle, User, MapPin, Sparkles as SparklesIcon } from 'lucide-react';

export const siteConfig = {
  name: "DONGMO METAL CONCEPTION",
};

export type ProjectCategory = 'portails' | 'barrieres' | 'rampes' | 'installations' | 'expositions';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  imageUrl: string;
  imageHint?: string;
  featured?: boolean;
  year?: number;
  location?: string;
}

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
    { icon: ShieldCheck, title: "Assurance", description: "Des ouvrages conçus pour durer, résistant au temps et aux intempéries." },
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
