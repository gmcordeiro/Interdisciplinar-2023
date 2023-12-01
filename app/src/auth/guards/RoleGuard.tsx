import { PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { UserRole } from "../types";

type RoleGuardProps = {
  role: UserRole;
};

const RoleGuard: React.FC<PropsWithChildren<RoleGuardProps>> = ({
  role,
  children,
}) => {
  const { user } = useContext(AuthContext);

  if (user?.category?.role !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RoleGuard;
