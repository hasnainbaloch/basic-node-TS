import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { logger } from "@/utils/logger.util";
import { config } from "@/config";

interface ErrorType extends Error {
  statusCode?: number;
  code?: string;
  details?: unknown;
}

export const errorMiddleware: ErrorRequestHandler = (
  err: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({
    message: err.message || "An unexpected error occurred",
    statusCode: err.statusCode ?? 500,
    details: err.details,
    path: req.originalUrl,
    method: req.method,
    body: config.nodeEnv === "production" ? undefined : req.body,
    stack: config.nodeEnv === "production" ? undefined : err.stack,
  });

  res.status(err.statusCode ?? 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
    ...(config.nodeEnv !== "production" && { details: err.details }),
  });

  next(); // call next middleware to continue the request flow
};
