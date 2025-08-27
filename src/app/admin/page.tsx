'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/data";


const projectSchema = z.object({
  title: z.string().min(1, "Le titre est requis."),
  description: z.string().min(1, "La description est requise."),
  category: z.enum(['portails', 'barrieres', 'rampes', 'installations', 'expositions'], {
    errorMap: () => ({ message: "Veuillez sélectionner une catégorie." })
  }),
  year: z.coerce.number().min(1900, "L'année doit être valide."),
  location: z.string().min(1, "Le lieu est requis."),
  imageUrl: z.string().url("L'URL de l'image n'est pas valide."),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function AdminPage() {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      year: new Date().getFullYear(),
      location: "",
      imageUrl: "",
    },
  });

  const onSubmit = (data: ProjectFormValues) => {
    console.log(data);
    // Ici, nous ajouterons la logique pour envoyer les données à Firebase.
  };

  const projectCategories = categories.filter(c => c.key !== 'tous');

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Ajouter un nouveau projet</CardTitle>
          <CardDescription>Remplissez le formulaire pour ajouter une nouvelle réalisation à la galerie.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <FormLabel>Description</FormLabel>
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
                      <FormLabel>Année</FormLabel>
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
                      <FormLabel>Lieu</FormLabel>
                      <FormControl>
                        <Input placeholder="Douala" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de l'image</FormLabel>
                    <FormControl>
                      <Input placeholder="https://picsum.photos/600/400" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit">Ajouter le projet</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
