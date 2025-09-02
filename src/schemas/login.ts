import z from "zod";

export const loginFormSchema = z.object({
    email: z.string().min(1, 'Please enter your email').regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email'),
    password: z.string().min(1, 'Please enter your password'),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;