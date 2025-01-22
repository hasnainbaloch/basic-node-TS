import * as bcrypt from "bcrypt";
import { config } from "../config";

const SALT_ROUNDS = Number(config.saltRounds);

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
