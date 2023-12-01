import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../common/components/PageContainer";
import { FormScope } from "../../common/types/form";
import ProjectTasksGrid from "../components/ProjectTasksGrid";
import ProjectsForm from "../components/ProjectsForm";

const ProjectsViewPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  return (
    <PageContainer
      crumbs={[
        { href: "/projects", label: "Projects" },
        { href: `/projects/${id}`, label: "View", isCurrentPage: true },
      ]}
      onBack={() => navigate("/projects")}
    >
      <ProjectTasksGrid tasks={[]} fetching={false}>
        <ProjectsForm scope={FormScope.VIEW} onSubmit={() => {}} />
      </ProjectTasksGrid>
    </PageContainer>
  );
};

export default ProjectsViewPage;
