import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FakeStorageContext } from "../../common/contexts/FakeStorageContext";
import { User } from "../types";

type AuthContextProps = {
  user: User | null;
  authenticated: boolean;
  authenticate: (user: User) => void;
  revoke: () => void;
  initialized: boolean;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const [initialized, setInitialized] = useState<boolean>(false);

  const { me } = useContext(FakeStorageContext);

  const authenticated = useMemo(() => !!user?.token, [user]);

  const authenticate = useCallback((user: User) => {
    localStorage.setItem("token", user.token as string);
    setUser(user);
    setInitialized(true);
  }, []);

  const revoke = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      revoke();
      return;
    }

    me(token)
      .then(({ user }) => {
        authenticate(user);
      })
      .catch(() => {
        revoke();
      });
  }, []);

  const value = useMemo(
    () => ({
      user,
      authenticated,
      authenticate,
      revoke,
      initialized,
    }),
    [user, authenticated, authenticate, revoke, initialized]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
