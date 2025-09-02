'use server'

import { db } from "@/db";
import { userTable } from "@/db/schema";
import { verifySession } from "@/lib/dal";
import { User } from "@/types";
import bcrypt from 'bcrypt';
import { eq } from "drizzle-orm";

export async function updateUserPassword(currentPassword: string, newPassword: string) {
    try {
        const { userId } = await verifySession();

        const users = await db
            .select()
            .from(userTable)
            .where(eq(userTable.id, Number(userId)))
            .limit(1)

        const user = users[0];

        const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);

        if (!isValidPassword) {
            return {
                success: false,
                currentPasswordError: 'The current password you entered is incorrect',
            };
        }

        const isPasswordSame = await bcrypt.compare(newPassword, user.password_hash);

        if (isPasswordSame) {
            return {
                success: false,
                newPasswordError: 'New password cannot be the same as the current password',
            };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const result = await db.update(userTable).set({
            password_hash: hashedPassword
        }).where(eq(userTable.id, Number(userId))).returning({ id: userTable.id });

        return {
            success: true,
            user: result[0]
        }

    } catch (error) {
        console.error('Update password error:', error)
        return {
            success: false,
            error: 'An unexpected error occurred while updating password',
        }
    }
}


export async function updateUserProfile(userData: Partial<User>) {
    try {
        const { userId } = await verifySession();

        const result = await db.update(userTable).set({
            name: userData.name,
            email: userData.email,
            // Add other fields as needed
        }).where(eq(userTable.id, Number(userId))).returning({ id: userTable.id });

        return {
            success: true,
            user: result[0]
        }

    } catch {
        return {
            success: false,
            error: 'An unexpected error occurred while updating profile',
        }
    }
}


export async function deleteUserAccount(currentPassword: string) {
    try {
        const { userId } = await verifySession();

        const users = await db
            .select()
            .from(userTable)
            .where(eq(userTable.id, Number(userId)))
            .limit(1)

        const user = users[0];

        const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);

        if (!isValidPassword) {
            return {
                success: false,
                currentPasswordError: 'The password you entered is incorrect',
            };
        }

        const result = await db.delete(userTable).where(eq(userTable.id, Number(userId))).returning({ id: userTable.id });


        return {
            success: true,
            user: result[0]
        }

    } catch {
        return {
            success: false,
            error: 'An unexpected error occurred while deleting user',
        }
    }
}