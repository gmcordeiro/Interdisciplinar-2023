import { CircularProgress, Stack } from "@chakra-ui/react";
import { PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const GuestGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const { authenticated, initialized } = useContext(AuthContext);

  if (!initialized) {
    return (
      <Stack
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress isIndeterminate />
      </Stack>
    );
  }

  if (authenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default GuestGuard;
