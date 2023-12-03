import {
  Badge,
  HStack,
  IconButton,
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiSettings, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { UserRole } from "../../auth/types";
import { finishProject, removeProject } from "../services";
import { FetchProjectsPayload } from "../types";

type ProjectsGridProps = {
  projects: FetchProjectsPayload[];
  fetching: boolean;
};

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, fetching }) => {
  const queryClient = useQueryClient();

  const { user } = useContext(AuthContext);

  const { mutateAsync: remove, isPending: removing } = useMutation({
    mutationFn: removeProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const { mutateAsync: finish, isPending: finishing } = useMutation({
    mutationFn: finishProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const [selected, setSelected] = useState<number | null>(null);

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
          {projects.length === 0 && !fetching && (
            <Tr>
              <Td colSpan={4}>
                <Text color={"gray.500"}>No projects found</Text>
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
                  {!project.done && (
                    <IconButton
                      icon={<FaCheckCircle />}
                      aria-label={"mark as done"}
                      size="sm"
                      colorScheme="green"
                      isLoading={finishing && selected === project.id}
                      onClick={() => {
                        setSelected(project.id);
                        finish(project.id);
                      }}
                    />
                  )}
                  <IconButton
                    icon={<FiSettings />}
                    aria-label={"edit"}
                    size="sm"
                    onClick={() => {
                      navigate(`/projects/${project.id}/edit`);
                    }}
                  />
                  {[UserRole.ADMIN, UserRole.COORDINATOR].includes(
                    user?.role as UserRole
                  ) && (
                    <IconButton
                      icon={<FiTrash />}
                      aria-label={"delete"}
                      size="sm"
                      colorScheme="red"
                      isLoading={removing && selected === project.id}
                      onClick={() => {
                        setSelected(project.id);
                        remove(project.id);
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
