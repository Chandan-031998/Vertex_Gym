import jwt from 'jsonwebtoken';
import { env } from './env.js';

export const signJwt = (payload) => jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
export const verifyJwt = (token) => jwt.verify(token, env.jwtSecret);
