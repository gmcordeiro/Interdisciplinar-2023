import {
  Badge,
  Button,
  Flex,
  HStack,
  IconButton,
  Progress,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Task } from "../types";

type ProjectTasksGridProps = PropsWithChildren<{
  tasks: Task[];
  fetching: boolean;
}>;

const ProjectTasksGrid: React.FC<ProjectTasksGridProps> = ({
  tasks,
  fetching,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>Details</Tab>
        <Tab>Tasks</Tab>
      </TabList>
      <TabPanels>
        <TabPanel p={0}>{children}</TabPanel>
        <TabPanel>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Done</Th>
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
                        <IconButton
                          icon={<FiEdit />}
                          aria-label={"edit"}
                          size="sm"
                        />
                        <IconButton
                          icon={<FiTrash />}
                          aria-label={"delete"}
                          size="sm"
                          colorScheme="red"
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex mt={5} justifyContent="flex-end" gap={3}>
            <Button variant="outline" onClick={() => navigate("/users")}>
              Back
            </Button>
            <IconButton
              aria-label="Create"
              icon={<FiPlus />}
              colorScheme="blue"
              onClick={() => {}}
            />
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProjectTasksGrid;
