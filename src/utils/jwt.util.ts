import { sign, verify } from "jsonwebtoken";
import { config } from "@/config";
import { logger } from "./logger.util";

export type TokenPayload = {
  uid: string;
  role: string;
};

export const generateAccessToken = (payload: TokenPayload): string =>
  sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessTokenExpiry,
  });

export const generateRefreshToken = (payload: TokenPayload): string =>
  sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshTokenExpiry,
  });

export const verifyAccessToken = (token: string): TokenPayload | null => {
  try {
    return verify(token, config.jwt.accessSecret) as TokenPayload;
  } catch {
    logger.error("Invalid access token");
    return null;
  }
};

export const verifyRefreshToken = (
  token: string
): TokenPayload | null => {
  try {
    return verify(token, config.jwt.refreshSecret) as TokenPayload;
  } catch {
    logger.error("Invalid refresh token");
    return null;
  }
};
