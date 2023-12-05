import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { PropsWithChildren, useContext } from "react";
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

  if (!roles.includes(user?.role as UserRole)) {
    return (
      <Alert status="error" variant="left-accent">
        <AlertIcon />
        <AlertTitle>Access denied</AlertTitle>
        <AlertDescription>
          You are not authorized to view this page
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;
