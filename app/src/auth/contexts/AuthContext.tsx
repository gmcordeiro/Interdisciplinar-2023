import { jwtDecode } from "jwt-decode";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UserTokenPayload } from "../types";

type AuthContextProps = {
  user: UserTokenPayload | null;
  authenticated: boolean;
  authenticate: (token: string) => void;
  revoke: () => void;
  initialized: boolean;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserTokenPayload | null>(null);

  const [initialized, setInitialized] = useState<boolean>(false);

  const authenticated = useMemo(() => !!user, [user]);

  const authenticate = useCallback((token: string) => {
    try {
      const user = jwtDecode<UserTokenPayload>(token);
      setUser(user);
      setInitialized(true);
      localStorage.setItem("token", token);
    } catch (error) {
      revoke();
    }
  }, []);

  const revoke = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    setInitialized(true);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    if (!token) {
      revoke();
      return;
    }

    authenticate(token);
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
