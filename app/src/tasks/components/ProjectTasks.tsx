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
import { PropsWithChildren, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FormScope, FormScopeLabel } from "../../common/types/form";
import { Task } from "../types";
import PunchClock from "./PunchClock";
import TaskExecutions from "./TaskExecutions";
import TasksForm from "./TasksForm";
import TasksGrid from "./TasksGrid";

type ProjectTasksProps = PropsWithChildren<{
  tasks: Task[];
  fetching: boolean;
}>;

const ProjectTasks: React.FC<ProjectTasksProps> = ({
  tasks,
  fetching,
  children,
}) => {
  const navigate = useNavigate();

  const [scope, setScope] = useState<FormScope>(FormScope.INDEX);

  const [task, setTask] = useState<Task | null>(null);

  const [clocking, setClocking] = useState<Task | null>(null);

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
            {scope === FormScope.EDIT && (
              <TaskExecutions
                executions={task?.executions || []}
                fetching={false}
              >
                {task && (
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
                )}
              </TaskExecutions>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={!!clocking}
        onClose={() => {
          setClocking(null);
        }}
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Clock In/Out</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {clocking && (
              <PunchClock
                task={clocking}
                onSubmit={() => {
                  setClocking(null);
                }}
                onCancel={() => {
                  setClocking(null);
                }}
              />
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
              onEdit={(t) => {
                setTask(t);
                setScope(FormScope.EDIT);
              }}
              onClock={(t) => {
                setClocking(t);
              }}
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
