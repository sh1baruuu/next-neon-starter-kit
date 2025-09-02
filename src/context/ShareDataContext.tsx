'use client';

import { UserInfoType } from '@/types';
import { usePathname, useSearchParams } from 'next/navigation';
import {
    useContext,
    createContext,
    useState,
    ReactNode,
    useEffect,
} from 'react';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query';
import { api } from '@/hooks/use-api';
import { useCookies } from 'next-client-cookies';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

export interface SharedData {
    user: UserInfoType | null;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    url: string;
}

export const queryClient = new QueryClient();

const SharedDataContext = createContext<SharedData | undefined>(undefined);

interface SharedDataProviderProps {
    children: ReactNode;
}

function SharedDataInner({ children }: SharedDataProviderProps) {
    const session = useCookies().get('session');
    const [user, setUser] = useState<UserInfoType | null>(null);
    const { data, refetch } = useQuery<{ user: UserInfoType }>({
        queryKey: ['session', session],
        queryFn: async () => api.get<{ user: UserInfoType }>('/api/session'),
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        gcTime: Infinity,
        retry: 2,
    });

    useEffect(() => {
        refetch();

        if (data?.user) {
            setUser(data.user);
        }
    }, [data, session, refetch]);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    return (
        <SharedDataContext.Provider
            value={{
                user: user,
                sidebarOpen,
                setSidebarOpen,
                url,
            }}
        >
            {children}
        </SharedDataContext.Provider>
    );
}

export const SharedDataProvider = ({ children }: SharedDataProviderProps) => (
    <QueryClientProvider client={queryClient}>
        <SharedDataInner>
            {' '}
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <Toaster />
            </ThemeProvider>
        </SharedDataInner>
    </QueryClientProvider>
);

export const useSharedData = () => {
    const context = useContext(SharedDataContext);
    if (!context)
        throw new Error(
            'useSharedData must be used within a SharedDataProvider'
        );
    return context;
};
