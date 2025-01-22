import { Router } from "express";

import { createUserSchema, loginUserSchema } from "../schemas/user.schema";
import {
  createUserController,
  deleteUserByIdController,
  getAllUsersController,
  loginUserController,
  refreshTokenController,
} from "../controllers/users.controller";
import { validate } from "../middleware/validation.middleware";
import {
  authenticateToken,
  authorizedRoles,
} from "../middleware/auth.middleware";
import { UserRole } from "../types/users.type";

const router = Router();

//public routes
router.post("/register", validate(createUserSchema), createUserController);
router.post("/login", validate(loginUserSchema), loginUserController);
router.get("/refresh-token", refreshTokenController);

// protected routes for admin
router.get(
  "/all-users",
  authenticateToken,
  authorizedRoles(UserRole.ADMIN),
  getAllUsersController
);
router.delete(
  "/user/:id",
  authenticateToken,
  authorizedRoles(UserRole.ADMIN),
  deleteUserByIdController
);

export default router;
