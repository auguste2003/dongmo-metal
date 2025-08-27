
import { Sidebar, SidebarProvider, SidebarInset, SidebarHeader, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutGrid, GanttChartSquare } from "lucide-react";
import type { Metadata } from 'next';
import { AuthProvider } from "@/context/auth-context";
import { ProtectedRoute } from "@/components/protected-route";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
    title: 'Admin - Metal Expressions',
    description: 'Administration du site Metal Expressions',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-muted/40">
            <AuthProvider>
                <ProtectedRoute>
                    <SidebarProvider>
                        <Sidebar>
                            <SidebarHeader className="p-4 justify-start">
                                <SidebarTrigger className="md:hidden"/>
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
                             <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-background px-6">
                                <SidebarTrigger className="hidden md:flex shrink-0"/>
                                <div className="flex-1">
                                    <h1 className="font-semibold text-lg">Tableau de bord</h1>
                                </div>
                            </header>
                            <SidebarInset>
                                {children}
                            </SidebarInset>
                        </div>
                    </SidebarProvider>
                </ProtectedRoute>
                <Toaster />
            </AuthProvider>
        </div>
    );
}
