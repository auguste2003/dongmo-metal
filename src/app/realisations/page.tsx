import { projects, categories } from "@/lib/data";
import Gallery from "./gallery";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Réalisations - Metal Expressions',
  description: 'Découvrez notre galerie de créations métalliques: portails, barrières, rampes, installations et pièces d\'exposition.',
};

export default function RealisationsPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Nos Réalisations</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explorez une sélection de nos travaux, classés par catégorie. Chaque pièce est le fruit d'un savoir-faire artisanal et d'une passion pour le métal.
        </p>
      </div>
      <Gallery allProjects={projects} categories={categories} />
    </div>
  );
}
