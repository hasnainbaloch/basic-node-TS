import "reflect-metadata";
import { DataSource } from "typeorm";

import { config } from "../config";
import path from "path";
import { Invoice, User } from "./entities";

const AppDataSource = new DataSource({
  type: config.database.type as "postgres",
  host: config.database.host,
  port: config.database.port as number,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: [User, Invoice],
  synchronize: config.nodeEnv === "development", // for development only
  logging: config.nodeEnv === "development", // for development only
  logger: "simple-console",
  migrations: [
    process.env.NODE_ENV === "production"
      ? path.join(__dirname, "migrations", "*.js") // for production
      : path.join(__dirname, "migrations", "*.ts"), // for development
  ], // for migrations
});

export default AppDataSource;
