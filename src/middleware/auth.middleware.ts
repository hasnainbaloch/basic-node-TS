import { httpError } from "../utils/httpError.util";
import { Request, Response, NextFunction } from "express";
import { UserRole } from "../types/users.type";
import { logger } from "../utils/logger.util";
import { verifyAccessToken, TokenPayload } from "../utils/jwt.util";

const validateToken = async (req: Request): Promise<TokenPayload | null> => {
  const token = req.cookies.accessToken;
  if (!token) {
    return null;
  }

  const tokenPayload = verifyAccessToken(token);
  return tokenPayload;
};

/**
 * Middleware to authenticate a user token.
 */
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await validateToken(req);
    if (!token) {
      res.clearCookie("accessToken");
      return next(httpError.unauthorized);
    }

    logger.info("User authenticated successfully");
    return next();
  } catch (error) {
    res.clearCookie("accessToken");
    return next(httpError.unauthorized);
  }
};

/**
 * Middleware to authorize specific user roles.
 */
export const authorizedRoles =
  (...roles: UserRole[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = await validateToken(req);
      if (!token) {
        return next(httpError.unauthorized);
      }

      if (!roles.includes(token.role as UserRole)) {
        return next(httpError.forbidden);
      }

      logger.info("User authorized successfully");

      return next();
    } catch (error) {
      return next(httpError.unauthorized);
    }
  };
