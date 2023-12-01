import { ThemeTypings } from "@chakra-ui/react";
import { UserRole } from "../types";

export const UserRoleColor: Record<UserRole, ThemeTypings["colorSchemes"]> = {
  [UserRole.ADMIN]: "red",
  [UserRole.COORDINATOR]: "blue",
  [UserRole.COLLABORATOR]: "green",
};
