import type { Request, Response } from "express";

import {
    createVehicle,
    deleteVehicle,
    findVehicleById,
    findVehicleByRegistrationNumber,
    getAllVehicles,
    updateVehicle,
} from "./service.js";
import { createVehicleSchema, updateVehicleSchema } from "./schema.js";

export const create = async (req: Request, res: Response) => {
    try {
        const validation = createVehicleSchema.safeParse(req.body);
        console.log(validation);


        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues[0]?.message,
            });
        }

        const existingVehicle = await findVehicleByRegistrationNumber(
            validation.data.registrationNumber,
        );

        if (existingVehicle) {
            return res.status(409).json({
                message: "Vehicle registration number already exists.",
            });
        }

        const vehicle = await createVehicle(validation.data);

        return res.status(201).json({
            message: "Vehicle created successfully.",
            vehicle,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const vehicles = await getAllVehicles();

        return res.json(vehicles);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const vehicle = await findVehicleById(req.params.id as string);

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found.",
            });
        }

        return res.json(vehicle);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const update = async (req: Request, res: Response) => {
    try {        
        const validation = updateVehicleSchema.safeParse(req.body);
        console.log(validation);


        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues[0]?.message,
            });
        }

        const vehicle = await findVehicleById(req.params.id as string);

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found.",
            });
        }

        const updatedVehicle = await updateVehicle(
            req.params.id as string,
            validation.data,
        );

        return res.json({
            message: "Vehicle updated successfully.",
            vehicle: updatedVehicle,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const vehicle = await findVehicleById(req.params.id as string);

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found.",
            });
        }

        await deleteVehicle(req.params.id as string);

        return res.json({
            message: "Vehicle deleted successfully.",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};