import { eq } from "drizzle-orm"
import { db } from "../../db/index.js"
import { vehiclesTable, type CreateVehicleType, type UpdateVehicleInput } from "./schema.js"

export const getAllVehicles = async () => {
    return await db.query.vehiclesTable.findMany()
}

export const findVehicleById = async (id: string) => {
    return await db.query.vehiclesTable.findFirst({
        where: eq(vehiclesTable.id, id)
    })
}

export const findVehicleByRegistrationNumber = async (registrationNumber: string) => {
    return await db.query.vehiclesTable.findFirst({
        where: eq(vehiclesTable.registrationNumber, registrationNumber)
    })
}

export const createVehicle = async (vehicle: CreateVehicleType) => {
    return await db.insert(vehiclesTable).values(vehicle)
}

export const deleteVehicle = async (vehicleId: string) => {
    return await db.delete(vehiclesTable).where(eq(vehiclesTable.id, vehicleId))
}

export const updateVehicle = async (id: string, vehicle: UpdateVehicleInput) => {
    return await db.update(vehiclesTable).set(vehicle).where(eq(vehiclesTable.id, id))
}