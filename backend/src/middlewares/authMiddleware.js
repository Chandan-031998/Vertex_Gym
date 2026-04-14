import { verifyJwt } from '../config/jwt.js';

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  try {
    req.user = verifyJwt(token);
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
