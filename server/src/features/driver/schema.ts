import {
    date,
    index,
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uniqueIndex,
    uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod";
export const driverStatusEnum = pgEnum("driver_status", [
    "available",
    "on_trip",
    "off_duty",
    "suspended",
]);

export const licenseCategoryEnum = pgEnum("license_category", [
    "motorcycle",
    "light_motor_vehicle",
    "heavy_goods_vehicle",
    "passenger_vehicle",
]);

export const driversTable = pgTable(
    "drivers",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        firstName: text("first_name").notNull(),
        lastName: text("last_name").notNull(),
        email: text("email").unique(),
        phone: text("phone").notNull(),
        licenseNumber: text("license_number").notNull().unique(),
        licenseCategory: licenseCategoryEnum("license_category").notNull(),
        licenseExpiryDate: date("license_expiry_date").notNull(),
        safetyScore: integer("safety_score").default(100).notNull(),
        status: driverStatusEnum("status").default("available").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (table) => [
        uniqueIndex("driver_license_idx").on(table.licenseNumber),
        index("driver_status_idx").on(table.status),
        index("driver_license_expiry_idx").on(table.licenseExpiryDate),
    ],
);

export const createDriverSchema = createInsertSchema(driversTable).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export type CreateDriverInput = z.infer<typeof createDriverSchema>;

export const updateDriverSchema = createDriverSchema.partial();
export type UpdateDriverInput = z.infer<typeof updateDriverSchema>;