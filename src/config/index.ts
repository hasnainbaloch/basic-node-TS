import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT ?? 4000,
  appPrefix: process.env.APP_PREFIX ?? "/api/v1",
  appPrefixV2: process.env.APP_PREFIX_V2 ?? "/api/v2", // for future use
  nodeEnv: process.env.NODE_ENV ?? "development",
  database: {
    type: process.env.DB_TYPE ?? "postgres",
    host: process.env.DB_HOST ?? "localhost",
    port: process.env.DB_PORT ?? 5432,
    username: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASSWORD ?? "postgres",
    database: process.env.DB_NAME ?? "app_db",
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET ?? "jwt-secret-key",
    refreshSecret: process.env.JWT_REFRESH_SECRET ?? "re-secret-key",
    accessTokenExpiry: process.env.JWT_ACCESS_TOKEN_EXPIRY ?? "1h", // 1 hour
    refreshTokenExpiry: process.env.JWT_REFRESH_TOKEN_EXPIRY ?? "1d", // 7 days
    refreshTokenCookieMaxAge:
      process.env.JWT_REFRESH_TOKEN_COOKIE_MAX_AGE ?? "7d", // 7 days
  },
  saltRounds: process.env.SALT_ROUNDS ?? 10,
};
