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
import { useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiClock, FiSettings, FiTrash } from "react-icons/fi";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { UserRole } from "../../auth/types";
import { Task } from "../types";

type TasksGridProps = {
  tasks: Task[];
  fetching: boolean;
  onEdit: (task: Task) => void;
  onClock: (task: Task) => void;
};

const TasksGrid: React.FC<TasksGridProps> = ({
  tasks,
  fetching,
  onEdit,
  onClock,
}) => {
  const { user } = useContext(AuthContext);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Status</Th>
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
          {tasks.length === 0 && !fetching && (
            <Tr>
              <Td colSpan={4}>No tasks found</Td>
            </Tr>
          )}
          {tasks.map((task) => (
            <Tr key={task.id}>
              <Td>{task.name}</Td>
              <Td>
                {task.done ? (
                  <Badge colorScheme="green">Done</Badge>
                ) : (
                  <Badge colorScheme="yellow">In progress</Badge>
                )}
              </Td>
              <Td>
                <HStack spacing={2} justifyContent="flex-end">
                  {!task.done && (
                    <IconButton
                      icon={<FaCheckCircle />}
                      aria-label={"mark as done"}
                      size="sm"
                      colorScheme="green"
                    />
                  )}
                  <IconButton
                    icon={<FiSettings />}
                    aria-label={"edit"}
                    size="sm"
                    onClick={() => onEdit(task)}
                  />
                  {!task.done &&
                    user?.category?.role === UserRole.COLLABORATOR && (
                      <IconButton
                        icon={<FiClock />}
                        aria-label={"on clock"}
                        size="sm"
                        colorScheme="blue"
                        onClick={() => onClock(task)}
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

export default TasksGrid;
