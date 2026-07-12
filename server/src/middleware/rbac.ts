import type { NextFunction, Request, Response } from "express";
import type { Role } from "./types.js";

export const authorize = (...allowedRoles: Role[]) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (!allowedRoles.includes(req.user.role as Role)) {
        return res.status(403).json({
            message: "Forbidden",
        });
    }
    
    next();
};