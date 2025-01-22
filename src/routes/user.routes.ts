import { RequestHandler, Router } from "express";

import {
  createUserController,
  deleteUserByIdController,
  getAllUsersController,
  loginUserController,
  refreshTokenController,
} from "@/controllers/users.controller";
import {
  authenticateToken,
  authorizedRoles,
} from "@/middleware/auth.middleware";
import { validate } from "@/middleware/validation.middleware";
import { createUserSchema, loginUserSchema } from "@/schemas/user.schema";
import { UserRole } from "@/types/users.type";

const router = Router();

//public routes
router.post(
  "/register",
  validate(createUserSchema) as RequestHandler,
  createUserController as RequestHandler
);
router.post(
  "/login",
  validate(loginUserSchema) as RequestHandler,
  loginUserController as RequestHandler
);
router.get("/refresh-token", refreshTokenController as RequestHandler);

// protected routes for admin
router.get(
  "/all-users",
  authenticateToken,
  authorizedRoles(UserRole.ADMIN),
  getAllUsersController as RequestHandler
);
router.delete(
  "/user/:id",
  authenticateToken,
  authorizedRoles(UserRole.ADMIN),
  deleteUserByIdController as RequestHandler
);

export default router;
