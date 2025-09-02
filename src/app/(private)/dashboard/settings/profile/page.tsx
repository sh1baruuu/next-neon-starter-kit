'use client';

import { updateUserProfile } from '@/app/action/user';
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
import { queryClient, useSharedData } from '@/context/ShareDataContext';
import { useCustomAlertToast } from '@/hooks/use-toast';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Define validation schema
const profileSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z
        .string()
        .min(1, 'Email is required')
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'),
});

export default function ProfileTab() {
    const { user } = useSharedData();
    const toast = useCustomAlertToast();
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name ?? '',
            email: user?.email ?? '',
        },
    });

    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name,
                email: user.email,
            });
        }
    }, [user, form]);

    const onSubmit = async (data: Partial<User>) => {
        startTransition(async () => {
            try {
                const res = await updateUserProfile(data);

                if (!res.success) {
                    throw new Error(res.error);
                }

                toast.showSuccessToast({
                    title: 'User updated successfully',
                    description: 'Your profile has been updated successfully',
                });

                queryClient.invalidateQueries({ queryKey: ['session'] });
            } catch (error) {
                console.error('Error updating profile:', error);
                toast.showAlertToast({
                    title: 'Password update failed',
                    description:
                        'An unexpected error occurred while updating password',
                });
            }
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <FormControl>
                                <Input
                                    id="name"
                                    placeholder="Full name"
                                    autoComplete="name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="email">Email address</FormLabel>
                            <FormControl>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email address"
                                    autoComplete="username"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center gap-4">
                    <Button
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending ? 'Saving...' : 'Save changes'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
