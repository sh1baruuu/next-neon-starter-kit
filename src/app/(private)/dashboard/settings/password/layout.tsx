import HeadingSmall from '@/components/heading-small';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Password settings - Next Neon Starter Kit',
    description: "Update your account's password settings",
};
    
interface PasswordLayoutProps {
    children: ReactNode;
}

export default function PasswordLayout({ children }: PasswordLayoutProps) {
    return (
        <div className="space-y-6">
            <HeadingSmall
                title="Update password"
                description="Ensure your account is using a long, random password to stay secure"
            />
            {children}
        </div>
    );
}
