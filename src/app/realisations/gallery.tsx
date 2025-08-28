"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WhatsAppButton } from "@/components/whatsapp-button";
import type { Project, ProjectCategory } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface GalleryProps {
  allProjects: Project[];
  categories: { key: ProjectCategory | 'tous'; label: string }[];
}

export default function Gallery({ allProjects, categories }: GalleryProps) {
  const [filter, setFilter] = useState<ProjectCategory | 'tous'>('tous');

  const filteredProjects = filter === 'tous'
    ? allProjects
    : allProjects.filter((project) => project.category === filter);

  return (
    <div>
      <Tabs
        defaultValue="tous"
        onValueChange={(value) => setFilter(value as ProjectCategory | 'tous')}
        className="flex justify-center mb-8"
      >
        <TabsList className="grid grid-cols-3 sm:grid-cols-6 h-auto">
          {categories.map((cat) => (
            <TabsTrigger key={cat.key} value={cat.key} className="text-sm md:text-base">
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col group">
            <CardHeader className="p-0">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="aspect-video relative cursor-zoom-in overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      data-ai-hint={project.imageHint}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 border-0">
                   <DialogTitle className="sr-only">{project.title}</DialogTitle>
                   <div className="relative aspect-video">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      data-ai-hint={project.imageHint}
                      fill
                      className="object-contain"
                    />
                   </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="p-6 flex-grow flex flex-col">
              <CardTitle className="text-xl font-bold mb-2">{project.title}</CardTitle>
              <CardDescription className="text-muted-foreground flex-grow">
                {project.description}
              </CardDescription>
              <p className="text-sm text-muted-foreground mt-4">
                Année: {project.year} | Lieu: {project.location}
              </p>
              <div className="mt-6">
                <WhatsAppButton message={`Bonjour, je viens de visiter votre site et je suis intéressé par votre projet "${project.title}". Pourriez-vous m'en dire plus ?`}>
                  Demander un devis
                </WhatsAppButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
