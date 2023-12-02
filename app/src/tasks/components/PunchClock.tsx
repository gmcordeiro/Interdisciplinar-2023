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
import { TbClockCheck } from "react-icons/tb";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { Task } from "../types";

export enum PunchType {
  CLOCK_IN = "CLOCK_IN",
  CLOCK_OUT = "CLOCK_OUT",
}

type PunchClockProps = {
  task: Task;
  punching: boolean;
  onPunch: (type: PunchType) => void;
  onCancel: () => void;
};

const PunchClock: React.FC<PunchClockProps> = ({
  task,
  punching,
  onPunch,
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
    () => (execution ? PunchType.CLOCK_OUT : PunchType.CLOCK_IN),
    [execution]
  );

  return (
    <Stack>
      <Flex direction="row" alignItems="center">
        <InputGroup
          color={type === PunchType.CLOCK_IN ? "blue.500" : "gray.600"}
        >
          <InputLeftElement>
            {type === PunchType.CLOCK_IN ? <FaClock /> : <TbClockCheck />}
          </InputLeftElement>
          <Input
            readOnly
            type="text"
            fontSize="sm"
            value={
              type === PunchType.CLOCK_IN
                ? "Now"
                : moment(execution?.startedAt).format("DD/MM/YYYY HH:mm:ss")
            }
          />
        </InputGroup>
        <Box w={10} mx={2}>
          <FiArrowRight />
        </Box>
        <InputGroup
          color={type === PunchType.CLOCK_IN ? "gray.500" : "blue.500"}
        >
          <InputLeftElement>
            <FaClock />
          </InputLeftElement>
          <Input
            readOnly
            type="text"
            fontSize="sm"
            value={type === PunchType.CLOCK_IN ? "Pending" : "Now"}
          />
        </InputGroup>
      </Flex>
      <HStack justifyContent="flex-end" my={1}>
        <Button variant="outline" onClick={onCancel} size={"sm"}>
          Cancel
        </Button>
        <Button
          colorScheme={type === PunchType.CLOCK_IN ? "blue" : "red"}
          onClick={() => onPunch(type)}
          size={"sm"}
          isLoading={punching}
        >
          {type === PunchType.CLOCK_IN ? "Clock in" : "Clock out"}
        </Button>
      </HStack>
    </Stack>
  );
};

export default PunchClock;
