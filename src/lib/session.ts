import { db } from '@/db'
import { sessionTable } from '@/db/schema'
import { UserInfoType } from '@/types'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { encrypt } from './jwt'

export async function createSession(user: UserInfoType) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const data = await db
        .insert(sessionTable)
        .values({
            user_id: user.id,
            expires_at: expiresAt,
            created_at: new Date(),
        })
        .returning({ sessionId: sessionTable.id, userId: sessionTable.user_id })

    const userId = data[0].userId
    const sessionId = data[0].sessionId

    const session = await encrypt({ userId, sessionId, user, expiresAt })

    const cookieStore = await cookies()
    cookieStore.set('session', session, {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function deleteSession({ sessionId }: { sessionId: number }) {
    await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));

    const cookieStore = await cookies();

    cookieStore.delete('session');
}