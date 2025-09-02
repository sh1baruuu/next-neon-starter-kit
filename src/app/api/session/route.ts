import { db } from "@/db"
import { userTable } from "@/db/schema"
import { verifySession } from "@/lib/dal"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const { userId } = await verifySession();

        const res = await db.query.userTable.findFirst({
            where: eq(userTable.id, Number(userId)),
            columns: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatar: true
            }
        });

        return NextResponse.json({ success: true, user: res }, { status: 200 })
    } catch {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
    }
}