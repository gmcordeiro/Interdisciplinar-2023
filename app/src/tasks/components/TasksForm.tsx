import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useForm, useWatch } from "react-hook-form";
import { FormScope, FormScopeLabel } from "../../common/types/form";
import { Task } from "../types";

export type TasksFormValues = Task;

type TasksFormProps = {
  scope: FormScope;
  defaultValues?: TasksFormValues;
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
