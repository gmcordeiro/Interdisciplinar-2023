import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../common/components/PageContainer";
import { FakeStorageContext } from "../../common/contexts/FakeStorageContext";
import { FormScope } from "../../common/types/form";
import ProjectTasksGrid from "../components/ProjectTasksGrid";
import ProjectsForm, { ProjectsFormValues } from "../components/ProjectsForm";

const ProjectsEditPage = () => {
  const { getProject } = useContext(FakeStorageContext);

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
        { href: `/projects/${id}/edit`, label: "Create", isCurrentPage: true },
      ]}
      onBack={() => navigate("/projects")}
    >
      <ProjectTasksGrid tasks={project?.tasks || []} fetching={fetching}>
        <ProjectsForm scope={FormScope.EDIT} onSubmit={update} />
      </ProjectTasksGrid>
    </PageContainer>
  );
};

export default ProjectsEditPage;
