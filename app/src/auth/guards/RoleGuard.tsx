import { PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { UserRole } from "../types";

type RoleGuardProps = {
  roles: UserRole[];
};

const RoleGuard: React.FC<PropsWithChildren<RoleGuardProps>> = ({
  roles,
  children,
}) => {
  const { user } = useContext(AuthContext);

  if (!roles.includes(user?.category?.role as UserRole)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RoleGuard;
