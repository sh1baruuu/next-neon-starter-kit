'use client';

import { updateUserPassword } from '@/app/action/user';
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
import { useCustomAlertToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const FormSchema = z
    .object({
        current_password: z
            .string()
            .min(1, 'Please enter your current password'),
        password: z
            .string()
            .min(1, 'Please enter a new password')
            .min(6, 'New password must be at least 6 characters'),
        password_confirmation: z
            .string()
            .min(1, 'Please confirm your new password'),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
        path: ['password_confirmation'],
    });

type FormValueType = z.infer<typeof FormSchema>;

export default function PasswordTab() {
    const [isPending, startTransition] = useTransition();
    const toast = useCustomAlertToast();

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            current_password: '',
            password: '',
            password_confirmation: '',
        },
    });

    const updatePassword = (data: FormValueType) => {
        startTransition(async () => {
            try {
                const res = await updateUserPassword(
                    data.current_password,
                    data.password
                );

                if (!res.success) {
                    if (res.error) {
                        throw new Error(res.error);
                    }

                    if (res.currentPasswordError) {
                        form.setError('current_password', {
                            message: res.currentPasswordError,
                        });
                        return;
                    }

                    if (res.newPasswordError) {
                        form.setError('password', {
                            message: res.newPasswordError,
                        });
                        return;
                    }
                }

                toast.showSuccessToast({
                    title: 'Password updated successfully',
                    description: 'Your password has been updated successfully',
                });

                form.reset();
            } catch (error) {
                console.error('Error updating password:', error);
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
                onSubmit={form.handleSubmit(updatePassword)}
                className="space-y-6"
            >
                <FormField
                    control={form.control}
                    name="current_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="current_password">
                                Current password
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="current_password"
                                    type="password"
                                    placeholder="Current password"
                                    autoComplete="current-password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="password">
                                New password
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="New password"
                                    autoComplete="new-password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password_confirmation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="password_confirmation">
                                Confirm password
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    placeholder="Confirm password"
                                    autoComplete="new-password"
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
                        {isPending ? 'Saving...' : 'Save password'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
