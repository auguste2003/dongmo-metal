
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { categories } from "@/lib/data";
import Gallery from "./gallery";
import type { Project } from "@/lib/data";
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const SkeletonCard = () => (
    <Card className="overflow-hidden shadow-lg flex flex-col">
      <CardHeader className="p-0">
          <Skeleton className="aspect-video w-full" />
      </CardHeader>
      <CardContent className="p-6 flex-grow flex flex-col">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="mt-6">
            <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
);


export default function RealisationsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('year', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projectsData: Project[] = [];
      querySnapshot.forEach((doc) => {
        projectsData.push({ id: doc.id, ...doc.data() } as Project);
      });
      setProjects(projectsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Nos Réalisations</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explorez une sélection de nos travaux, classés par catégorie. Chaque pièce est le fruit d&apos;un savoir-faire artisanal et d&apos;une passion pour le métal.
        </p>
      </div>
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <Gallery allProjects={projects} categories={categories} />
      )}
    </div>
  );
}
