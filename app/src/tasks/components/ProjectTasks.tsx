import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { FormScope, FormScopeLabel } from "../../common/types/form";
import { createTask, getTasks } from "../services";
import { Task } from "../types";
import TaskExecutions from "./TaskExecutions";
import TasksForm, { TasksFormValues } from "./TasksForm";
import TasksGrid from "./TasksGrid";

type ProjectTasksProps = PropsWithChildren;

const ProjectTasks: React.FC<ProjectTasksProps> = ({ children }) => {
  const navigate = useNavigate();

  const [scope, setScope] = useState<FormScope>(FormScope.INDEX);

  const [task, setTask] = useState<Task | null>(null);

  const [tab, setTab] = useState<"details" | "executions">("details");

  const toast = useToast();

  const { id } = useParams();

  const {
    data: tasks,
    isLoading: fetching,
    refetch,
  } = useQuery({
    queryKey: ["project-tasks", { id }],
    queryFn: () => getTasks(parseInt(id as string)),
    enabled: !!id,
    initialData: [],
  });

  const { mutateAsync: create } = useMutation({
    mutationFn: (values: TasksFormValues) =>
      createTask(parseInt(id as string), values),
    onSuccess: () => {
      toast({
        title: "Task created",
        status: "success",
      });

      setScope(FormScope.INDEX);
    },
    onError: () => {
      toast({
        title: "Task creation failed",
        status: "error",
      });
    },
  });

  return (
    <>
      <Modal
        isOpen={[FormScope.CREATE, FormScope.EDIT].includes(scope)}
        onClose={() => {
          setScope(FormScope.INDEX);
        }}
        size={"3xl"}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{FormScopeLabel[scope]} Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {scope === FormScope.CREATE && (
              <TasksForm
                onSubmit={create}
                onBack={() => {
                  setScope(FormScope.INDEX);
                }}
                scope={scope}
                defaultValues={{
                  description: "",
                  name: "",
                  done: false,
                  dependsOn: null,
                }}
              />
            )}
            {scope === FormScope.EDIT && task && (
              <TaskExecutions task={task as Task} tab={tab}>
                <TasksForm
                  onSubmit={() => {
                    setScope(FormScope.INDEX);
                  }}
                  onBack={() => {
                    setScope(FormScope.INDEX);
                  }}
                  scope={scope}
                  defaultValues={
                    {
                      ...task,
                      dependsOn: task?.dependsOn?.id,
                    } as TasksFormValues
                  }
                />
              </TaskExecutions>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Tabs>
        <TabList>
          <Tab>Details</Tab>
          <Tab>Tasks</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>{children}</TabPanel>
          <TabPanel>
            <TasksGrid
              tasks={tasks || []}
              fetching={fetching}
              onEdit={(_task, tab) => {
                setTab(tab || "details");
                setTask(_task);
                setScope(FormScope.EDIT);
              }}
              onRefetch={refetch}
            />
            <Flex mt={5} justifyContent="flex-end" gap={3}>
              <Button variant="outline" onClick={() => navigate("/projects")}>
                Back
              </Button>
              <IconButton
                aria-label="Create"
                icon={<FiPlus />}
                colorScheme="blue"
                onClick={() => {
                  setScope(FormScope.CREATE);
                }}
              />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ProjectTasks;
