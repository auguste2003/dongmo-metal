import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { db } from "@/lib/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

async function getRandomProjects() {
    const querySnapshot = await getDocs(query(collection(db, "projects")));
    const projects: Project[] = [];
    querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() } as Project);
    });

    for (let i = projects.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [projects[i], projects[j]] = [projects[j], projects[i]];
    }

    return projects.slice(0, 3);
}

export function FeaturedProjectsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(3)].map((_, i) => (
                <Card key={i} className={cn(
                    "overflow-hidden shadow-lg flex flex-col",
                    i === 2 ? "hidden sm:hidden lg:flex" : "" // Hide 3rd card on sm and md
                )}>
                    <CardHeader className="p-0">
                        <Skeleton className="aspect-[4/3] w-full" />
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 flex-grow flex flex-col">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-10 w-full mb-4 flex-grow" />
                        <div className="mt-4">
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export async function FeaturedProjects() {
    const featuredProjects = await getRandomProjects();

    if (featuredProjects.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredProjects.map((project, index) => (
                <Card key={project.id} className={cn(
                    "overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col",
                    index === 2 ? "hidden sm:hidden lg:flex" : "" // Hide 3rd card on sm and md
                )}>
                    <CardHeader className="p-0">
                        <div className="relative aspect-[4/3]">
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                data-ai-hint={project.imageHint || 'metal work'}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 flex-grow flex flex-col">
                        <CardTitle className="text-xl font-bold mb-2">{project.title}</CardTitle>
                        <CardDescription className="text-muted-foreground flex-grow">{project.description}</CardDescription>
                        <div className="mt-4">
                            <WhatsAppButton size="sm" className="w-full" message={`Bonjour, je suis intéressé par votre projet "${project.title}". Pourriez-vous m'en dire plus ?`}>
                                Discutons-en
                            </WhatsAppButton>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}