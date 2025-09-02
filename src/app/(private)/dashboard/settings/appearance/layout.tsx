import HeadingSmall from '@/components/heading-small';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Appearance settings - Next Neon Starter Kit',
    description: "Update your account's appearance settings",
};

interface AppearanceLayoutProps {
    children: ReactNode;
}

export default function AppearanceLayout({ children }: AppearanceLayoutProps) {
    return (
        <div className="space-y-6">
            <HeadingSmall
                title="Appearance settings"
                description="Update your account's appearance settings"
            />
            {children}
        </div>
    );
}
