import { User, UserRole } from "../../auth/types";

export type GetUsersPayload = User[];

export type GetUserPayload = User;

export type UserFormValues = Omit<User, "category"> & {
  category: number;
};

export type UpdateUserInput = {
  name: string;
  email: string;
  password: string;
  category: string;
};

export type GetCategoriesPayload = {
  id: number;
  name: string;
  role: UserRole;
};
