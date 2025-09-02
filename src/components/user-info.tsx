import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type UserInfoType } from '@/types';
import { Loader2 } from 'lucide-react';

export function UserInfo({ user, showEmail = false }: { user: UserInfoType | null; showEmail?: boolean }) {
    const getInitials = useInitials();

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user?.avatar ?? ''} alt={user?.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {user ? getInitials(user?.name) : <Loader2 className="h-4 w-4 animate-spin" />}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                {showEmail && <span className="truncate text-xs text-muted-foreground">{user?.email}</span>}
            </div>
        </>
    );
}
