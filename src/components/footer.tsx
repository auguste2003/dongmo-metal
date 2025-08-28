import { Facebook, Instagram, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Logo } from './logo';
import { siteConfig } from '@/lib/data';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const phoneNumber = "+237612345678"; // Placeholder
  
  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link href="/" aria-label={`Accueil ${siteConfig.name}`}>
              <Logo />
            </Link>
          <div className="flex gap-5">
            <Link href="#" aria-label="Facebook" className="hover:text-accent transition-colors"><Facebook /></Link>
            <Link href="#" aria-label="Instagram" className="hover:text-accent transition-colors"><Instagram /></Link>
            <Link href={`tel:${phoneNumber}`} aria-label="Téléphone" className="hover:text-accent transition-colors"><Phone /></Link>
            <Link href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-accent transition-colors"><MessageCircle /></Link>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-primary-foreground/20 text-center text-primary-foreground/70 text-sm">
          <p>&copy; {currentYear} {siteConfig.name}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
