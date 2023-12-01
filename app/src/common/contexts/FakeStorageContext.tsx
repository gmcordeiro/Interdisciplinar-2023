import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
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
  users: User[];
  categories: UserCategory[];
  login: (credentials: LoginUserInput) => Promise<LoginUserPayload>;
  register: (user: RegisterUserInput) => Promise<RegisterUserPayload>;
  me: (token: string) => Promise<LoginUserPayload>;
  getUsers: () => Promise<User[]>;
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
  const [users, setUsers] = useState<User[]>(InitialState.users);

  const [sessions, setSessions] = useState<User[]>(InitialState.sessions);

  const [categories] = useState<UserCategory[]>(InitialState.categories);

  const login = useCallback(
    async (credentials: LoginUserInput): Promise<LoginUserPayload> => {
      const user = users.find((user) => user.email === credentials.email);

      if (!user) {
        throw new Error("User not found");
      }

      user.token = uuid();

      setSessions([...sessions, user]);

      localStorage.setItem("sessions", JSON.stringify([...sessions, user]));

      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        user,
      };
    },
    [users, sessions]
  );

  const register = useCallback(
    async (input: RegisterUserInput): Promise<RegisterUserPayload> => {
      const category = categories.find(
        (category) => category.id === input.category
      );

      if (!category) {
        throw new Error("Category not found");
      }

      const user = { ...input, id: uuid(), category } as User;

      setUsers([...users, user]);

      localStorage.setItem("users", JSON.stringify([...users, user]));

      user.token = uuid();

      setSessions([...sessions, user]);

      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        user,
      };
    },
    [categories, users, sessions]
  );

  const me = useCallback(
    async (token: string): Promise<LoginUserPayload> => {
      const user = sessions.find((user) => user.token === token);

      console.log({ user, token, sessions });

      if (!user) {
        throw new Error("User not found");
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        user,
      };
    },
    [sessions]
  );

  const getUsers = useCallback(async (): Promise<User[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(users), 500));
  }, [users]);

  const value = useMemo(
    () => ({
      users,
      categories,
      login,
      register,
      me,
      getUsers,
    }),
    [users, categories, login, register, me, getUsers]
  );

  return (
    <FakeStorageContext.Provider value={value}>
      {children}
    </FakeStorageContext.Provider>
  );
};

export { FakeStorageContext, FakeStorageProvider };
