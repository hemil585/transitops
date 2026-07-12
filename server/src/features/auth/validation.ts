import { z } from "zod";

export const signInSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(8, "Password must contain at least 8 characters"),
});

export type SignInInput = z.infer<typeof signInSchema>;

const tokenPayloadSchema = z.object({
    userId: z.string().optional(),
    refreshToken: z.string().optional(),
});

export type TokenPayload = z.infer<typeof tokenPayloadSchema>;