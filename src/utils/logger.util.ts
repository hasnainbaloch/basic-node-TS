import pino from "pino";
import { config } from "../config";

const isProduction = config.nodeEnv === "production";

// Create a simple logger instance
export const logger = pino({
  level: isProduction ? "info" : "debug",
  transport: isProduction
    ? undefined
    : {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
        },
      },
});

/**
 * Logger Usage Examples:
 * 
 * Simple string messages:
 * logger.info("User logged in successfully");
 * logger.error("Database connection failed");
 * logger.debug("Processing payload");
 * logger.warn("Rate limit approaching");
 * 
 * With structured data:
 * logger.info({
 *   message: "Request processed",
 *   statusCode: HttpStatusCode.SUCCESS,
 *   path: "/api/users",
 *   method: "GET"
 * });
 * 
 * Error logging:
 * logger.error({
 *   message: "Request failed",
 *   code: "AUTH_ERROR",
 *   statusCode: HttpStatusCode.UNAUTHORIZED,
 *   details: "Invalid token",
 *   path: "/api/protected",
 *   method: "POST",
 *   body: requestBody,
 *   stack: error.stack
 * });
 */
