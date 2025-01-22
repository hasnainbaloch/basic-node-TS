import { NextFunction, Request, Response } from "express";
import {
  createUserService,
  deleteUserByIdService,
  getAllUsersService,
  loginUserService,
} from "../services/user.service";
import { logger } from "../utils/logger.util";
import { httpError } from "../utils/httpError.util";
import { httpSuccess } from "../utils/httpSuccess.util";
import { HttpStatusCode } from "../types/http.type";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.util";
import { config } from "../config";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUserService(req.body);
    if (!user) {
      return next(httpError.badRequest({ message: "User already exists" }));
    }

    const { id, password, ...userData } = user;

    logger.info("User created successfully");
    return res.status(HttpStatusCode.CREATED).json(
      httpSuccess.created({
        message: "User created successfully",
        details: userData,
      })
    );
  } catch (error) {
    return next(httpError.internal({ message: "Internal server error" }));
  }
};

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await loginUserService(req.body);
    if (!user) {
      return next(
        httpError.unauthorized({ message: "Invalid login credentials" })
      );
    }
    const { accessToken, refreshToken } = user;

    logger.info("User logged in successfully");

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: parseInt(config.jwt.accessTokenExpiry, 10) * 1000 * 60,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: parseInt(config.jwt.refreshTokenExpiry, 10) * 1000 * 60 * 60 * 24,
    });

    return res.status(HttpStatusCode.SUCCESS).json(
      httpSuccess.success({
        message: "User logged in successfully",
      })
    );
  } catch (error) {
    return next(httpError.internal({ message: "Internal server error" }));
  }
};

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.refreshToken;
    console.log("Refresh Token:", token);
    logger.info("Refresh token: cookie", req.cookies);
    if (!token) {
      return next(
        httpError.unauthorized({ message: "No refresh token provided" })
      );
    }

    const tokenPayload = verifyRefreshToken(token);
    logger.info("Token payload: ", tokenPayload);
    if (!tokenPayload) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return next(httpError.unauthorized({ message: "Invalid refresh token" }));
    }

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: parseInt(config.jwt.accessTokenExpiry, 10) * 1000 * 60 * 60,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: parseInt(config.jwt.refreshTokenExpiry, 10) * 1000 * 60 * 60 * 24,
    });

    logger.info("Access token refreshed successfully");

    return res.status(HttpStatusCode.SUCCESS).json(
      httpSuccess.success({
        message: "Access token refreshed successfully",
      })
    );
  } catch (error) {
    logger.error("Error refreshing token:", error);
    return next(httpError.internal({ message: "Internal server error" }));
  }
};

export const getAllUsersController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsersService();
    logger.info("Users fetched successfully");
    return res.status(HttpStatusCode.SUCCESS).json(
      httpSuccess.success({
        message: "Users fetched successfully",
        details: users,
      })
    );
  } catch (error) {
    return next(httpError.internal({ message: "Internal server error" }));
  }
};

export const deleteUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await deleteUserByIdService(id);
    if (!user) {
      return next(httpError.notFound({ message: "User not found" }));
    }
    logger.info("User deleted successfully");
    return res.status(HttpStatusCode.DELETED).json(
      httpSuccess.deleted({
        message: "User deleted successfully",
        details: `user with id: ${id} has been deleted by admin`,
      })
    );
  } catch (error) {
    logger.error("Error deleting user:", error);
    return next(httpError.internal({ message: "Internal server error" }));
  }
};
