export interface UserSummary {
  id: number;
  login: string;
  firstname: string;
  lastname: string;
  middlename?: string | null;
}

export interface User {
  id: number;
  login: string;
  firstname: string;
  lastname: string;
  middlename?: string | null;
  role: UserRole;
  managerId?: number | null;
  managedUsers: UserSummary[];
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}
