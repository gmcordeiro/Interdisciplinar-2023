import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  FlexProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { IconType } from "react-icons";
import { FaTasks } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { UserRole } from "../../auth/types";
import NavItem from "./NavItem";

interface SidebarProps extends BoxProps {
  onClose: () => void;
  display?: FlexProps["display"];
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
  roles?: UserRole[];
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Users", icon: FiUser, href: "/users", roles: [UserRole.ADMIN] },
  {
    name: "Projects",
    icon: FaTasks,
    href: "/projects",
    roles: [UserRole.ADMIN, UserRole.COORDINATOR, UserRole.COLLABORATOR],
  },
];

const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  const { user } = useContext(AuthContext);
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="4">
        <Text fontSize="xl" fontFamily="monospace" fontWeight="bold">
          Interdisciplinar
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex
        direction="column"
        width={"100%"}
        gap="1"
        justifyContent="flex-start"
      >
        {LinkItems.map(
          (link) =>
            user?.role &&
            link.roles?.includes(user.role) && (
              <NavItem key={link.name} icon={link.icon} href={link.href}>
                {link.name}
              </NavItem>
            )
        )}
      </Flex>
    </Box>
  );
};

export default Sidebar;
