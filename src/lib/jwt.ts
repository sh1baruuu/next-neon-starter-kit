import { UserInfoType } from '@/types';
import { SignJWT, jwtVerify } from 'jose';
import 'server-only';

const secretKey = process.env.SESSION_SECRET
export const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: { userId: number; sessionId: number; user: UserInfoType; expiresAt: Date }) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch {}
}

