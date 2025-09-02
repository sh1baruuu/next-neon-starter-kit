import AuthLayout from '@/layouts/AuthLayout';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Sign Up - Next Neon Starter Kit',
    description: "Create a new account",
};

interface SignUpLayoutProps {
    children: ReactNode;
}

export default function SignUpLayout({ children }: SignUpLayoutProps) {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    );
}
