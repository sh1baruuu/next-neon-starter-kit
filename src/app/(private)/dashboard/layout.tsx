import AppLayout from '@/layouts/AppLayout';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Dashboard - Next Neon Starter Kit',
    description: 'Your personal dashboard',
};

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return <AppLayout>{children}</AppLayout>;
}
