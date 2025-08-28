import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { navLinks } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";


async function getRandomProjects() {
  const projectsCol = collection(db, 'projects');
  const querySnapshot = await getDocs(query(collection(db, "projects")));
  const projects: Project[] = [];
  querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() } as Project);
  });

  // Mélanger le tableau pour l'aléatoire
  for (let i = projects.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [projects[i], projects[j]] = [projects[j], projects[i]];
  }

  // Retourner les 3 premiers
  return projects.slice(0, 3);
}


export default async function Home() {
  const featuredProjects = await getRandomProjects();

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
      {featuredProjects.length > 0 && (
        <section id="featured" className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Nos Réalisations à la Une</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featuredProjects.map((project, index) => (
                  <Card key={project.id} className={cn(
                      "overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex-col",
                      index === 2 ? "hidden lg:flex" : "flex"
                    )}>
                  <CardHeader className="p-0">
                      <div className="relative aspect-[4/3]">
                      <Image
                          src={project.imageUrl}
                          alt={project.title}
                          data-ai-hint={project.imageHint || 'metal work'}
                          fill
                          className="object-cover"
                      />
                      </div>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 flex-grow flex flex-col">
                      <CardTitle className="text-xl font-bold mb-2">{project.title}</CardTitle>
                      <CardDescription className="text-muted-foreground flex-grow">{project.description}</CardDescription>
                      <div className="mt-4">
                      <WhatsAppButton size="sm" className="w-full" message={`Bonjour, je suis intéressé par votre projet "${project.title}". Pourriez-vous m'en dire plus ?`}>
                          Discutons-en
                      </WhatsAppButton>
                      </div>
                  </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </section>
      )}

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
