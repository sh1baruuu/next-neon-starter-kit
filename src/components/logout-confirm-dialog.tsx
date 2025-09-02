'use client';

import { logoutAction } from '@/app/action/auth';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface LogoutConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function LogoutConfirmDialog({
    open,
    onOpenChange,
}: LogoutConfirmDialogProps) {
    const cleanup = useMobileNavigation();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleLogout = async () => {
        startTransition(async () => {
            const result = await logoutAction();

            if (!result?.success) {
                console.error('Logout error:', result.error);
            }

            cleanup();
            router.refresh();
            router.push('/login');
            onOpenChange(false);
        });
    };

    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Logout Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to log out? You’ll need to sign in
                        again to access your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => onOpenChange(false)}
                        disabled={isPending}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        onClick={handleLogout}
                        disabled={isPending}
                    >
                        {isPending ? 'Logging out...' : 'Logout'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
