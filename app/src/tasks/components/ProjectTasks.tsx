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
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useContext, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FakeStorageContext } from "../../common/contexts/FakeStorageContext";
import { FormScope, FormScopeLabel } from "../../common/types/form";
import { Project, Task } from "../types";
import TaskExecutions from "./TaskExecutions";
import TasksForm from "./TasksForm";
import TasksGrid from "./TasksGrid";

type ProjectTasksProps = PropsWithChildren<{
  project: Project;
}>;

const ProjectTasks: React.FC<ProjectTasksProps> = ({ project, children }) => {
  const navigate = useNavigate();

  const { getTasks } = useContext(FakeStorageContext);

  const [scope, setScope] = useState<FormScope>(FormScope.INDEX);

  const [task, setTask] = useState<Task | null>(null);

  const [tab, setTab] = useState<"details" | "executions">("details");

  const {
    data: tasks,
    isLoading: fetching,
    refetch,
  } = useQuery({
    queryKey: ["project-tasks", { id: project.id }],
    queryFn: () => getTasks(project.id),
    initialData: [],
    enabled: !!project.id,
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
                onSubmit={() => {
                  setScope(FormScope.INDEX);
                }}
                onBack={() => {
                  setScope(FormScope.INDEX);
                }}
                scope={scope}
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
                  defaultValues={task as Task}
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
              tasks={tasks}
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
