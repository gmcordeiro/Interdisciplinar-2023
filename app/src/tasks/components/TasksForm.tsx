import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
import { FormScope, FormScopeLabel } from "../../common/types/form";
import { getTasks } from "../services";
import { Task } from "../types";

export type TasksFormValues = {
  name: Task["name"];
  description: Task["description"];
  done: Task["done"];
  dependsOn: number | null | undefined;
};

type TasksFormProps = {
  scope: FormScope;
  defaultValues: TasksFormValues;
  onSubmit: (values: TasksFormValues) => void;
  onBack: () => void;
};

const TasksForm: React.FC<TasksFormProps> = ({
  defaultValues,
  scope,
  onSubmit,
  onBack,
}) => {
  const form = useForm<TasksFormValues>({
    defaultValues,
  });

  const done = useWatch({
    control: form.control,
    name: "done",
  });

  const { id } = useParams();

  const { data: tasks } = useQuery({
    queryKey: ["tasks", { id }],
    queryFn: () => getTasks(parseInt(id as string)),
    initialData: [],
    enabled: !!id,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack spacing={4} mb={3}>
        {[FormScope.VIEW, FormScope.EDIT].includes(scope) && (
          <Box>
            <FormLabel htmlFor="done">Status</FormLabel>
            <Badge colorScheme={done ? "green" : "yellow"} fontSize="md">
              {done ? "Done" : "In progress"}
            </Badge>
          </Box>
        )}
        <FormControl
          isInvalid={!!form.formState.errors.name}
          isReadOnly={scope === FormScope.VIEW}
        >
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="text"
            id="name"
            placeholder="Name"
            {...form.register("name", { required: "Name is required" })}
          />
          <FormErrorMessage>
            {form.formState.errors.name && form.formState.errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!form.formState.errors.description}
          isReadOnly={scope === FormScope.VIEW}
        >
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            id="description"
            placeholder="Description"
            {...form.register("description", {
              required: "Description is required",
            })}
          />
          <FormErrorMessage>
            {form.formState.errors.description &&
              form.formState.errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!form.formState.errors.dependsOn}
          isReadOnly={scope === FormScope.VIEW}
        >
          <FormLabel htmlFor="dependsOn">Depends on</FormLabel>
          <Select
            id="dependsOn"
            placeholder="Select a task"
            {...form.register("dependsOn", {
              setValueAs: (value) => (value ? parseInt(value) : null),
            })}
          >
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {form.formState.errors.dependsOn &&
              form.formState.errors.dependsOn.message}
          </FormErrorMessage>
        </FormControl>
        <Flex mt={5} justifyContent="flex-end" gap={3}>
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          {scope !== FormScope.VIEW && (
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={form.formState.isSubmitting}
            >
              {FormScopeLabel[scope]}
            </Button>
          )}
        </Flex>
      </Stack>
    </form>
  );
};

export default TasksForm;
