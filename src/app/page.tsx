import Image from "next/image";
import Link from "next/link";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { navLinks } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Suspense } from "react";
import { FeaturedProjects, FeaturedProjectsSkeleton } from "@/components/featured-projects";


async function getHeroMedia() {
    try {
        const heroDocRef = doc(db, 'site_config', 'hero');
        const docSnap = await getDoc(heroDocRef);
        if (docSnap.exists()) {
            return docSnap.data() as {url: string, type: 'image' | 'video'};
        }
        return null;
    } catch (error) {
        console.error("Error fetching hero media:", error);
        return null;
    }
}


export default async function Home() {
  const heroMedia = await getHeroMedia();

  const defaultHeroVideo = "https://videos.pexels.com/video-files/3845831/3845831-hd_1920_1080_25fps.mp4";

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
         {heroMedia?.type === 'video' ? (
              <video 
                key={heroMedia.url}
                src={heroMedia.url} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute w-full h-full object-cover brightness-50"
              />
          ) : heroMedia?.type === 'image' ? (
              <Image
                src={heroMedia.url}
                alt="Portail en acier moderne"
                data-ai-hint="modern steel gate"
                fill
                className="object-cover brightness-50"
                priority
              />
          ) : (
             <video 
                key={defaultHeroVideo}
                src={defaultHeroVideo} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute w-full h-full object-cover brightness-50"
              />
          )}
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight">
            concevoir le devoir
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/90">
            Artisan soudeur spécialisé dans la création sur mesure d&apos;ouvrages métalliques.
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
            <Suspense fallback={<FeaturedProjectsSkeleton />}>
                <FeaturedProjects />
            </Suspense>
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
