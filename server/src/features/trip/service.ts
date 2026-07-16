import { eq } from "drizzle-orm"
import { db } from "../../db/index.js"
import { tripsTable, type CreateTripSchema, type TripType } from "./schema.js"

export const getAllTrips = async () => {
    return await db.query.tripsTable.findMany()
}

export const getTripById = async (id: string) => {
    return await db.query.tripsTable.findFirst({
        where: eq(tripsTable.id, id)
    })
}

export const createTrip = async (trip: CreateTripSchema) => {
    return await db.insert(tripsTable).values(trip).returning()
}