import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Facebook, Instagram, Clock, MapPin } from 'lucide-react';
import Link from "next/link";
import type { Metadata } from 'next';
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: `Contact - ${siteConfig.name}`,
  description: 'Contactez-nous pour vos projets de ferronnerie. Retrouvez nos horaires, notre adresse et nos contacts directs via WhatsApp, téléphone et réseaux sociaux.',
};

const phoneNumber = "+237697266183";
const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Bonjour,je viens de visiter votre site et j'ai une question concernant vos services.")}`;
const phoneLink = `tel:${phoneNumber}`;
const facebookLink = "#";
const instagramLink = "#";

export default function ContactPage() {
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127347.33230681554!2d9.66591205128362!3d4.048388879007798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10610d4e3345156d%3A0xfa938e5a5933a34!2sDouala%2C%20Cameroon!5e0!3m2!1sen!2sus!4v1688568750132!5m2!1sen!2sus";

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
                  <li>Lundi - Vendredi : 06h00 - 20h00</li>
                  <li>Samedi : 09h00 - 20h00</li>
                  <li>Dimanche : Fermé</li>
                </ul>
              </div>

               <div className="border-t pt-6">
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                  <MapPin className="text-accent" />
                  Adresse de l'atelier
                </h3>
                <p className="text-muted-foreground">Nkolbisson-Béaltitude, Yaounde, Cameroun</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
            <Card className="overflow-hidden shadow-lg h-full">
                <div className="aspect-w-4 aspect-h-3 h-full min-h-[400px]">
                    <iframe
                        src={mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Localisation de l'atelier DONGMO METAL CONCEPTION"
                    ></iframe>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
