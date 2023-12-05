import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { getExecutions } from "../services";
import { Task } from "../types";
import ExecutionsGrid from "./ExecutionsGrid";

type TaskExecutionsProps = PropsWithChildren<{
  tab: "details" | "executions";
  task: Task;
}>;

const TaskExecutions: React.FC<TaskExecutionsProps> = ({
  children,
  tab,
  task,
}) => {
  const { data: executions, isLoading: fetching } = useQuery({
    queryKey: ["task-executions", { id: task.id }],
    queryFn: () => getExecutions(task.id),
    initialData: [],
    enabled: !!task.id,
  });

  return (
    <Tabs defaultIndex={tab === "executions" ? 1 : 0}>
      <TabList>
        <Tab>Details</Tab>
        <Tab>Executions</Tab>
      </TabList>
      <TabPanels>
        <TabPanel p={0} py={3}>
          {children}
        </TabPanel>
        <TabPanel p={0}>
          <ExecutionsGrid executions={executions} fetching={fetching} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TaskExecutions;
