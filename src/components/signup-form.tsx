'use client';

import { signupAction } from '@/app/action/auth';
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
import { cn } from '@/lib/utils';
import { signupFormSchema, type SignupFormType } from '@/schemas/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, AlertIcon, AlertTitle } from './ui/alert';
import { Loader2, TriangleAlert } from 'lucide-react';

export default function SignupForm({ className }: { className?: string }) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const form = useForm<SignupFormType>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (data: SignupFormType) => {
        setError(null);
        startTransition(async () => {
            try {
                const result = await signupAction(data);

                if (result?.emailError) {
                    form.setError('email', {
                        message: result.emailError,
                    });
                    return;
                }

                if (result?.error) {
                    setError(result.error);
                }

                if (result?.success) {
                    router.push('/dashboard');
                }
            } catch (error) {
                console.error('Signup error:', error);
            }
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className={cn('flex flex-col gap-6', className)}
            >
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                </div>

                <div className="grid gap-6">
                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        type="text"
                                        placeholder="Enter your name"
                                        autoComplete='off'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        type="email"
                                        placeholder="Enter your email"
                                        autoComplete='off'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        type="password"
                                        placeholder="Enter your password"
                                        autoComplete='new-password'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Confirm Password */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        type="password"
                                        placeholder="Confirm your password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {error && (
                        <Alert
                            variant="destructive"
                            appearance="light"
                            close={true}
                            onClose={() => setError(null)}
                        >
                            <AlertIcon>
                                <TriangleAlert />
                            </AlertIcon>
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    )}
                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing up...
                            </>
                        ) : (
                            'Sign up'
                        )}
                    </Button>

                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-background text-muted-foreground relative z-10 px-2">
                            Already have an account?
                        </span>
                    </div>

                    <Button
                        variant="outline"
                        type="button"
                        className="w-full"
                        onClick={() => router.push('/login')}
                    >
                        Sign in to existing account
                    </Button>
                </div>
            </form>
        </Form>
    );
}
