
import { Sidebar, SidebarProvider, SidebarInset, SidebarHeader, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutGrid, GanttChartSquare } from "lucide-react";
import { AuthProvider } from "@/context/auth-context";
import { ProtectedRoute } from "@/components/protected-route";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { AdminHeader } from "@/components/admin-header";
import { Logo } from "@/components/logo";


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
                               <Link href="/" aria-label="Accueil DONGMO METAL CONCEPTION">
                                  <Logo />
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

    
