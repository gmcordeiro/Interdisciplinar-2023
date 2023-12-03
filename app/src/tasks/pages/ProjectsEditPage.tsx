import { Progress, useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { UserRole } from "../../auth/types";
import PageContainer from "../../common/components/PageContainer";
import { FakeStorageContext } from "../../common/contexts/FakeStorageContext";
import { FormScope, FormScopeLabel } from "../../common/types/form";
import ProjectTasks from "../components/ProjectTasks";
import ProjectsForm, { ProjectsFormValues } from "../components/ProjectsForm";

const ProjectsEditPage = () => {
  const { getProject } = useContext(FakeStorageContext);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const toast = useToast();

  const queryClient = useQueryClient();

  const { id } = useParams();

  const { data: project, isFetching: fetching } = useQuery({
    queryKey: ["project", { id }],
    queryFn: () => getProject(id as string),
    initialData: null,
    enabled: !!id,
  });

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
        <ProjectTasks project={project}>
          <ProjectsForm
            scope={
              user?.role === UserRole.COLLABORATOR
                ? FormScope.VIEW
                : FormScope.EDIT
            }
            onSubmit={update}
            defaultValues={project as ProjectsFormValues}
          />
        </ProjectTasks>
      )}
    </PageContainer>
  );
};

export default ProjectsEditPage;
