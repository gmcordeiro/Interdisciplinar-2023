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
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiClock, FiSettings, FiTrash } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { UserRole } from "../../auth/types";
import { clockInTask, clockOutTask, finishTask, removeTask } from "../services";
import { Task, TaskExecution } from "../types";
import PunchClock, { PunchType } from "./PunchClock";

type TasksGridProps = {
  tasks: Task[];
  fetching: boolean;
  onEdit: (task: Task, tab?: "details" | "executions") => void;
  onRefetch: () => void;
};

const TasksGrid: React.FC<TasksGridProps> = ({
  tasks,
  fetching,
  onEdit,
  onRefetch,
}) => {
  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [taskForDeletion, setTaskForDeletion] = useState<Task | null>(null);

  const [taskForFinish, setTaskForFinish] = useState<Task | null>(null);

  const toast = useToast();

  const { id: projectId } = useParams();

  const { mutateAsync: punchClock, isPending: punching } = useMutation({
    mutationFn: async ({
      execution,
      task,
      type,
      details,
    }: {
      task: Task;
      type: PunchType;
      details?: string;
      execution?: TaskExecution;
    }) => {
      if (type === PunchType.CLOCK_IN) {
        await clockInTask(user?.id as number, task.id, details || "");
      }
      if (type === PunchType.CLOCK_OUT) {
        await clockOutTask(
          user?.id as number,
          task.id,
          execution?.id as number,
          details || ""
        );
      }
    },
    onSuccess: () => {
      toast({
        title: "Success on punch clock",
        description: "Task updated",
        status: "success",
      });

      setSelectedTask(null);

      onRefetch();

      onEdit(selectedTask as Task, "executions");

      queryClient.invalidateQueries({
        queryKey: ["task-executions", { id: "" }],
      });
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

  const { mutateAsync: remove, isPending: removing } = useMutation({
    mutationFn: (taskId: number) =>
      removeTask(parseInt(projectId as string), taskId),
    onSuccess: () => {
      toast({
        title: "Task deleted",
        status: "success",
      });

      onRefetch();
    },
    onError: () => {
      toast({
        title: "Task deletion failed",
        status: "error",
      });
    },
  });

  const { mutateAsync: finish, isPending: finishing } = useMutation({
    mutationFn: (taskId: number) =>
      finishTask(parseInt(projectId as string), taskId),
    onSuccess: () => {
      toast({
        title: "Task finished",
        status: "success",
      });

      onRefetch();
    },
    onError: () => {
      toast({
        title: "Task finish failed",
        status: "error",
      });
    },
  });

  const popoverWidth = useBreakpointValue({ md: "440" });

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
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
                      isLoading={finishing && taskForFinish?.id === task.id}
                      onClick={() => {
                        finish(task.id);
                        setTaskForFinish(task);
                      }}
                    />
                  )}
                  <IconButton
                    icon={<FiSettings />}
                    aria-label={"edit"}
                    size="sm"
                    onClick={() => onEdit(task)}
                  />
                  {!task.done && user?.role === UserRole.COLLABORATOR && (
                    <Popover
                      placement="left-start"
                      isOpen={selectedTask?.id === task.id}
                      onClose={() => setSelectedTask(null)}
                    >
                      <PopoverTrigger>
                        <IconButton
                          icon={<FiClock />}
                          aria-label={"on clock"}
                          size="sm"
                          colorScheme="blue"
                          onClick={() => setSelectedTask(task)}
                        />
                      </PopoverTrigger>
                      <PopoverContent width={popoverWidth}>
                        <PopoverArrow />
                        <PopoverHeader>Clock In/Out</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                          {task && (
                            <PunchClock
                              task={task}
                              punching={punching}
                              onPunch={({ type, details, execution }) =>
                                punchClock({ type, details, task, execution })
                              }
                              onCancel={() => {
                                setSelectedTask(null);
                              }}
                            />
                          )}
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  )}
                  {[UserRole.ADMIN, UserRole.COORDINATOR].includes(
                    user?.role as UserRole
                  ) && (
                    <IconButton
                      icon={<FiTrash />}
                      aria-label={"delete"}
                      size="sm"
                      colorScheme="red"
                      onClick={() => {
                        remove(task.id);
                        setTaskForDeletion(task);
                      }}
                      isLoading={removing && taskForDeletion?.id === task.id}
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
