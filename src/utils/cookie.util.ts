import { Response } from "express";
import { config } from "@/config";

type CookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "strict" | "lax" | "none";
  maxAge: number;
};

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: parseInt(config.jwt.refreshTokenCookieMaxAge, 10),
});

export const setRefreshTokenCookie = (res: Response, token: string): void => {
  res.cookie("refreshToken", token, getRefreshTokenCookieOptions());
};

export const clearRefreshTokenCookie = (res: Response): void => {
  res.clearCookie("refreshToken");
};
