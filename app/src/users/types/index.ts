import { User, UserRole } from "../../auth/types";

export type GetUsersPayload = User[];

export type GetUserPayload = User;

export type UserFormValues = {
  name: string;
  email: string;
  category: number;
  rg: string;
  cpf: string;
  phone: string;
  mother: string;
  father: string;
  academic: boolean;
  ra?: string;
  course?: string;
  period?: string;
  password?: string;
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
