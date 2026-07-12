import type { Role } from "../features/auth/validation.js";

declare global {
    namespace Express {
        interface Request {
            user: {
                userId: string;
                role: Role;
            };
        }
    }
}