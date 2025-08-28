
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { categories } from "@/lib/data";
import Gallery from "./gallery";
import type { Project } from "@/lib/data";
import { Loader2 } from 'lucide-react';

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
          Explorez une sélection de nos travaux, classés par catégorie. Chaque pièce est le fruit d'un savoir-faire artisanal et d'une passion pour le métal.
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : (
        <Gallery allProjects={projects} categories={categories} />
      )}
    </div>
  );
}
