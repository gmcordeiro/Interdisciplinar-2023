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
import { useNavigate } from "react-router-dom";
import { FormScope, FormScopeLabel } from "../../common/types/form";
import { Project } from "../types";

export type ProjectsFormValues = Project;

type ProjectsFormProps = {
  scope: FormScope.CREATE | FormScope.EDIT | FormScope.VIEW;
  defaultValues?: ProjectsFormValues;
  onSubmit: (values: ProjectsFormValues) => void;
};

const ProjectsForm: React.FC<ProjectsFormProps> = ({
  defaultValues,
  scope,
  onSubmit,
}) => {
  const navigate = useNavigate();

  const form = useForm<ProjectsFormValues>({
    defaultValues,
  });

  const done = useWatch({
    control: form.control,
    name: "done",
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack spacing={4} p={5}>
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
          isInvalid={!!form.formState.errors.goal}
          isReadOnly={scope === FormScope.VIEW}
        >
          <FormLabel htmlFor="goal">Goal</FormLabel>
          <Textarea
            id="goal"
            placeholder="Goal"
            {...form.register("goal", { required: "Goal is required" })}
          />
          <FormErrorMessage>
            {form.formState.errors.goal && form.formState.errors.goal.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!form.formState.errors.resources}
          isReadOnly={scope === FormScope.VIEW}
        >
          <FormLabel htmlFor="resources">Resources</FormLabel>
          <Textarea
            id="resources"
            placeholder="Resources"
            {...form.register("resources", {
              required: "Resources is required",
            })}
          />
          <FormErrorMessage>
            {form.formState.errors.resources &&
              form.formState.errors.resources.message}
          </FormErrorMessage>
        </FormControl>
        <Flex mt={5} justifyContent="flex-end" gap={3}>
          <Button variant="outline" onClick={() => navigate("/projects")}>
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

export default ProjectsForm;
