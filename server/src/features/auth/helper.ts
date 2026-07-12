import jwt from 'jsonwebtoken'
import { env } from '../../config/env.js';
import { tokenPayloadSchema, type TokenPayload } from './validation.js';

export function comparePassword(enteredPassword: string, password: string): boolean {
    return enteredPassword === password
}

export function generateJWT(payload: TokenPayload, options: jwt.SignOptions): string {
    return jwt.sign(payload, env.JWT_SECRET, options);
}

export function verifyJWT(token: string) {
    const payload = jwt.verify(token, env.JWT_SECRET);

    return tokenPayloadSchema.parse(payload);
}