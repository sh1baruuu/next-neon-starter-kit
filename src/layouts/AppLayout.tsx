import AppLayoutTemplate from '@/layouts/app/AppSidebarLayout';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children, ...props }: AppLayoutProps) {
    return (
        <AppLayoutTemplate
            {...props}
        >
            {children}
        </AppLayoutTemplate>
    );
}