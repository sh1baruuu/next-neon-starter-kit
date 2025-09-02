import AuthLayout from '@/layouts/AuthLayout';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'Login - Next Neon Starter Kit',
    description: 'Log in to your account',
};

interface LoginLayoutProps {
    children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
    return <AuthLayout>{children}</AuthLayout>;
}
