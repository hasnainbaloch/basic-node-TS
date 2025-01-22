import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "@/config";
import { logger } from "@/utils/logger.util";
import AppDataSource from "@/database";

import { routes } from "@/routes";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "@/middleware/errorHandler.middleware";

const app = express();

//Middleware
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(helmet());
app.use(cookieParser());

// app routes
app.use(config.appPrefix, routes);

// error handler middleware should be the last middleware
app.use(errorMiddleware);

// Start server
const startServer = async () => {
  try {
    logger.info("Initializing database connection...");
    await AppDataSource.initialize(); // Initialize database connection
    logger.info("Database connection established successfully ~ 🎉 ");

    logger.info("Starting server...");
    app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

// Close database connection on exit
const closeDB = async () => {
  await AppDataSource.destroy();
  logger.info("Database connection closed ~ 🛑");
};

process.on("SIGINT", async () => {
  logger.info("SIGINT received. Closing database connection...");
  await closeDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  logger.info("SIGTERM received. Closing database connection...");
  await closeDB();
  process.exit(0);
});

process.on("uncaughtException", (error) => {
  logger.error(error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled Rejection, reason: ${reason}`);
  process.exit(1);
});

startServer();
