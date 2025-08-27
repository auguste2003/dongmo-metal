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
        <>
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
        </>
    );
}
