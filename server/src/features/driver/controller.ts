import type { Request, Response } from "express"
import { createDriver, deleteDriver, getAllDrivers, getDriverById, updateDriver } from "./service.js"
import { createDriverSchema, updateDriverSchema } from "./schema.js"


export const getAll = async (_req: Request, res: Response) => {
    try {
        const drivers = await getAllDrivers()
        return res.json(drivers)
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const driver = await getDriverById(id)

        if (!driver) {
            return res.status(400).json({
                message: "Driver not found."
            })
        }

        return res.json(driver)
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const validation = createDriverSchema.safeParse(req.body)

        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues[0]?.message,
            });
        }

        const licenseExpiryDate = new Date(validation.data.licenseExpiryDate)
        const today = new Date()

        today.setHours(0, 0, 0, 0)

        if (licenseExpiryDate < today) {
            return res.status(400).json({
                message: "Driver license has already expired.",
            });
        }

        const driver = await createDriver(validation.data)

        return res.status(201).json({
            message: "Driver created successfully.",
            driver,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const validation = updateDriverSchema.safeParse(req.body)

        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues[0]?.message,
            });
        }

        const driver = await getDriverById(req.params.id as string)

        if (!driver) {
            return res.status(400).json({
                message: "Driver not found."
            })
        }

        const updatedDriver = await updateDriver(driver.id, validation.data)

        return res.status(201).json({
            message: "Driver updated successfully.",
            driver: updatedDriver
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const validation = updateDriverSchema.safeParse(req.body)

        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues[0]?.message,
            });
        }

        const driver = await getDriverById(req.params.id as string)

        if (!driver) {
            return res.status(400).json({
                message: "Driver not found."
            })
        }

        await deleteDriver(req.params.id as string)

        return res.status(201).json({
            message: "Driver deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}