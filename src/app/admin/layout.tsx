import { Sidebar, SidebarProvider, SidebarInset, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutGrid, GanttChartSquare } from "lucide-react";
import { AuthProvider } from "@/context/auth-context";
import { ProtectedRoute } from "@/components/protected-route";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { AdminHeader } from "@/components/admin-header";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/data";


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
                               <Link href="/" aria-label={`Accueil ${siteConfig.name}`}>
                                  <Logo />
                               </Link>
                            </SidebarHeader>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <Link href="/admin" legacyBehavior passHref>
                                        <SidebarMenuButton asChild isActive={true} tooltip="Projets">
                                            <span>
                                                <LayoutGrid />
                                                <span>Projets</span>
                                            </span>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <Link href="#" legacyBehavior passHref>
                                        <SidebarMenuButton asChild tooltip="Services">
                                            <span>
                                                <GanttChartSquare />
                                                <span>Services</span>
                                            </span>
                                        </SidebarMenuButton>
                                    </Link>
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
