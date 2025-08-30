import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const comparePassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
