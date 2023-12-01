import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../common/components/PageContainer";
import { FakeStorageContext } from "../../common/contexts/FakeStorageContext";
import ProjectsGrid from "../components/ProjectsGrid";

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();

  const { getProjects } = useContext(FakeStorageContext);

  const { data: projects, isFetching: fetching } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    initialData: [],
  });

  console.log(projects);

  return (
    <PageContainer
      crumbs={[{ href: "/projects", label: "Projects", isCurrentPage: true }]}
      onCreate={() => navigate("/projects/create")}
    >
      <ProjectsGrid projects={projects} fetching={fetching} />
    </PageContainer>
  );
};

export default ProjectsPage;
