'use client';

import { Button } from '@/components/ui/button';
import { useSharedData } from '@/context/ShareDataContext';
import { RiGithubFill } from '@remixicon/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function Home() {
    const { user } = useSharedData();

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(
                'git clone https://github.com/sh1baruuu/next-neon-starter-kit && cd next-neon-starter-kit && npm install'
            );

            toast.success('Command copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
            <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                <nav className="flex items-center justify-end gap-4">
                    {user ? (
                        <Link
                            href={'/dashboard'}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={'/login'}
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                            >
                                Log in
                            </Link>
                            <Link
                                href={'/signup'}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header>
            <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                <main className="max-w-6xl mx-auto px-6 py-20">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-800 dark:border-cyan-400 dark:text-white/90 text-sm text-gray-700 mb-8">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Latest Next.js 15 with Neon Database
                        </div>

                        <h1 className="text-4xl md:text-5xl dark:text-white font-bold tracking-tight mb-6">
                            Next.JS + Neon Starter Kit
                        </h1>

                        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
                            Next.js gives you the best developer experience with
                            all the features you need for production: hybrid
                            static & server rendering, TypeScript support, smart
                            bundling, route pre-fetching, and more.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                onClick={copyToClipboard}
                                className='bg-emerald-600 hover:bg-emerald-600/90 text-white'
                            >
                                Get Started
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                asChild
                            >
                                <Link
                                    href="https://github.com/sh1baruuu/next-neon-starter-kit"
                                    target="_blank"
                                >
                                    <RiGithubFill className="w-4 h-4 mr-2" />
                                    View on GitHub
                                </Link>
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
            <div className="hidden h-14.5 lg:block"></div>
        </div>
    );
}
