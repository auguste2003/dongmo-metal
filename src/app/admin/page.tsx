
'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { categories } from '@/lib/data';
import Image from "next/image";
import { Loader2, Trash2, Edit } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

const projectSchema = z.object({
  title: z.string().min(1, 'Le titre est requis.'),
  description: z.string().optional(),
  category: z.enum(['portails', 'barrieres', 'rampes', 'installations', 'expositions'], {
    errorMap: () => ({ message: 'Veuillez sélectionner une catégorie.' }),
  }),
  year: z.coerce.number().optional(),
  location: z.string().optional(),
  image: z.instanceof(FileList).optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

// Schéma pour la modification, où l'image est optionnelle
const editProjectSchema = projectSchema.extend({
  id: z.string(),
  imageUrl: z.string().optional(), // Garder l'ancienne URL si pas de nouvelle image
});
type EditProjectFormValues = z.infer<typeof editProjectSchema>;


export default function AdminPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { toast } = useToast();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      year: new Date().getFullYear(),
      location: '',
    },
  });

  const editForm = useForm<EditProjectFormValues>({
    resolver: zodResolver(editProjectSchema),
  });


  const fetchProjects = async () => {
    setIsFetching(true);
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProjects(projectsData);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onSubmit = async (data: ProjectFormValues) => {
    setLoading(true);
    try {
      let imageUrl = '';
      if (data.image && data.image.length > 0) {
        const file = data.image[0];
        const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(snapshot.ref);
      } else {
         toast({ variant: 'destructive', title: "Aucune image sélectionnée", description: "Veuillez sélectionner une image pour le projet." });
         setLoading(false);
         return;
      }

      await addDoc(collection(db, 'projects'), {
        ...data,
        imageUrl,
        image: null, // Ne pas stocker l'objet FileList
      });

      toast({ title: 'Projet ajouté !', description: 'La réalisation a été ajoutée avec succès.' });
      form.reset();
      fetchProjects();
    } catch (error) {
      console.error('Error adding document: ', error);
      toast({ variant: 'destructive', title: 'Erreur', description: "Une erreur est survenue lors de l'ajout du projet." });
    }
    setLoading(false);
  };
  
  const onEditSubmit = async (data: EditProjectFormValues) => {
    setLoading(true);
    try {
        const projectRef = doc(db, 'projects', data.id);
        let imageUrl = data.imageUrl;

        // Si une nouvelle image est fournie, la téléverser
        if (data.image && data.image.length > 0) {
            const file = data.image[0];
            const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            imageUrl = await getDownloadURL(snapshot.ref);
             // Supprimer l'ancienne image si elle existe
            if (data.imageUrl) {
                try {
                    const oldImageRef = ref(storage, data.imageUrl);
                    await deleteObject(oldImageRef);
                } catch (imgError) {
                    console.warn("L'ancienne image n'a pas pu être supprimée (elle n'existe peut-être plus).", imgError)
                }
            }
        }

        const { id, image, ...updateData } = data;
        await updateDoc(projectRef, {
          ...updateData,
          imageUrl,
        });

        toast({ title: 'Projet modifié !', description: 'La réalisation a été mise à jour avec succès.' });
        fetchProjects();
        // Fermer le dialogue de modification ici si possible
    } catch (error) {
        console.error('Error updating document: ', error);
        toast({ variant: 'destructive', title: 'Erreur', description: "Une erreur est survenue." });
    }
    setLoading(false);
};


  const handleDelete = async (projectId: string, imageUrl: string) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));

      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }

      toast({ title: 'Projet supprimé !', description: 'La réalisation a été supprimée.' });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting document: ', error);
      toast({ variant: 'destructive', title: 'Erreur', description: "Une erreur est survenue lors de la suppression." });
    }
  };

  const projectCategories = categories.filter(c => c.key !== 'tous');
  const imageRef = form.register('image');

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Ajouter un nouveau projet</CardTitle>
            <CardDescription>Remplissez le formulaire pour ajouter une nouvelle réalisation.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                 <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image du projet</FormLabel>
                    <FormControl>
                      <Input type="file" accept="image/*" {...imageRef} />
                    </FormControl>
                    <FormDescription>
                      L'image est requise pour chaque projet.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre du projet</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Portail 'Élégance'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optionnel)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Décrivez le projet en quelques mots..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégorie</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une catégorie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {projectCategories.map(cat => (
                            <SelectItem key={cat.key} value={cat.key}>{cat.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Année (Optionnel)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="2023" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lieu (Optionnel)</FormLabel>
                        <FormControl>
                          <Input placeholder="Douala" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Ajouter le projet
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-2xl font-bold mb-6">Projets existants</h2>
          {isFetching ? (
            <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(project => (
                <Card key={project.id} className="overflow-hidden shadow-lg flex flex-col">
                  <div className="relative aspect-video">
                    <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm line-clamp-3">{project.description || "Pas de description."}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    
                    <Dialog>
                       <DialogTrigger asChild>
                         <Button variant="outline" size="sm" onClick={() => editForm.reset(project)}>
                           <Edit className="mr-2 h-4 w-4" /> Modifier
                         </Button>
                       </DialogTrigger>
                       <DialogContent>
                         <DialogHeader>
                           <DialogTitle>Modifier le projet</DialogTitle>
                         </DialogHeader>
                        <Form {...editForm}>
                            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                                <FormField
                                    control={editForm.control}
                                    name="image"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Changer l'image (Optionnel)</FormLabel>
                                        <FormControl>
                                        <Input type="file" accept="image/*" {...editForm.register('image')} />
                                        </FormControl>
                                        <FormDescription>Laissez vide pour conserver l'image actuelle.</FormDescription>
                                    </FormItem>
                                    )}
                                />
                                <FormField control={editForm.control} name="title" render={({ field }) => (<FormItem><FormLabel>Titre</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <FormField control={editForm.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>)} />
                                <FormField control={editForm.control} name="category" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Catégorie</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                                            <SelectContent>{projectCategories.map(c => <SelectItem key={c.key} value={c.key}>{c.label}</SelectItem>)}</SelectContent>
                                        </Select>
                                    </FormItem>
                                )} />
                                <FormField control={editForm.control} name="year" render={({ field }) => (<FormItem><FormLabel>Année</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                                <FormField control={editForm.control} name="location" render={({ field }) => (<FormItem><FormLabel>Lieu</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>)} />
                                <DialogClose asChild>
                                  <Button type="submit" disabled={loading}>{loading ? 'Sauvegarde...' : 'Sauvegarder'}</Button>
                                </DialogClose>
                            </form>
                        </Form>
                       </DialogContent>
                     </Dialog>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette action est irréversible. Le projet "{project.title}" sera définitivement supprimé.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(project.id, project.imageUrl)}>
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

    