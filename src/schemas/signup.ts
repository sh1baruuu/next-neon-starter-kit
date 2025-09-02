import z from "zod";

export const signupFormSchema = z
    .object({
        name: z.string().min(1, 'Please enter your name'),
        email: z.string().min(1, 'Please enter your email').regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email'),
        password: z.string().min(1, 'Please enter your password').min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string().min(1, 'Please confirm your password').min(6, 'Confirm Password must be at least 6 characters'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export type SignupFormType = z.infer<typeof signupFormSchema>;