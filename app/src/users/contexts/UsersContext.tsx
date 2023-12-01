import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { User } from "../../auth/types";
import { FakeStorageContext } from "../../common/contexts/FakeStorageContext";

type UsersContextValue = {
  users: User[];
  fetching: boolean;
  remove: (id: string) => Promise<void>;
  removing: boolean;
};

const UsersContext = createContext<UsersContextValue>({} as UsersContextValue);

const UsersProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { getUsers, removeUser } = useContext(FakeStorageContext);

  const queryClient = useQueryClient();

  const { data: users, isFetching: fetching } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    initialData: [],
  });

  const { mutateAsync: remove, isPending: removing } = useMutation({
    mutationFn: removeUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const value = useMemo(
    () => ({ users, fetching, remove, removing }),
    [users, fetching, remove, removing]
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
