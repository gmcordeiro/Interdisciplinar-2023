import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../common/components/PageContainer";
import { FormScope } from "../../common/types/form";
import ProjectsForm, { ProjectsFormValues } from "../components/ProjectsForm";

const ProjectsEditPage = () => {
  const navigate = useNavigate();

  const toast = useToast();

  const queryClient = useQueryClient();

  const { id } = useParams();

  const { mutateAsync: update } = useMutation({
    mutationFn: (values: ProjectsFormValues) => Promise.resolve(values),
    onSuccess: () => {
      toast({
        title: "Update successful",
        status: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["projects"] });

      navigate("/projects");
    },
    onError: () => {
      toast({
        title: "Update failed",
        status: "error",
      });
    },
  });

  return (
    <PageContainer
      crumbs={[
        { href: "/projects", label: "Projects" },
        { href: `/projects/${id}/edit`, label: "Create", isCurrentPage: true },
      ]}
      onBack={() => navigate("/projects")}
    >
      <ProjectsForm scope={FormScope.EDIT} onSubmit={update} />
    </PageContainer>
  );
};

export default ProjectsEditPage;
