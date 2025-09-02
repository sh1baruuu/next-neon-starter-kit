'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import HeadingSmall from '@/components/heading-small';

import { deleteUserAccount } from '@/app/action/user';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useCustomAlertToast } from '@/hooks/use-toast';
import { useDeleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

// Define validation schema
const deleteUserSchema = z.object({
    password: z
        .string()
        .min(1, 'Please enter your password to confirm deletion'),
});

export default function DeleteUser() {
    const deleteCookie = useDeleteCookie();
    const router = useRouter();
    const toast = useCustomAlertToast();
    const [open, setOpen] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(deleteUserSchema),
        defaultValues: {
            password: '',
        },
    });

    const deleteUser = async (data: z.infer<typeof deleteUserSchema>) => {
        startTransition(async () => {
            try {
                const res = await deleteUserAccount(data.password);

                if (!res.success) {
                    if (res.error) {
                        throw new Error(res.error);
                    }

                    if (res.currentPasswordError) {
                        form.setError('password', {
                            message: res.currentPasswordError,
                        });
                        return;
                    }
                }

                toast.showSuccessToast({
                    title: 'Account deleted successfully',
                    description: 'Your account has been deleted successfully',
                });

                closeModal();

                deleteCookie('session');

                router.push('/login')
            } catch (error) {
                console.error('Error deleting user:', error);
                passwordInput.current?.focus();
                toast.showAlertToast({
                    title: 'Password update failed',
                    description:
                        'An unexpected error occurred while updating password',
                });
            }
        });
    };

    const closeModal = () => {
        setOpen(false);
        form.reset();
        form.clearErrors();
    };

    return (
        <div className="space-y-6">
            <HeadingSmall
                title="Delete account"
                description="Delete your account and all of its resources"
            />
            <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
                <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
                    <p className="font-medium">Warning</p>
                    <p className="text-sm">
                        Please proceed with caution, this cannot be undone.
                    </p>
                </div>

                <Dialog
                    open={open}
                    onOpenChange={setOpen}
                >
                    <DialogTrigger asChild>
                        <Button variant="destructive">Delete account</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>
                            Are you sure you want to delete your account?
                        </DialogTitle>
                        <DialogDescription>
                            Once your account is deleted, all of its resources
                            and data will also be permanently deleted. Please
                            enter your password to confirm you would like to
                            permanently delete your account.
                        </DialogDescription>

                        <Form {...form}>
                            <form
                                className="space-y-6"
                                onSubmit={form.handleSubmit(deleteUser)}
                            >
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                htmlFor="password"
                                                className="sr-only"
                                            >
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    placeholder="Password"
                                                    autoComplete="current-password"
                                                    disabled={isPending}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <DialogFooter className="gap-2">
                                    <DialogClose asChild>
                                        <Button
                                            variant="secondary"
                                            onClick={closeModal}
                                            type="button"
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>

                                    <Button
                                        variant="destructive"
                                        disabled={isPending}
                                        type="submit"
                                    >
                                        {isPending
                                            ? 'Deleting...'
                                            : 'Delete account'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
