'use client';

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, useSharedData } from '@/context/ShareDataContext';
import { type NavItem } from '@/types';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import AppLogo from './app-logo';

const staffNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];


const userNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
     {
        title: 'Repository',
        href: 'https://github.com/sh1baruuu/next-neon-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://nextjs.org/docs/app',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const page: SharedData = useSharedData();
    const user = page.user;

    const selectedNavItem = user?.role === 'admin' ? adminNavItems : user?.role === 'staff' ? staffNavItems : userNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={selectedNavItem} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
