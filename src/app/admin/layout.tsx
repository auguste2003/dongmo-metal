import { Sidebar, SidebarProvider, SidebarInset, SidebarHeader, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutGrid, GanttChartSquare } from "lucide-react";
import type { Metadata } from 'next';
import { AuthProvider } from "@/context/auth-context";
import { ProtectedRoute } from "@/components/protected-route";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

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
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">
                <AuthProvider>
                    <ProtectedRoute>
                        <SidebarProvider>
                            <Sidebar>
                                <SidebarHeader>
                                    <SidebarTrigger />
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
                            <SidebarInset>
                                {children}
                            </SidebarInset>
                        </SidebarProvider>
                    </ProtectedRoute>
                    <Toaster />
                </AuthProvider>
            </div>
            <Footer />
        </div>
    );
}
