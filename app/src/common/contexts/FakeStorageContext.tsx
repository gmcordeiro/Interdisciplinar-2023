import { PropsWithChildren, createContext, useCallback, useMemo } from "react";
import { v4 as uuid } from "uuid";
import {
  LoginUserInput,
  LoginUserPayload,
  RegisterUserInput,
  RegisterUserPayload,
  User,
  UserCategory,
  UserRole,
} from "../../auth/types";

type FakeStorageContextValue = {
  login: (credentials: LoginUserInput) => Promise<LoginUserPayload>;
  register: (user: RegisterUserInput) => Promise<RegisterUserPayload>;
  me: (token: string) => Promise<LoginUserPayload>;
  getUsers: () => Promise<User[]>;
  removeUser: (id: string) => Promise<void>;
};

const FakeStorageContext = createContext<FakeStorageContextValue>(
  {} as FakeStorageContextValue
);

const InitialState = {
  users: localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users") || "[]")
    : [
        {
          id: "1",
          name: "Admin",
          email: "admin@email.com",
          password: "admin",
          category: {
            id: "1",
            name: "Admin",
            role: UserRole.ADMIN,
          },
        },
        {
          id: "2",
          name: "Coordinator",
          email: "coordinator@email.com",
          password: "coordinator",
          category: {
            id: "2",
            name: "Coordinator",
            role: UserRole.COORDINATOR,
          },
        },
        {
          id: "3",
          name: "Collaborator",
          email: "collaborator@email.com",
          password: "collaborator",
          category: {
            id: "3",
            name: "Collaborator",
            role: UserRole.COLLABORATOR,
          },
        },
      ],
  categories: [
    {
      id: "1",
      name: "Admin",
      role: UserRole.ADMIN,
    },
    {
      id: "2",
      name: "Coordinator",
      role: UserRole.COORDINATOR,
    },
    {
      id: "3",
      name: "Collaborator",
      role: UserRole.COLLABORATOR,
    },
  ],
  sessions: localStorage.getItem("sessions")
    ? JSON.parse(localStorage.getItem("sessions") || "[]")
    : [],
};

localStorage.setItem("users", JSON.stringify(InitialState.users));

localStorage.setItem("categories", JSON.stringify(InitialState.categories));

const FakeStorageProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // eslint-disable-next-line
  const getResourse = <T extends unknown>(resource: string): T[] => {
    try {
      return JSON.parse(localStorage.getItem(resource) || "[]") as T[];
    } catch (error) {
      return [];
    }
  };

  const login = useCallback(
    async (credentials: LoginUserInput): Promise<LoginUserPayload> => {
      const users = getResourse<User>("users");

      const user = users.find((user) => user.email === credentials.email);

      if (!user) {
        throw new Error("User not found");
      }

      user.token = uuid();

      const sessions = getResourse<User>("sessions");

      localStorage.setItem("sessions", JSON.stringify([...sessions, user]));

      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        user,
      };
    },
    []
  );

  const register = useCallback(
    async (input: RegisterUserInput): Promise<RegisterUserPayload> => {
      const users = getResourse<User>("users");

      const sessions = getResourse<User>("sessions");

      const categories = getResourse<UserCategory>("categories");

      const category = categories.find(
        (category) => category.id === input.category
      );

      if (!category) {
        throw new Error("Category not found");
      }

      const user = { ...input, id: uuid(), category } as User;

      localStorage.setItem("users", JSON.stringify([...users, user]));

      user.token = uuid();

      localStorage.setItem("sessions", JSON.stringify([...sessions, user]));

      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        user,
      };
    },
    []
  );

  const me = useCallback(async (token: string): Promise<LoginUserPayload> => {
    const sessions = getResourse<User>("sessions");

    const user = sessions.find((user) => user.token === token);

    if (!user) {
      throw new Error("User not found");
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      user,
    };
  }, []);

  const getUsers = useCallback(async (): Promise<User[]> => {
    const users = getResourse<User>("users");

    await new Promise((resolve) => setTimeout(resolve, 500));

    return users;
  }, []);

  const removeUser = useCallback(async (id: string): Promise<void> => {
    const users = getResourse<User>("users");

    const newUsers = users.filter((user) => user.id !== id);

    localStorage.setItem("users", JSON.stringify(newUsers));

    await new Promise((resolve) => setTimeout(resolve, 500));
  }, []);

  const value = useMemo(
    () => ({
      login,
      register,
      me,
      getUsers,
      removeUser,
    }),
    [login, register, me, getUsers, removeUser]
  );

  return (
    <FakeStorageContext.Provider value={value}>
      {children}
    </FakeStorageContext.Provider>
  );
};

export { FakeStorageContext, FakeStorageProvider };
