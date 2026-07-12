import {
    boolean,
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";

export const rolesTable = pgTable("roles", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersTable = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    fname: text("fname").notNull(),
    lname: text("lname").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    phone: text("phone"),
    isActive: boolean("is_active").default(true).notNull(),
    roleId: uuid("role_id").references(() => rolesTable.id, { onDelete: "restrict", }).notNull(),
    lastLoginAt: timestamp("last_login_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});