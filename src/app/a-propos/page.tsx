import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { values, testimonials } from "@/lib/data";
import type { Metadata } from 'next';
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const metadata: Metadata = {
  title: 'À Propos - Metal Expressions',
  description: 'Découvrez l\'artisan derrière Metal Expressions, sa passion pour le métal et ses valeurs: solidité, élégance, fiabilité.',
};

async function getAboutData() {
  try {
    const aboutDocRef = doc(db, "site_config", "about");
    const docSnap = await getDoc(aboutDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as { imageUrl?: string; story?: string };
    }
    return null;
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
}

export default async function AboutPage() {
  const aboutData = await getAboutData();
  
  const defaultImage = "https://picsum.photos/450/600";
  const imageUrl = aboutData?.imageUrl || defaultImage;

  const defaultStory = `Depuis mon plus jeune âge, j'ai été fasciné par la transformation du métal brut en objet d'art et d'utilité. Ce qui a commencé comme une curiosité dans l'atelier familial est devenu une véritable passion, puis mon métier. 
Aujourd'hui, avec Metal Expressions, je mets mon savoir-faire à votre service pour réaliser des projets qui allient la robustesse de l'acier à l'élégance du design. Chaque projet est une nouvelle aventure, une collaboration pour donner vie à vos idées.`;
  const story = aboutData?.story || defaultStory;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline">L'Artisan derrière l'étincelle</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          La passion du métal, transmise et perfectionnée au fil des années.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
        <div className="md:col-span-2">
          <Card className="overflow-hidden shadow-xl">
            <div className="relative w-full aspect-[3/4]">
              <Image
                src={imageUrl}
                alt="Portrait de l'artisan soudeur"
                data-ai-hint="welder portrait"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Card>
        </div>
        <div className="md:col-span-3">
          <h2 className="text-3xl font-bold mb-4">Mon Histoire</h2>
          <div 
             className="text-muted-foreground text-base leading-relaxed space-y-4"
             dangerouslySetInnerHTML={{ __html: story.replace(/\n/g, '<br />') }}
          />
        </div>
      </div>

      <section id="values" className="py-12 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Mes Valeurs Fondamentales</h2>
        <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
                <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary text-primary-foreground p-4 rounded-full">
                            <value.icon className="h-10 w-10"/>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                </div>
            ))}
        </div>
      </section>

      <section id="testimonials" className="py-12 md:py-16 bg-secondary/50 rounded-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Ce que disent mes clients</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
                <Card key={index} className="shadow-lg">
                    <CardContent className="pt-6">
                        <blockquote className="text-lg text-muted-foreground italic mb-4">"{testimonial.quote}"</blockquote>
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{testimonial.author}</p>
                                <p className="text-sm text-muted-foreground">{testimonial.city}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>
    </div>
  );
}
