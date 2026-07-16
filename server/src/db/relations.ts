import { relations } from "drizzle-orm";
import { rolesTable, usersTable } from "../features/auth/schema.js";
import { driversTable, vehiclesTable } from "./schema.js";
import { tripsTable } from "../features/trip/schema.js";

export const usersRelations = relations(usersTable, ({ one }) => ({
    role: one(rolesTable, {
        fields: [usersTable.roleId],
        references: [rolesTable.id],
    }),
}));

export const rolesRelations = relations(rolesTable, ({ many }) => ({
    users: many(usersTable),
}));

export const vehiclesRelations = relations(
    vehiclesTable,
    ({ many }) => ({
        trips: many(tripsTable),
    }),
);

export const driversRelations = relations(
    driversTable,
    ({ many }) => ({
        trips: many(tripsTable),
    }),
);

export const tripsRelations = relations(
    tripsTable,
    ({ one }) => ({
        vehicle: one(vehiclesTable, {
            fields: [tripsTable.vehicleId],
            references: [vehiclesTable.id],
        }),

        driver: one(driversTable, {
            fields: [tripsTable.driverId],
            references: [driversTable.id],
        }),

        createdBy: one(usersTable, {
            fields: [tripsTable.createdBy],
            references: [usersTable.id],
        }),
    }),
);