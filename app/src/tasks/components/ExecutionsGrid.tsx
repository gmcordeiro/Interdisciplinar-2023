import {
  Badge,
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import { TaskExecution } from "../types";

type ExecutionsGridProps = {
  executions: TaskExecution[];
  fetching: boolean;
};

const ExecutionsGrid: React.FC<ExecutionsGridProps> = ({
  executions,
  fetching,
}) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Executed by</Th>
            <Th>Details</Th>
            <Th>Started at</Th>
            <Th>Finished at</Th>
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
          {executions.length === 0 && !fetching && (
            <Tr>
              <Td colSpan={4}>No executions found</Td>
            </Tr>
          )}
          {executions.map((execution) => (
            <Tr key={execution.id}>
              <Td>{execution.user.name}</Td>
              <Td>{execution.details}</Td>
              <Td>{moment(execution.startedAt).format("DD/MM/YY HH:mm")}</Td>
              <Td>
                {execution.finishedAt ? (
                  moment(execution.finishedAt).format("DD/MM/YY HH:mm")
                ) : (
                  <Badge colorScheme="yellow">In progress</Badge>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ExecutionsGrid;
