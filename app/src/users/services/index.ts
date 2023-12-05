import { User } from "../../auth/types";
import { AuthenticatedHttp } from "../../common/http/axios";
import { GetCategoriesPayload, UserFormValues } from "../types";

export const getUsers = (): Promise<User[]> =>
  AuthenticatedHttp.get("/users").then((response) => response.data as User[]);

export const getUser = (id: number): Promise<User> =>
  AuthenticatedHttp.get(`/users/${id}`).then(
    (response) => response.data as User
  );

export const registerUser = (user: UserFormValues): Promise<void> =>
  AuthenticatedHttp.post("/users", user).then((response) => response.data);

export const updateUser = (id: number, user: UserFormValues): Promise<void> =>
  AuthenticatedHttp.put(`/users/${id}`, user).then((response) => response.data);

export const removeUser = (id: number): Promise<void> =>
  AuthenticatedHttp.delete(`/users/${id}`).then((response) => response.data);

export const getCategories = (): Promise<GetCategoriesPayload[]> =>
  AuthenticatedHttp.get("/users/categories").then(
    (response) => response.data as GetCategoriesPayload[]
  );
