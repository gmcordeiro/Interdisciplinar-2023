import { Button, Flex, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormScope } from "../../common/types/form";
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

  const label = {
    [FormScope.CREATE]: "Create",
    [FormScope.EDIT]: "Update",
    [FormScope.VIEW]: "View",
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack spacing={4} p={5}>
        <Flex mt={5} justifyContent="flex-end">
          <Button mr={3} variant="outline" onClick={() => navigate("/users")}>
            Back
          </Button>
          {scope !== FormScope.VIEW && (
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={form.formState.isSubmitting}
            >
              {label[scope]}
            </Button>
          )}
        </Flex>
      </Stack>
    </form>
  );
};

export default ProjectsForm;
