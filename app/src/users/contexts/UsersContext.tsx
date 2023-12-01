import { useQuery } from "@tanstack/react-query";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { User } from "../../auth/types";
import { FakeStorageContext } from "../../common/contexts/FakeStorageContext";
import { FormScope } from "../../common/types/form";

type UsersContextValue = {
  users: User[];
  fetching: boolean;
  scope: FormScope;
  setScope: (scope: FormScope) => void;
};

const UsersContext = createContext<UsersContextValue>({} as UsersContextValue);

const UsersProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { getUsers } = useContext(FakeStorageContext);

  const { data: users, isFetching: fetching } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    initialData: [],
  });

  const [scope, setScope] = useState(FormScope.INDEX);

  const value = useMemo(
    () => ({ users, fetching, scope, setScope }),
    [users, fetching, scope, setScope]
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

const useUsers = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("useUsers must be used within an UsersProvider");
  }

  return context;
};

export { UsersContext, UsersProvider, useUsers };
