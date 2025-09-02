'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SettingIndexPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/dashboard/settings/profile');
    }, [router]);

    return null;
}
