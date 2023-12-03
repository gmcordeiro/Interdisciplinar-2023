import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/contexts/AuthContext";
import PageContainer from "../../common/components/PageContainer";
import { FormScope } from "../../common/types/form";
import ProjectsForm from "../components/ProjectsForm";
import { createProject } from "../services";
import { ProjectFormValues } from "../types";

const ProjectsCreatePage = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const toast = useToast();

  const queryClient = useQueryClient();

  const { mutateAsync: create } = useMutation({
    mutationFn: (values: ProjectFormValues) => createProject(values),
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
        { href: "/projects", label: "Projects" },
        { href: "/projects/create", label: "Create", isCurrentPage: true },
      ]}
      onBack={() => navigate("/projects")}
    >
      <ProjectsForm
        scope={FormScope.CREATE}
        onSubmit={create}
        defaultValues={{
          description: "",
          name: "",
          done: false,
          goal: "",
          owner: user?.id as number,
          resources: "",
          type: 0,
        }}
      />
    </PageContainer>
  );
};

export default ProjectsCreatePage;
