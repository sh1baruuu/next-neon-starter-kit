import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { ReactNode } from 'react';

export default function AppSidebarLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent
                variant="sidebar"
                className="overflow-x-hidden"
            >
                {children}
            </AppContent>
        </AppShell>
    );
}
