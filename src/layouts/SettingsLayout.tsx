'use client';

import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import Link from 'next/link';
import { ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface SettingsLayoutProps {
    children: ReactNode;
}

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: '/dashboard/settings/profile',
        icon: null,
    },
    {
        title: 'Password',
        href: '/dashboard/settings/password',
        icon: null,
    },
    {
        title: 'Appearance',
        href: '/dashboard/settings/appearance',
        icon: null,
    },
];

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    const [isClient, setIsClient] = useState(false);
    const currentPath = usePathname();

    useEffect(() => {
        setIsClient(true);
        // Any client-side only code can go here
    }, []);

    if (!isClient) {
        // Render a loading state or skeleton that matches the final layout
        return (
            <div className="px-4 py-6">
                <Heading
                    title="Settings"
                    description="Manage your profile and account settings"
                />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <aside className="w-full max-w-xl lg:w-48">
                        <div className="flex flex-col space-y-1">
                            {sidebarNavItems.map((item, index) => (
                                <div key={index} className="h-9 bg-muted/20 rounded animate-pulse" />
                            ))}
                        </div>
                    </aside>
                    <Separator className="my-6 md:hidden" />
                    <div className="flex-1 md:max-w-2xl">
                        <section className="max-w-xl space-y-12">
                            {children}
                        </section>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 py-6">
            <Heading
                title="Settings"
                description="Manage your profile and account settings"
            />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${item.href}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': currentPath === item.href,
                                })}
                            >
                                <Link
                                    href={item.href}
                                    prefetch
                                >
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 md:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}