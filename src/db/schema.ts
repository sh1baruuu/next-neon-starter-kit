import { pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("role", [
    "admin",
    "staff",
    "client"
]);

export const userStatusEnum = pgEnum("status", [
    "active",
    "disabled"
]);

export const userTable = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password_hash: text().notNull(),
    role: userRoleEnum().default("client"),
    avatar: text(),
    status: userStatusEnum().default("active"),
    email_verified_at: timestamp("email_verified_at"),
    created_at: timestamp("created_at").defaultNow(),
    last_login: timestamp("last_login"),
});

export const sessionTable = pgTable("sessions", {
    id: serial("id").primaryKey(),
    user_id: serial("user_id").references(() => userTable.id, { onDelete: "cascade" }),
    expires_at: timestamp("expires_at").notNull(),
    created_at: timestamp("created_at").defaultNow(),
});


// Relations
import { relations } from "drizzle-orm";

export const userRelations = relations(userTable, ({ many }) => ({
    sessions: many(sessionTable),
}));

export const sessionRelations = relations(sessionTable, ({ one }) => ({
    user: one(userTable, {
        fields: [sessionTable.user_id],
        references: [userTable.id],
    }),
}));
