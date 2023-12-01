import { Link as ChakraLink, Flex, FlexProps, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface NavItemProps extends FlexProps {
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
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "blue.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </ChakraLink>
  );
};

export default NavItem;
