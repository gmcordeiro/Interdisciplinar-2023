import {
  Badge,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiClock, FiSettings, FiTrash } from "react-icons/fi";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { UserRole } from "../../auth/types";
import { FakeStorageContext } from "../../common/contexts/FakeStorageContext";
import { Task } from "../types";
import PunchClock, { PunchType } from "./PunchClock";

type TasksGridProps = {
  tasks: Task[];
  fetching: boolean;
  onEdit: (task: Task, tab?: "details" | "executions") => void;
};

const TasksGrid: React.FC<TasksGridProps> = ({ tasks, fetching, onEdit }) => {
  const { user } = useContext(AuthContext);

  const { clockIn, clockOut } = useContext(FakeStorageContext);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const toast = useToast();

  const queryClient = useQueryClient();

  const { mutateAsync: punchClock, isPending: punching } = useMutation({
    mutationFn: async (type: PunchType) => {
      if (type === PunchType.CLOCK_IN) {
        await clockIn(selectedTask?.id as string);
      }
      if (type === PunchType.CLOCK_OUT) {
        await clockOut(selectedTask?.id as string);
      }
    },
    onSuccess: () => {
      toast({
        title: "Success on punch clock",
        description: "Task updated",
        status: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["projects"] });

      setSelectedTask(null);

      onEdit(selectedTask as Task, "executions");
    },
    onError: (error) => {
      toast({
        title: "Error on punch clock",
        description: error.message,
        status: "error",
      });

      setSelectedTask(null);
    },
  });

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
                  <Popover
                    placement="left-start"
                    isOpen={selectedTask?.id === task.id}
                    onClose={() => setSelectedTask(null)}
                  >
                    <PopoverTrigger>
                      {!task.done &&
                        user?.category?.role === UserRole.COLLABORATOR && (
                          <IconButton
                            icon={<FiClock />}
                            aria-label={"on clock"}
                            size="sm"
                            colorScheme="blue"
                            onClick={() => setSelectedTask(task)}
                          />
                        )}
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverHeader>Clock In/Out</PopoverHeader>
                      <PopoverCloseButton />
                      <PopoverBody>
                        {task && (
                          <PunchClock
                            task={task}
                            punching={punching}
                            onPunch={punchClock}
                            onCancel={() => {
                              setSelectedTask(null);
                            }}
                          />
                        )}
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
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
