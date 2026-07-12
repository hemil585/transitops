import { z } from "zod";

export const signInSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(8, "Password must contain at least 8 characters"),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const roleSchema = z.enum([
    "fleet_manager",
    "dispatcher",
    "safety_officer",
    "financial_analyst",
]);

export const tokenPayloadSchema = z.object({
    userId: z.string(),
    role: roleSchema,
});

export type TokenPayload = z.infer<typeof tokenPayloadSchema>;
export type Role = z.infer<typeof roleSchema>;