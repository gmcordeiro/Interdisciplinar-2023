export enum UserRole {
  ADMIN = "ADMIN",
  COORDINATOR = "COORDINATOR",
  COLLABORATOR = "COLLABORATOR",
}

export type UserCategory = {
  id: number;
  name: string;
  role: UserRole;
};

export type User = {
  id?: number;
  name: string;
  email: string;
  category: UserCategory;
  rg: string;
  cpf: string;
  phone: string;
  mother: string;
  father: string;
  academic: boolean;
  ra: string;
  course: string;
  period: string;
  password: string;
  token?: string;
};

export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
  category: string;
};

export type RegisterUserPayload = {
  user: User;
};

export type LoginUserInput = {
  email: string;
  password: string;
};

export type LoginUserPayload = {
  accessToken: string;
};

export type UserTokenPayload = {
  id: number;
  sub: string;
  name: string;
  category: string;
  role: UserRole;
};
