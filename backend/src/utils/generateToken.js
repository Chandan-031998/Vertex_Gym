import { signJwt } from '../config/jwt.js';

export const generateToken = (user) => signJwt({ id: user.id, role: user.role, email: user.email });
