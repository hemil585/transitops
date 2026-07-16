import "dotenv/config";
import { randomUUID } from "crypto";
import { driversTable, rolesTable, usersTable } from "./schema.js";
import { vehiclesTable } from "../features/vehicle/schema.js";
import { sql } from "drizzle-orm";
import { db } from "./index.js";
import { tripsTable } from "../features/trip/schema.js";

async function seed() {
    console.log("Cleaning database...");

    await db.execute(sql`
        TRUNCATE TABLE
            drivers,
            vehicles,
            users,
            roles
        RESTART IDENTITY CASCADE;
    `);

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

    await db.insert(driversTable).values([
        {
            firstName: "John",
            lastName: "Smith",
            email: "john.smith@transitops.com",
            phone: "+1-555-2001",
            licenseNumber: "DL100001",
            licenseCategory: "heavy_goods_vehicle",
            licenseExpiryDate: "2029-06-15",
            safetyScore: 98,
            status: "available",
        },
        {
            firstName: "Maria",
            lastName: "Garcia",
            email: "maria.garcia@transitops.com",
            phone: "+1-555-2002",
            licenseNumber: "DL100002",
            licenseCategory: "light_motor_vehicle",
            licenseExpiryDate: "2028-11-20",
            safetyScore: 95,
            status: "on_trip",
        },
        {
            firstName: "Ahmed",
            lastName: "Hassan",
            email: "ahmed.hassan@transitops.com",
            phone: "+1-555-2003",
            licenseNumber: "DL100003",
            licenseCategory: "passenger_vehicle",
            licenseExpiryDate: "2027-09-12",
            safetyScore: 92,
            status: "off_duty",
        },
        {
            firstName: "Sofia",
            lastName: "Martinez",
            email: "sofia.martinez@transitops.com",
            phone: "+1-555-2004",
            licenseNumber: "DL100004",
            licenseCategory: "heavy_goods_vehicle",
            licenseExpiryDate: "2030-02-18",
            safetyScore: 100,
            status: "available",
        },
        {
            firstName: "Lucas",
            lastName: "Muller",
            email: "lucas.muller@transitops.com",
            phone: "+1-555-2005",
            licenseNumber: "DL100005",
            licenseCategory: "light_motor_vehicle",
            licenseExpiryDate: "2026-12-31",
            safetyScore: 78,
            status: "suspended",
        },
    ]);

    const vehicles = await db.query.vehiclesTable.findMany();
    const drivers = await db.query.driversTable.findMany();
    const manager = await db.query.usersTable.findFirst();

    await db.insert(tripsTable).values([
        {
            tripNumber: "TRIP-1001",
            source: "Ahmedabad",
            destination: "Surat",
            vehicleId: vehicles[0]!.id,
            driverId: drivers[0]!.id,
            cargoWeight: 1200,
            plannedDistance: 265,
            actualDistance: null,
            startOdometer: 18500,
            endOdometer: null,
            status: "dispatched",
            createdBy: manager!.id,
            dispatchedAt: new Date("2026-07-15T08:00:00"),
            completedAt: null,
        },
        {
            tripNumber: "TRIP-1002",
            source: "Vadodara",
            destination: "Rajkot",
            vehicleId: vehicles[1]!.id,
            driverId: drivers[1]!.id,
            cargoWeight: 8500,
            plannedDistance: 310,
            actualDistance: 318,
            startOdometer: 74250,
            endOdometer: 74568,
            status: "completed",
            createdBy: manager!.id,
            dispatchedAt: new Date("2026-07-14T09:30:00"),
            completedAt: new Date("2026-07-14T16:10:00"),
        },
        {
            tripNumber: "TRIP-1003",
            source: "Mumbai",
            destination: "Pune",
            vehicleId: vehicles[2]!.id,
            driverId: drivers[2]!.id,
            cargoWeight: 950,
            plannedDistance: 150,
            actualDistance: null,
            startOdometer: 30210,
            endOdometer: null,
            status: "draft",
            createdBy: manager!.id,
            dispatchedAt: null,
            completedAt: null,
        },
        {
            tripNumber: "TRIP-1004",
            source: "Delhi",
            destination: "Jaipur",
            vehicleId: vehicles[3]!.id,
            driverId: drivers[3]!.id,
            cargoWeight: 3200,
            plannedDistance: 280,
            actualDistance: null,
            startOdometer: 120500,
            endOdometer: null,
            status: "dispatched",
            createdBy: manager!.id,
            dispatchedAt: new Date("2026-07-16T06:45:00"),
            completedAt: null,
        },
        {
            tripNumber: "TRIP-1005",
            source: "Chennai",
            destination: "Bengaluru",
            vehicleId: vehicles[4]!.id,
            driverId: drivers[4]!.id,
            cargoWeight: 450,
            plannedDistance: 350,
            actualDistance: 346,
            startOdometer: 65000,
            endOdometer: 65346,
            status: "completed",
            createdBy: manager!.id,
            dispatchedAt: new Date("2026-07-13T07:00:00"),
            completedAt: new Date("2026-07-13T13:20:00"),
        },
    ]);

    console.log("Database seeded successfully!");
}

seed().catch(console.error);