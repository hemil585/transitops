import { eq } from "drizzle-orm"
import { db } from "../../db/index.js"
import { driversTable, type CreateDriverInput, type UpdateDriverInput } from "./schema.js"

export const getAllDrivers = async () => {
    return await db.query.driversTable.findMany()
}

export const getDriverById = async (id: string) => {
    return await db.query.driversTable.findFirst({
        where: eq(driversTable.id, id)
    })
}

export const createDriver = async (driver: CreateDriverInput) => {
    return await db.insert(driversTable).values(driver)
}

export const updateDriver = async (id: string, driver: UpdateDriverInput) => {
    return await db.update(driversTable).set(driver).where(eq(driversTable.id, id))
}

export const deleteDriver = async (id: string) => {
    return await db.delete(driversTable).where(eq(driversTable.id, id))
}
