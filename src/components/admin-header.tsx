'use client';

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AdminHeader() {
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
                <SidebarTrigger className="shrink-0 md:hidden"/>
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
