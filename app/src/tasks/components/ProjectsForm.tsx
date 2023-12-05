import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import { useQuery } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { FormScope, FormScopeLabel } from "../../common/types/form";
import { getProjectTypes } from "../services";
import { ProjectFormValues, ProjectType } from "../types";

type ProjectsFormProps = {
  scope: FormScope.CREATE | FormScope.EDIT | FormScope.VIEW;
  defaultValues: ProjectFormValues;
  onSubmit: (values: ProjectFormValues) => void;
};

const ProjectsForm: React.FC<ProjectsFormProps> = ({
  defaultValues,
  scope,
  onSubmit,
}) => {
  const navigate = useNavigate();

  const { data: types, isFetching: fetchingTypes } = useQuery({
    queryKey: ["types"],
    queryFn: getProjectTypes,
    initialData: [],
  });

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    goal: yup.string().required("Goal is required"),
    resources: yup.string().required("Resources is required"),
    done: yup.boolean().required("Status is required"),
    owner: yup.number().required("Owner is required"),
    type: yup.number().required("Type is required"),
  });

  const form = useForm<ProjectFormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const done = useWatch({
    control: form.control,
    name: "done",
    defaultValue: false,
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
          isInvalid={!!form.formState.errors.type}
          isReadOnly={scope === FormScope.VIEW}
        >
          <FormLabel htmlFor="type">
            <Box>
              Type
              {fetchingTypes && (
                <CircularProgress ml={2} size="20px" isIndeterminate />
              )}
            </Box>
          </FormLabel>
          <Select
            id="type"
            {...form.register("type", {
              required: "Type is required",
              setValueAs: (value: string) => parseInt(value),
            })}
          >
            {types.map((type: ProjectType) => (
              <option key={type.id} value={type.id.toString()}>
                {type.name}
              </option>
            ))}
            {types.length === 0 && !fetchingTypes && (
              <option disabled value={""}>
                No types found
              </option>
            )}
          </Select>
          <FormErrorMessage>
            {form.formState.errors.type && form.formState.errors.type.message}
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
