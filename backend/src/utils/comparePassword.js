import bcrypt from 'bcryptjs';

export const comparePassword = async (password, hash) => {
  if (!hash) return false;
  if (String(hash).startsWith('$2a$') || String(hash).startsWith('$2b$') || String(hash).startsWith('$2y$')) {
    return bcrypt.compare(password, hash);
  }
  return password === hash;
};
