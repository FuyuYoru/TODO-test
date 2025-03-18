export interface User {
  id: number;
  login: string;
  firstname: string;
  lastname: string;
  middlename?: string | null;
  role: UserRole;
  managerId?: number | null;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}
