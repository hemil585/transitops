import { relations } from "drizzle-orm";
import { rolesTable, usersTable } from "../features/auth/schema.js";

export const usersRelations = relations(usersTable, ({ one }) => ({
    role: one(rolesTable, {
        fields: [usersTable.roleId],
        references: [rolesTable.id],
    }),
}));

export const rolesRelations = relations(rolesTable, ({ many }) => ({
    users: many(usersTable),
}));