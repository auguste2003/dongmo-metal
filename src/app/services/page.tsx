import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { services } from "@/lib/data";
import { WhatsAppButton } from "@/components/whatsapp-button";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - Metal Expressions',
  description: 'Découvrez nos services: conception sur mesure, installation, réparation et entretien d\'ouvrages métalliques.',
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Ce que je propose</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          De la première esquisse à l'installation finale, je vous accompagne avec expertise et passion.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {services.map((service, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
              <div className="bg-accent text-accent-foreground p-3 rounded-full">
                <service.icon className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-base">
                {service.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Un projet en tête ?</h2>
        <p className="text-muted-foreground text-lg mb-6">Contactez-moi pour en discuter et obtenir un devis gratuit.</p>
        <WhatsAppButton message="Bonjour, j'aimerais discuter d'un projet sur mesure.">
          Lancer la conversation
        </WhatsAppButton>
      </div>
    </div>
  );
}
