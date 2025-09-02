'use server';

import { db } from "@/db";
import { userTable } from "@/db/schema";
import { decrypt } from "@/lib/jwt";
import { createSession, deleteSession } from "@/lib/session";
import { LoginFormType } from "@/schemas/login";
import { SignupFormType } from "@/schemas/signup";
import bcrypt from 'bcrypt';
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function signupAction({ name, email, password }: SignupFormType) {
    try {

        const hashedPassword = await bcrypt.hash(password, 10)

        const existingUser = await db
            .select()
            .from(userTable)
            .where(eq(userTable.email, email))

        if (existingUser.length > 0) {
            return {
                success: false,
                emailError: 'Email already in use'
            }
        }

        const data = await db
            .insert(userTable)
            .values({
                name,
                email,
                password_hash: hashedPassword,
            })
            .returning()

        const user = data[0]

        if (!user) {
            return {
                success: false,
                error: 'An error occurred while creating your account',
            }
        }

        await createSession({id: user.id, email: user.email, name: user.name, avatar: user.avatar, role: user.role });

        return { success: true };
    } catch {
        return {
            success: false,
            error: 'Something went wrong. Please try again later',
        }
    }
}


export async function loginAction({ email, password }: LoginFormType) {
    try {
        const users = await db
            .select()
            .from(userTable)
            .where(eq(userTable.email, email))
            .limit(1)

        const user = users[0];

        if (!user) {
            return {
                success: false,
                error: 'Invalid email or password',
            };
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
            return {
                success: false,
                error: 'Invalid email or password',
            };
        }

        await createSession({id: user.id, email: user.email, name: user.name, avatar: user.avatar, role: user.role });

        return { success: true };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: 'Something went wrong. Please try again later'
        }
    }
}


export async function logoutAction() {
    try {
        const cookie = (await cookies()).get('session')?.value
        const session = await decrypt(cookie)
        const sessionId = Number(session?.sessionId)

        await deleteSession({ sessionId })

        return {
            success: true
        }
    } catch {
        return {
            success: false,
            error: 'Something went wrong. Please try again later'
        }
    }
}