import { UserRole } from "../types/users.type";
import { z } from "zod";

export const createUserSchema = z.object({
  id: z.string().uuid().optional(), // Made optional since it's auto-generated
  userName: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  role: z.enum([UserRole.USER, UserRole.ADMIN, UserRole.MANAGER]),
});

// Update schema makes all fields optional
export const updateUserSchema = z
  .object({
    id: z.string().uuid(), // ID is required for updates to identify the user
    userName: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    role: z.enum([UserRole.USER, UserRole.ADMIN, UserRole.MANAGER]),
  })
  .partial({
    userName: true,
    password: true,
    firstName: true,
    lastName: true,
    role: true,
  });

export const loginUserSchema = z.object({
  userName: z.string().email(),
  password: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;

