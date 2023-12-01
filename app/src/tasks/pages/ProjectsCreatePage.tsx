import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../common/components/PageContainer";
import { FormScope } from "../../common/types/form";
import ProjectsForm, { ProjectsFormValues } from "../components/ProjectsForm";

const ProjectsCreatePage = () => {
  const navigate = useNavigate();

  const toast = useToast();

  const queryClient = useQueryClient();

  const { mutateAsync: create } = useMutation({
    mutationFn: (values: ProjectsFormValues) => Promise.resolve(values),
    onSuccess: () => {
      toast({
        title: "Create successful",
        status: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["projects"] });

      navigate("/projects");
    },
    onError: () => {
      toast({
        title: "Create failed",
        status: "error",
      });
    },
  });

  return (
    <PageContainer
      crumbs={[
        { href: "/users", label: "Users" },
        { href: "/users/create", label: "Create", isCurrentPage: true },
      ]}
      onBack={() => navigate("/users")}
    >
      <ProjectsForm scope={FormScope.CREATE} onSubmit={create} />
    </PageContainer>
  );
};

export default ProjectsCreatePage;
