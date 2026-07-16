import {
    doublePrecision,
    index,
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uniqueIndex,
    uuid,
} from "drizzle-orm/pg-core";
import { vehiclesTable } from "../vehicle/schema.js";
import { driversTable } from "../driver/schema.js";
import { usersTable } from "../auth/schema.js";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type z from "zod";

export const tripStatusEnum = pgEnum("trip_status", [
    "draft",
    "dispatched",
    "completed",
    "cancelled",
]);

export const tripsTable = pgTable(
    "trips",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        tripNumber: text("trip_number").notNull().unique(),
        source: text("source").notNull(),
        destination: text("destination").notNull(),
        vehicleId: uuid("vehicle_id")
            .references(() => vehiclesTable.id)
            .notNull(),
        driverId: uuid("driver_id")
            .references(() => driversTable.id)
            .notNull(),
        cargoWeight: doublePrecision("cargo_weight").notNull(),
        plannedDistance: doublePrecision("planned_distance").notNull(),
        actualDistance: doublePrecision("actual_distance"),
        startOdometer: integer("start_odometer").notNull(),
        endOdometer: integer("end_odometer"),
        status: tripStatusEnum("status")
            .default("draft")
            .notNull(),
        createdBy: uuid("created_by")
            .references(() => usersTable.id)
            .notNull(),
        dispatchedAt: timestamp("dispatched_at"),
        completedAt: timestamp("completed_at"),
        createdAt: timestamp("created_at")
            .defaultNow()
            .notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .notNull(),
    },
    (table) => [
        uniqueIndex("trip_number_idx").on(table.tripNumber),
        index("trip_vehicle_idx").on(table.vehicleId),
        index("trip_driver_idx").on(table.driverId),
        index("trip_status_idx").on(table.status),
    ],
);

export const tripsTableSchema = createSelectSchema(tripsTable)
export const createTripsSchema = createInsertSchema(tripsTable).omit({
    id: true,
    createdAt: true,
    updatedAt: true
})

export type TripType = z.infer<typeof tripsTableSchema>
export type CreateTripSchema = z.infer<typeof createTripsSchema>
