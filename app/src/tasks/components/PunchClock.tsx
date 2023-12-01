import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import moment from "moment";
import { useContext, useMemo } from "react";
import { FaClock } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { Task } from "../types";

type PunchClockProps = {
  task: Task;
  onSubmit: () => void;
  onCancel: () => void;
};

enum PunchType {
  START,
  STOP,
}

const PunchClock: React.FC<PunchClockProps> = ({
  task,
  onSubmit,
  onCancel,
}) => {
  const { user } = useContext(AuthContext);

  const execution = useMemo(
    () =>
      task?.executions
        ?.filter(
          (execution) => execution.user.id === user?.id && !execution.finishedAt
        )
        .pop(),
    [task, user]
  );

  const type = useMemo(
    () => (execution ? PunchType.STOP : PunchType.START),
    [execution]
  );

  return (
    <Stack>
      <Flex direction="row" alignItems="center">
        <InputGroup color={type === PunchType.START ? "blue.500" : "gray.600"}>
          <InputLeftElement>
            <FaClock />
          </InputLeftElement>
          <Input
            readOnly
            type="text"
            fontSize="sm"
            value={
              type === PunchType.START
                ? "Now"
                : moment(execution?.startedAt).format("DD/MM/YYYY HH:mm:ss")
            }
          />
        </InputGroup>
        <Box w={10} mx={2}>
          <FiArrowRight />
        </Box>
        <InputGroup color={type === PunchType.START ? "gray.500" : "blue.500"}>
          <InputLeftElement>
            <FaClock />
          </InputLeftElement>
          <Input
            readOnly
            type="text"
            fontSize="sm"
            value={type === PunchType.START ? "Pending" : "Now"}
          />
        </InputGroup>
      </Flex>
      <HStack justifyContent="flex-end" my={3}>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          colorScheme={type === PunchType.START ? "blue" : "red"}
          onClick={onSubmit}
        >
          {type === PunchType.START ? "Clock in" : "Clock out"}
        </Button>
      </HStack>
    </Stack>
  );
};

export default PunchClock;
