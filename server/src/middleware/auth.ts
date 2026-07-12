import type { Request, NextFunction, Response } from "express";
import { verifyJWT } from "../features/auth/helper.js";

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const token = authHeader.split(" ")[1] || "";

        req.user = verifyJWT(token);

        next();
    } catch {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};