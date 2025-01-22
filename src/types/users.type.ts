export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  MANAGER = "manager",
}

export type User = {
  id: string;
  role: UserRole;
  refreshToken: string | null;
};
  