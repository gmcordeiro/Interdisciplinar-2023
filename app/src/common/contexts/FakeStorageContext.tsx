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
import { Project } from "../../tasks/types";
import { UserFormValues } from "../../users/components/UsersForm";

type FakeStorageContextValue = {
  login: (credentials: LoginUserInput) => Promise<LoginUserPayload>;
  register: (user: RegisterUserInput) => Promise<RegisterUserPayload>;
  me: (token: string) => Promise<LoginUserPayload>;
  getUsers: () => Promise<User[]>;
  removeUser: (id: string) => Promise<void>;
  createUser: (values: UserFormValues) => Promise<void>;
  getUser: (id: string) => Promise<User>;
  updateUser: (id: string, values: UserFormValues) => Promise<void>;
  getCategories: () => Promise<UserCategory[]>;
  getProjects: () => Promise<Project[]>;
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
  projects: localStorage.getItem("projects")
    ? JSON.parse(localStorage.getItem("projects") || "[]")
    : ([
        {
          id: "1",
          name: "Projeto 1",
          description: "Descrição do projeto 1",
          done: false,
          goal: "Objetivo do projeto 1",
          resources: "Recursos do projeto 1",
          owner: {
            id: "1",
            name: "Admin",
            email: "admin@email.com",
          },
          tasks: [
            {
              id: "1",
              name: "Tarefa 1",
              description: "Descrição da tarefa 1",
              done: false,
            },
            {
              id: "2",
              name: "Tarefa 2",
              description: "Descrição da tarefa 2",
              done: false,
            },
          ],
        },
      ] as Project[]),
  sessions: localStorage.getItem("sessions")
    ? JSON.parse(localStorage.getItem("sessions") || "[]")
    : [],
};

localStorage.setItem("users", JSON.stringify(InitialState.users));

localStorage.setItem("categories", JSON.stringify(InitialState.categories));

localStorage.setItem("projects", JSON.stringify(InitialState.projects));

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

  const getCategories = useCallback(async (): Promise<UserCategory[]> => {
    const categories = getResourse<UserCategory>("categories");

    await new Promise((resolve) => setTimeout(resolve, 500));

    return categories;
  }, []);

  const createUser = useCallback(
    async (values: UserFormValues): Promise<void> => {
      const users = getResourse<User>("users");

      const categories = getResourse<UserCategory>("categories");

      const category = categories.find(
        (category) => category.id === values.category
      );

      if (!category) {
        throw new Error("Category not found");
      }

      const user = { ...values, id: uuid(), category } as User;

      localStorage.setItem("users", JSON.stringify([...users, user]));

      await new Promise((resolve) => setTimeout(resolve, 500));
    },
    []
  );

  const getUser = useCallback(async (id: string): Promise<User> => {
    const users = getResourse<User>("users");

    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    return user;
  }, []);

  const updateUser = useCallback(
    async (id: string, values: UserFormValues): Promise<void> => {
      const users = getResourse<User>("users");

      const categories = getResourse<UserCategory>("categories");

      const category = categories.find(
        (category) => category.id === values.category
      );

      if (!category) {
        throw new Error("Category not found");
      }

      const user = { ...values, category } as User;

      const newUsers = users.map((u) => {
        if (u.id === id) {
          return user;
        }
        return u;
      });

      localStorage.setItem("users", JSON.stringify(newUsers));

      await new Promise((resolve) => setTimeout(resolve, 500));
    },
    []
  );

  const getProjects = useCallback(async (): Promise<Project[]> => {
    const projects = getResourse<Project>("projects");

    await new Promise((resolve) => setTimeout(resolve, 500));

    return projects;
  }, []);

  const value = useMemo(
    () => ({
      login,
      register,
      me,
      getUsers,
      removeUser,
      getCategories,
      createUser,
      getUser,
      updateUser,
      getProjects,
    }),
    [
      login,
      register,
      me,
      getUsers,
      removeUser,
      getCategories,
      createUser,
      getUser,
      updateUser,
      getProjects,
    ]
  );

  return (
    <FakeStorageContext.Provider value={value}>
      {children}
    </FakeStorageContext.Provider>
  );
};

export { FakeStorageContext, FakeStorageProvider };
