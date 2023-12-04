import { Progress, useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { UserRole } from "../../auth/types";
import PageContainer from "../../common/components/PageContainer";
import { FormScope, FormScopeLabel } from "../../common/types/form";
import ProjectTasks from "../components/ProjectTasks";
import ProjectsForm from "../components/ProjectsForm";
import { getProject } from "../services";
import { ProjectFormValues } from "../types";

const ProjectsEditPage = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const toast = useToast();

  const queryClient = useQueryClient();

  const { id } = useParams();

  const { data: project, isFetching: fetching } = useQuery({
    queryKey: ["project", { id }],
    queryFn: () => getProject(parseInt(id as string)),
    enabled: !!id,
  });

  const { mutateAsync: update } = useMutation({
    mutationFn: (values: ProjectFormValues) => Promise.resolve(values),
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
        {
          href: `/projects/${id}/edit`,
          label: FormScopeLabel.edit,
          isCurrentPage: true,
        },
      ]}
      onBack={() => navigate("/projects")}
    >
      {fetching && <Progress size="xs" isIndeterminate />}
      {project && (
        <ProjectTasks>
          <ProjectsForm
            scope={
              user?.role === UserRole.COLLABORATOR
                ? FormScope.VIEW
                : FormScope.EDIT
            }
            onSubmit={update}
            defaultValues={project as unknown as ProjectFormValues}
          />
        </ProjectTasks>
      )}
    </PageContainer>
  );
};

export default ProjectsEditPage;
