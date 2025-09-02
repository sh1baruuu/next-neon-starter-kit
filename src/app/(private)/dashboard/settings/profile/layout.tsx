import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Profile settings - Next Neon Starter Kit',
    description: "Update your account's profile settings",
};
    

interface ProfileLayoutProps {
    children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    return (
        <div className="space-y-6">
            <HeadingSmall
                title="Profile information"
                description="Update your name and email address"
            />
            {children}
            <DeleteUser />
        </div>
    );
}
