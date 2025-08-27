import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { projects, navLinks } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 2);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://picsum.photos/1600/900"
          alt="Portail en acier moderne"
          data-ai-hint="modern steel gate"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight">
            Le métal au service de vos idées
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/90">
            Artisan soudeur spécialisé dans la création sur mesure d'ouvrages métalliques.
          </p>
          <div className="mt-8">
            <WhatsAppButton message="Bonjour, je suis intéressé par vos services et j'aimerais discuter de mon projet.">
              Me contacter sur WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="featured" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Nos Réalisations à la Une</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader className="p-0">
                  <div className="aspect-w-4 aspect-h-3 relative">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      data-ai-hint={project.imageHint}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6 flex-grow flex flex-col">
                  <CardTitle className="text-base md:text-xl font-bold mb-2">{project.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground flex-grow hidden md:block">{project.description}</CardDescription>
                  <div className="mt-4">
                    <WhatsAppButton size="sm" className="w-full text-xs" message={`Bonjour, je suis intéressé par votre projet "${project.title}". Pourriez-vous m'en dire plus ?`}>
                      Discutons-en
                    </WhatsAppButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Cards Section */}
      <section id="navigation" className="py-12 md:py-20 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Explorer le site</h2>
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {navLinks.map((link) => (
              <Link href={link.href} key={link.href} className="group">
                <Card className="h-full p-4 md:p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                  <link.icon className="h-10 w-10 md:h-16 md:w-16 text-accent mb-2 md:mb-4" />
                  <CardTitle className="text-lg md:text-2xl font-bold">{link.title}</CardTitle>
                  <CardDescription className="mt-1 text-sm md:text-lg">{link.description}</CardDescription>
                  <ArrowRight className="mt-4 h-6 w-6 text-accent opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
