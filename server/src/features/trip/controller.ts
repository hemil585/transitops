import type { Request, Response } from "express"
import { createTrip, getAllTrips, getTripById } from "./service.js"
import { createTripsSchema } from "./schema.js"
import { findVehicleById } from "../vehicle/service.js"
import { getDriverById } from "../driver/service.js"

export const getAll = async (_req: Request, res: Response) => {
    try {
        const trips = await getAllTrips()
        return res.json(trips)
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export const getOne = async (req: Request, res: Response) => {
    try {
        const trip = await getTripById(req.params.id as string)

        if (!trip) {
            return res.json({
                message: "Trip not found."
            })
        }

        return res.json(trip)
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const validation = createTripsSchema.safeParse(req.body)

        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues[0]?.message,
            });
        }

        const vehicle = await findVehicleById(validation.data.vehicleId)
        if (!vehicle) {
            return res.json({
                message: 'Vehicle not available.'
            })
        }

        const driver = await getDriverById(validation.data.driverId)
        if (!driver || driver.status !== 'available') {
            return res.json({
                message: 'Driver not available.'
            })
        }

        if (validation.data.cargoWeight > vehicle.maxLoadCapacity) {
            return res.json({
                message: `Capacity exceeded by ${validation.data.cargoWeight - vehicle.maxLoadCapacity} kg`
            })
        }

        const trip = await createTrip(validation.data)

        return res.json({
            message: 'Trip created successfuly',
            trip
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}