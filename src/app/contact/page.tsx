import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Facebook, Instagram, Clock, MapPin } from 'lucide-react';
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Metal Expressions',
  description: 'Contactez-nous pour vos projets de ferronnerie. Retrouvez nos horaires, notre adresse et nos contacts directs via WhatsApp, téléphone et réseaux sociaux.',
};

const phoneNumber = "237612345678";
const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Bonjour, j'ai une question concernant vos services.")}`;
const phoneLink = `tel:${phoneNumber}`;
const facebookLink = "#";
const instagramLink = "#";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Entrons en contact</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Une question ? Un projet ? N'hésitez pas à me joindre. Je suis à votre disposition pour discuter de vos besoins.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <MapPin className="text-accent" />
                Informations de contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                  <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2" /> WhatsApp
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={phoneLink}>
                    <Phone className="mr-2" /> Appeler
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href={facebookLink} target="_blank" rel="noopener noreferrer">
                    <Facebook className="mr-2" /> Facebook
                  </Link>
                </Button>
                 <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700 text-white">
                  <Link href={instagramLink} target="_blank" rel="noopener noreferrer">
                    <Instagram className="mr-2" /> Instagram
                  </Link>
                </Button>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                  <Clock className="text-accent" />
                  Horaires d'ouverture
                </h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Lundi - Vendredi : 08h00 - 18h00</li>
                  <li>Samedi : 09h00 - 14h00</li>
                  <li>Dimanche : Fermé</li>
                </ul>
              </div>

               <div className="border-t pt-6">
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                  <MapPin className="text-accent" />
                  Adresse de l'atelier
                </h3>
                <p className="text-muted-foreground">Rue 123, Quartier B, Douala, Cameroun</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
            <Card className="overflow-hidden shadow-lg h-full">
                <div className="aspect-w-4 aspect-h-3 h-full">
                <Image 
                    src="https://picsum.photos/800/600"
                    alt="Carte de localisation de l'atelier"
                    data-ai-hint="map location"
                    width={800}
                    height={600}
                    className="object-cover w-full h-full"
                />
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
