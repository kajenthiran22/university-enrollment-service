import bcrypt from "bcrypt";
import { HASHING } from "../constants/auth.constants";

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, parseInt(HASHING.SALT_ROUNDS));
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};