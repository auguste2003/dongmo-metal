
import { Sidebar, SidebarProvider, SidebarInset, SidebarHeader, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutGrid, GanttChartSquare } from "lucide-react";
import type { Metadata } from 'next';
import { AuthProvider } from "@/context/auth-context";
import { ProtectedRoute } from "@/components/protected-route";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";


function AdminHeader() {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/login');
        } catch (error) {
            console.error("Failed to log out", error)
        }
    };

    return (
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-background px-6">
            <div className="flex-1">
                <SidebarTrigger className="hidden md:flex shrink-0"/>
            </div>
            <div className="flex items-center gap-4">
                 <h1 className="font-semibold text-lg hidden sm:block">Tableau de bord</h1>
                <Button onClick={handleLogout} variant="outline">
                    Déconnexion
                </Button>
            </div>
        </header>
    )
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <AuthProvider>
            <ProtectedRoute>
                <div className="flex min-h-screen bg-muted/40">
                    <SidebarProvider>
                        <Sidebar>
                             <SidebarHeader className="p-4 justify-start">
                               <Link href="/" className="text-2xl font-bold text-primary font-headline" aria-label="Accueil Metal Expressions">
                                  Metal<span className="text-accent">Expressions</span>
                               </Link>
                            </SidebarHeader>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton href="/admin" isActive={true} tooltip="Projets">
                                        <LayoutGrid />
                                        <span>Projets</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton href="#" tooltip="Services">
                                        <GanttChartSquare />
                                        <span>Services</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </Sidebar>
                        <div className="flex flex-col flex-1">
                             <AdminHeader />
                            <SidebarInset>
                                {children}
                            </SidebarInset>
                        </div>
                    </SidebarProvider>
                </div>
            </ProtectedRoute>
            <Toaster />
        </AuthProvider>
    );
}

    