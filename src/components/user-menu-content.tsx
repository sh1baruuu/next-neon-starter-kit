import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type UserInfoType } from '@/types';
import { LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import LogoutConfirmDialog from './logout-confirm-dialog';

interface UserMenuContentProps {
    user: UserInfoType;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();
    const [open, setOpen] = useState(false);

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo
                        user={user}
                        showEmail
                    />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full"
                        href='/dashboard/settings/profile'
                        prefetch
                        onClick={cleanup}
                    >
                        <Settings className="mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <LogOut className="mr-2" />
                <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => setOpen(true)}
                >
                    Logout
                </button>
            </DropdownMenuItem>

            {/* Controlled dialog */}
            <LogoutConfirmDialog
                open={open}
                onOpenChange={setOpen}
            />
        </>
    );
}
