import {
  Badge,
  HStack,
  IconButton,
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { UserRole } from "../../auth/types";
import { Project } from "../types";

type ProjectsGridProps = {
  projects: Project[];
  fetching: boolean;
};

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, fetching }) => {
  const queryClient = useQueryClient();

  const { user } = useContext(AuthContext);

  const { mutateAsync: remove, isPending: removing } = useMutation({
    // mutationFn: removeUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const [deletedID, setDeletedID] = useState<string | null>(null);

  const navigate = useNavigate();

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Owner</Th>
            <Th>Status</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {fetching && (
            <Tr>
              <Td colSpan={4}>
                <Progress size="xs" isIndeterminate />
              </Td>
            </Tr>
          )}
          {projects.map((project) => (
            <Tr key={project.id}>
              <Td>{project.name}</Td>
              <Td>{project.owner.email}</Td>
              <Td>
                {project.done ? (
                  <Badge colorScheme="green">Done</Badge>
                ) : (
                  <Badge colorScheme="yellow">In progress</Badge>
                )}
              </Td>
              <Td>
                <HStack spacing={2} justifyContent="flex-end">
                  <IconButton
                    icon={<FiEye />}
                    aria-label={"view"}
                    size="sm"
                    onClick={() => {
                      navigate(`/projects/${project.id}`);
                    }}
                  />
                  {[UserRole.ADMIN, UserRole.COORDINATOR].includes(
                    user?.category?.role as UserRole
                  ) && (
                    <IconButton
                      icon={<FiEdit />}
                      aria-label={"edit"}
                      size="sm"
                      onClick={() => {
                        navigate(`/projects/${project.id}/edit`);
                      }}
                    />
                  )}
                  {[UserRole.ADMIN, UserRole.COORDINATOR].includes(
                    user?.category?.role as UserRole
                  ) && (
                    <IconButton
                      icon={<FiTrash />}
                      aria-label={"delete"}
                      size="sm"
                      colorScheme="red"
                      isLoading={removing && deletedID === project.id}
                      onClick={() => {
                        setDeletedID(project.id);
                        remove();
                      }}
                    />
                  )}
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ProjectsGrid;
