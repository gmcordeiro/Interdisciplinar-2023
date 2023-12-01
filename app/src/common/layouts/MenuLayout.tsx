import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

const MenuLayout: React.FC<PropsWithChildren> = () => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Outlet />
    </Flex>
  );
};

export default MenuLayout;
