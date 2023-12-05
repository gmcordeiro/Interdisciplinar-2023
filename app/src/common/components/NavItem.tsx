import { Link as ChakraLink, Icon, LinkProps } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface NavItemProps extends LinkProps {
  icon: IconType;
  children: React.ReactNode;
  href: string;
}

const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <ChakraLink
      as={NavLink}
      to={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      _activeLink={{
        color: "blue.400",
        bg: "blue.50",
      }}
      align="center"
      display="flex"
      alignItems="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        color: "blue.400",
        bg: "blue.50",
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "blue.400",
          }}
          as={icon}
        />
      )}
      {children}
    </ChakraLink>
  );
};

export default NavItem;
