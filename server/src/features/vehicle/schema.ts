import {
    doublePrecision,
    index,
    integer,
    numeric,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type z from "zod";

export const vehicleStatusEnum = pgEnum("vehicle_status", [
    "available",
    "on_trip",
    "in_shop",
    "retired",
]);

export const vehicleTypeEnum = pgEnum("vehicle_type", [
    "truck",
    "van",
    "pickup",
    "trailer",
    "motorcycle",
    "car",
    "bus",
    "other",
]);

export const vehiclesTable = pgTable("vehicles", {
    id: uuid("id").defaultRandom().primaryKey(),
    registrationNumber: text("registration_number").notNull().unique(),
    name: text("name").notNull(),
    model: text("model").notNull(),
    type: vehicleTypeEnum("type").notNull(),
    maxLoadCapacity: doublePrecision("max_load_capacity").notNull(),
    odometer: integer("odometer").default(0).notNull(),
    acquisitionCost: numeric("acquisition_cost", {
        precision: 12,
        scale: 2,
    }).notNull(),
    region: text("region"),
    status: vehicleStatusEnum("status")
        .default("available")
        .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
},
    (table) => [
        index("vehicles_status_idx").on(table.status),
        index("vehicles_type_idx").on(table.type),
        index("vehicles_region_idx").on(table.region),
        index("vehicles_status_type_idx").on(table.status, table.type),
    ]

)

export const vehiclesTableSchema = createSelectSchema(vehiclesTable);
export const createVehicleSchema = createInsertSchema(vehiclesTable).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export type VehicleType = z.infer<typeof vehiclesTableSchema>
export type CreateVehicleType = z.infer<typeof createVehicleSchema>

export const updateVehicleSchema = vehiclesTableSchema.partial();
export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>;