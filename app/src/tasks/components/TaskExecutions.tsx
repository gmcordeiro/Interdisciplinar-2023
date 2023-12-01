import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { TaskExecution } from "../types";
import ExecutionsGrid from "./ExecutionsGrid";

type TaskExecutionsProps = PropsWithChildren<{
  executions: TaskExecution[];
  fetching: boolean;
}>;

const TaskExecutions: React.FC<TaskExecutionsProps> = ({
  executions,
  fetching,
  children,
}) => {
  return (
    <Tabs isFitted>
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
