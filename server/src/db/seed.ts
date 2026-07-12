import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { randomUUID } from "crypto";

import { rolesTable, usersTable } from "./schema.js";

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

    console.log("Database seeded successfully!");

    await pool.end();
}

seed().catch(console.error);