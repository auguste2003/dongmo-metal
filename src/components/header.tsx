import Link from 'next/link';
import { Button } from './ui/button';
import { WhatsAppButton } from './whatsapp-button';

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-2xl font-bold text-primary font-headline" aria-label="Accueil Metal Expressions">
          Metal<span className="text-accent">Expressions</span>
        </Link>
        <nav className="hidden md:flex gap-4 items-center text-md font-medium">
          <Button variant="ghost" asChild>
            <Link href="/realisations">Réalisations</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/services">Services</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/a-propos">À Propos</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </nav>
        <div className="md:hidden">
            <WhatsAppButton message="Bonjour, je souhaite discuter d'un projet.">
                Contact
            </WhatsAppButton>
        </div>
      </div>
    </header>
  );
}
