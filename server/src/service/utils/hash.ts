import argon2 from 'argon2';

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Failed to hash password');
  }
}

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  try {
    const isValid = await argon2.verify(hash, password);
    return isValid;
  } catch (error) {
    console.error('Error verifying password:', error);
    throw new Error('Failed to verify password');
  }
};