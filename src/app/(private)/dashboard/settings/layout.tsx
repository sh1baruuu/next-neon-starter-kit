import { AppSidebarHeader } from '@/components/app-sidebar-header';
import SettingsLayout from '@/layouts/SettingsLayout';
import { ReactNode } from 'react';

interface SettingsLayoutProps {
    children: ReactNode;
}

const breadcrumbs: BreadcrumbItemType[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Settings',
        href: '/dashboard/settings',
    },
];

export default function UserSettingsLayout({ children }: SettingsLayoutProps) {
    
    return (
        <div>
            <AppSidebarHeader breadcrumbs={breadcrumbs} />
            <SettingsLayout>{children}</SettingsLayout>
        </div>
    );
}
