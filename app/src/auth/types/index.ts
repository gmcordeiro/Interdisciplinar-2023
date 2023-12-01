export enum UserRole {
  ADMIN = "ADMIN",
  COORDINATOR = "COORDINATOR",
  COLLABORATOR = "COLLABORATOR",
}

export type UserCategory = {
  id: string;
  name: string;
  role: UserRole;
};

export type User = {
  id: string;
  name: string;
  email: string;
  category: UserCategory;
  password?: string;
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
  user: User;
};
