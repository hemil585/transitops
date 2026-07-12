import jwt from 'jsonwebtoken'
import { env } from '../../config/env.js';
import type { TokenPayload } from './validation.js';

export function comparePassword(enteredPassword: string, password: string): boolean {
    return enteredPassword === password
}

export function generateJWT(payload: TokenPayload, options: jwt.SignOptions): string {
    return jwt.sign(payload, env.JWT_SECRET, options);
}

export function verifyJWT(token: string) {
    try {
        return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    } catch (error) {
        return false
    }
}