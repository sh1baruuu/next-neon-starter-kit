import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SharedDataProvider } from '@/context/ShareDataContext';
import { Suspense } from 'react';
import { CookiesProvider } from 'next-client-cookies/server';
import Loading from './loading';
import StructuredData from '@/components/json-ld';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Next Neon Starter Kit',
    description: 'Developed by Rudolph De Villa',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
        >
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <StructuredData />
                <CookiesProvider>
                    <Suspense fallback={<Loading />}>
                        <SharedDataProvider>{children}</SharedDataProvider>
                    </Suspense>
                </CookiesProvider>
            </body>
        </html>
    );
}
