'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { useSharedData } from '@/context/ShareDataContext';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {

    const isOpen = useSharedData().sidebarOpen

    if (variant === 'header') {
        return <div className="flex min-h-screen w-full flex-col">{children}</div>;
    }

    return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>;
}
