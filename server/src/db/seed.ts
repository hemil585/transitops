import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { randomUUID } from "crypto";

import { rolesTable, usersTable } from "./schema.js";
import { vehiclesTable } from "../features/vehicle/schema.js";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
});

const db = drizzle(pool);

async function seed() {
    console.log("Seeding database...");

    const fleetManagerRoleId = randomUUID();
    const dispatcherRoleId = randomUUID();
    const safetyOfficerRoleId = randomUUID();
    const financialAnalystRoleId = randomUUID();

    await db.insert(rolesTable).values([
        {
            id: fleetManagerRoleId,
            name: "fleet_manager",
            description: "Fleet Manager",
        },
        {
            id: dispatcherRoleId,
            name: "dispatcher",
            description: "Dispatcher",
        },
        {
            id: safetyOfficerRoleId,
            name: "safety_officer",
            description: "Safety Officer",
        },
        {
            id: financialAnalystRoleId,
            name: "financial_analyst",
            description: "Financial Analyst",
        },
    ]);

    await db.insert(usersTable).values([
        {
            fname: "James",
            lname: "Anderson",
            email: "james.anderson@transitops.com",
            password: "Password@123",
            phone: "+1-555-1001",
            roleId: fleetManagerRoleId,
        },
        {
            fname: "Emily",
            lname: "Johnson",
            email: "emily.johnson@transitops.com",
            password: "Password@123",
            phone: "+1-555-1002",
            roleId: dispatcherRoleId,
        },
        {
            fname: "Michael",
            lname: "Brown",
            email: "michael.brown@transitops.com",
            password: "Password@123",
            phone: "+1-555-1003",
            roleId: safetyOfficerRoleId,
        },
        {
            fname: "Sophia",
            lname: "Wilson",
            email: "sophia.wilson@transitops.com",
            password: "Password@123",
            phone: "+1-555-1004",
            roleId: financialAnalystRoleId,
        },
    ]);

    await db.insert(vehiclesTable).values([
        {
            registrationNumber: "MH12AB1001",
            name: "Van-01",
            model: "Ford Transit",
            type: "van",
            maxLoadCapacity: 1200,
            odometer: 18500,
            acquisitionCost: "42000.00",
            region: "North",
            status: "available",
        },
        {
            registrationNumber: "MH12AB1002",
            name: "Truck-01",
            model: "Tata Prima",
            type: "truck",
            maxLoadCapacity: 18000,
            odometer: 74250,
            acquisitionCost: "95000.00",
            region: "West",
            status: "on_trip",
        },
        {
            registrationNumber: "MH12AB1003",
            name: "Pickup-01",
            model: "Toyota Hilux",
            type: "pickup",
            maxLoadCapacity: 1000,
            odometer: 30210,
            acquisitionCost: "38000.00",
            region: "South",
            status: "in_shop",
        },
        {
            registrationNumber: "MH12AB1004",
            name: "Bus-01",
            model: "Volvo B8R",
            type: "bus",
            maxLoadCapacity: 8000,
            odometer: 120500,
            acquisitionCost: "145000.00",
            region: "East",
            status: "available",
        },
        {
            registrationNumber: "MH12AB1005",
            name: "Car-01",
            model: "Toyota Corolla",
            type: "car",
            maxLoadCapacity: 450,
            odometer: 65000,
            acquisitionCost: "25000.00",
            region: "Central",
            status: "retired",
        },
    ]);

    console.log("Database seeded successfully!");

    await pool.end();
}

seed().catch(console.error);